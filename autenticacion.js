const express = require('express');
const router = express.Router();
const pool = require('./conexion');
const nodemailer = require('nodemailer');

router.post('/autenticar', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const resultado = await pool.query(
      'SELECT * FROM usuario WHERE correo = $1 AND contrasena = $2 AND estado = $3',
      [correo, contrasena, 'habilitado']
    );

    if (resultado.rows.length > 0) {
      res.json({ ok: true, mensaje: 'Autenticación exitosa' });
    } else {
      res.json({ ok: false, mensaje: 'Credenciales incorrectas o usuario inhabilitado' });
    }
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
});

router.post('/registro', async (req, res) => {
  const { nombres, celular, correo, contrasena } = req.body;

  if (!nombres || !celular || !correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  try {
    const existe = await pool.query('SELECT 1 FROM usuario WHERE correo = $1', [correo]);
    if (existe.rowCount > 0) {
      return res.status(400).json({ mensaje: 'Este correo ya está registrado' });
    }

    const resultado = await pool.query(
      `INSERT INTO usuario (nombres, celular, correo, contrasena, codigo, estado)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_usuario, codigo`,
      [nombres, celular, correo, contrasena, generarCodigo(), 'deshabilitado']
    );

    const idGenerado = resultado.rows[0].id_usuario;
    const codigoGenerado = resultado.rows[0].codigo;

    await enviarCorreo(correo, codigoGenerado);

    res.json({ mensaje: 'Usuario creado correctamente', id: idGenerado });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ mensaje: 'Este correo ya está registrado (duplicado)' });
    }

    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

function generarCodigo() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const letra = letras[Math.floor(Math.random() * letras.length)];
  return letra + numeros;
}

async function enviarCorreo(destinatario, codigo) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'carlosedagard@gmail.com',
      pass: 'qgtchjnxepjbldeb'
    }
  });

  const mailOptions = {
    from: 'carlosedagard@gmail.com',
    to: destinatario,
    subject: 'Código de activación de cuenta',
    text: `Gracias por registrarte. Tu código de activación es: ${codigo}`
  };

  await transporter.sendMail(mailOptions);
}
router.post('/validar-codigo', async (req, res) => {
  const { codigo } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE usuario SET estado = $1 WHERE codigo = $2 AND estado = $3 RETURNING id_usuario',
      ['habilitado', codigo, 'deshabilitado']
    );

    if (resultado.rowCount === 1) {
      res.json({ ok: true, mensaje: 'Código válido. Usuario habilitado.' });
    } else {
      res.json({ ok: false, mensaje: 'Código inválido o ya utilizado.' });
    }
  } catch (error) {
    console.error('Error al validar código:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor.' });
  }
});

router.post('/validar-codigo-recuperacion', async (req, res) => {
  const { codigo } = req.body;

  try {
    const resultado = await pool.query(
      'SELECT id_usuario, estado FROM usuario WHERE codigo = $1',
      [codigo]
    );

    if (resultado.rowCount === 1) {
      const { id_usuario, estado } = resultado.rows[0];
      res.json({ ok: true, id_usuario, estado });
    } else {
      res.json({ ok: false, mensaje: 'Código inválido.' });
    }
  } catch (error) {
    console.error('Error al validar código de recuperación:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor.' });
  }
});


router.post('/recuperar-clave', async (req, res) => {
  const { correo, id_usuario, nueva_clave } = req.body;

  // 👉 Cambio de clave
  if (id_usuario && nueva_clave) {
    try {
      await pool.query(
        'UPDATE usuario SET contrasena = $1, codigo = NULL WHERE id_usuario = $2',
        [nueva_clave, id_usuario]
      );
      return res.json({ ok: true, mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      return res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
    }
  }

  // 👉 Envío de código por correo
  if (!correo) {
    return res.status(400).json({ ok: false, mensaje: 'El correo es obligatorio' });
  }

  try {
    const usuario = await pool.query('SELECT id_usuario FROM usuario WHERE correo = $1', [correo]);

    if (usuario.rowCount === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Este correo no está registrado' });
    }

    const nuevoCodigo = generarCodigo();

    await pool.query('UPDATE usuario SET codigo = $1 WHERE correo = $2', [nuevoCodigo, correo]);

    await enviarCorreo(correo, nuevoCodigo);

    res.json({ ok: true, mensaje: 'Código enviado correctamente al correo' });
  } catch (error) {
    console.error('Error al recuperar clave:', error);
    res.status(500).json({ ok: false, mensaje: 'Error al enviar el código de recuperación' });
  }
});


module.exports = router;
