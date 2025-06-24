$(document).ready(function() {
    var selectedItemId = null;
    var selectedPerfilId = null; // Nueva variable para el card de perfiles
    const iconOpen = `<i class="bi bi-x-lg"></i>`;
    const iconClose = `<i class="bi bi-view-stacked"></i>`;
    
    
    
$('#toggleButton').on('click', function () {
    $('#sidePanel').addClass('open');
    $('#toggleButton')
        .addClass('open oculto-suave')
        .html(iconOpen);

    // Ocultar físicamente luego de animación
    setTimeout(() => {
        $('#toggleButton').addClass('d-none');
    }, 500);
});

$('#btn_cerrar_paneles').on('click', function () {
    $('#sidePanel').removeClass('open');
    $('#toggleButton').removeClass('open');

    $('#sidePanel').one('transitionend', function () {
        $('#toggleButton')
            .removeClass('d-none')
            .addClass('d-block')
            .removeClass('oculto-suave')
            .html('<i class="bi bi-view-stacked"></i>'); // ← aquí restauramos el ícono original
    });
});






    const itemsProyecto = $('#list-group-project .list-group-item');
    itemsProyecto.on('click', function() {
        const itemId = $(this).attr('id');
        if (selectedItemId === itemId) {
            $(this).removeClass('bg-warning text-black');
            selectedItemId = null;
        } else {
            itemsProyecto.removeClass('bg-warning text-black');
            $(this).addClass('bg-warning text-black');
            selectedItemId = itemId;
            $('#selectedItemId').text(selectedItemId);
        }
    });

    const itemsPerfil = $('#list-group-perfil .list-group-item');
    itemsPerfil.on('click', function() {
        const perfilId = $(this).attr('id');
        if (selectedPerfilId === perfilId) {
            $(this).removeClass('bg-secondary text-white');
            selectedPerfilId = null;

            // Ocultar el card 2 con un efecto deslizante hacia arriba
            $('#card-proyectos').slideUp();
        } else {
            itemsPerfil.removeClass('bg-secondary text-white');
            $(this).addClass('bg-secondary text-white');
            selectedPerfilId = perfilId;
            $('#selectedItemId').text(selectedPerfilId);

            // Mostrar el card 2 con un efecto deslizante hacia abajo
            $('#card-proyectos').slideDown();
        }
    });

    // Función para manejo de multi-selección
    function handleMultiSelect(selector, activeClass) {
        $(selector).on('click', function() {
            $(this).toggleClass(activeClass).toggleClass('text-white');
        });
    }

    handleMultiSelect('#list-group-rows .list-group-item', 'bg-success');
    handleMultiSelect('#list-group-columns .list-group-item', 'bg-primary');

    function actualizarNumeros(selector) {
        $(selector).find('.list-group-item').each(function(index) {
            $(this).find('.item-number').text((index + 1) + '. ');
        });
    }

    $('#list-group-rows, #list-group-columns').sortable({
        placeholder: 'ui-state-highlight',
        axis: 'y',
        update: function() {
            actualizarNumeros(this);
        }
    });

    actualizarNumeros('#list-group-rows');
    actualizarNumeros('#list-group-columns');
});

$('.botones_escenas').on('click', function () {
    $('.panel').removeClass('d-block').addClass('d-none');  // Oculta todos los paneles
    const identidad = $(this).attr('id');

    switch (identidad) {
        case 'btn_olvide_contrasena_escena':
        case 'btn_olvide_clave_escena':
            $('#panel-correorecuperar').removeClass('d-none').addClass('d-block');
            break;

        case 'btn_nuevo_usuario_escena':
        case 'btn_nuevousuario_regreso_escena':
            $('#panel-nuevapersona').removeClass('d-none').addClass('d-block');
            break;

        case 'btn_autenticar_usuario_escena':
        case 'btn_autenticar_regreso_escena':
            $('#panel-autenticacion').removeClass('d-none').addClass('d-block');
            break;

        default:
            console.warn("Botón no reconocido:", identidad);
            break;
    }
});

$('.input-group-text').on('click', function(){
    const id_elemento = $(this).attr('id');
    const elemento_sust = id_elemento.split('-')[0];
    $(`#${elemento_sust}`).val('');
}); 

$('#panel-autenticacion form').on('submit', function(e) {
  e.preventDefault();

  const correo = $('#ipt_correo_autenticar').val().trim();
  const contrasena = $('#ipt_contrasena_autenticar').val().trim();

  if (!correo || !contrasena) {
    alert('Por favor, complete ambos campos.');
    return;
  }

  $.ajax({
    url: '/api/autenticar',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ correo, contrasena }),
    success: function(respuesta) {
      if (respuesta.ok) {
        alert('✅ ' + respuesta.mensaje);
        // Aquí puedes redirigir o mostrar otra vista
      } else {
        alert('❌ ' + respuesta.mensaje);
      }
    },
    error: function(err) {
      alert('Error en la solicitud');
      console.error(err);
    }
  });
});

$('#panel-nuevapersona form').on('submit', function (e) {
    e.preventDefault();
  const nombres = $('#ipt_nombreapellido_crear').val().trim();
  const celular = $('#ipt_celular_crear').val().trim();
  const correo = $('#ipt_correo_crear').val().trim();
  const contrasena = $('#ipt_contrasena_crear').val().trim();
  const contrasena2 = $('#ipt_contrasenarepetida_crear').val().trim();
  if (!nombres || !celular || !correo || !contrasena || !contrasena2) {
    alert('⚠️ Todos los campos son obligatorios.');
    return;
  }

  if (contrasena !== contrasena2) {
    alert('⚠️ Las contraseñas no coinciden.');
    return;
  }

  fetch('/api/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombres, celular, correo, contrasena })
  })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        alert(`✅ Usuario creado correctamente. Tu ID es ${data.id}`);
        // Limpiar campos
        $('#panel-nuevapersona input').val('');
        // Ir al panel Proceso de recuperación para trabajar con los codigos.
        $('#panel-nuevapersona').removeClass('d-block').addClass('d-none');
        $('#panel-procesorecuperacion').removeClass('d-none').addClass('d-block');
      } else {
        alert(`❌ Error: ${data.mensaje}`);
      }
    })
    .catch(err => {
      console.error(err);
      alert('❌ Error al conectar con el servidor');
    });
});

$('#btn_validar_codigo').on('click', function (e) {
  e.preventDefault();
  const codigo = $('#ipt_codigo_recuperar').val().trim();

  if (!codigo) {
    alert('⚠️ Por favor, ingrese el código.');
    return;
  }

  // Verificamos primero si es código de recuperación
  fetch('/api/validar-codigo-recuperacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo })
  })
    .then(res => res.json())
    .then(data => {
  if (data.ok && data.id_usuario) {
    if (data.estado === 'habilitado') {
      // Recuperación de contraseña
      localStorage.setItem('id_usuario_recuperado', data.id_usuario);
      $('#contenedor_recuperar_contrasena').removeClass('d-none');
      alert('✅ Código válido. Ahora ingrese una nueva contraseña.');
      $('.card.bg-secondary').addClass('d-none'); // Oculta bloque anterior
    } else {
      // Activación de cuenta
      fetch('/api/validar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo })
      })
        .then(res2 => res2.json())
        .then(data2 => {
          if (data2.ok) {
            alert('✅ ' + data2.mensaje);
            $('.panel').removeClass('d-block').addClass('d-none');
            $('#panel-autenticacion').removeClass('d-none').addClass('d-block');
          } else {
            alert('❌ ' + data2.mensaje);
          }
        });
    }
  } else {
    alert('❌ ' + data.mensaje);
  }
}).catch(err => {
      console.error(err);
      alert('❌ Error al validar el código.');
    });
});

$('#btn_enviar_codigo').on('click', function (e) {
  e.preventDefault();

  const correo = $('#ipt_correo_recuperar').val().trim();

  if (!correo) {
    alert('⚠️ Ingrese su correo electrónico.');
    return;
  }

  fetch('/api/recuperar-clave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo })
  })
    .then(res => res.json())
    .then(data => {
      if (data.mensaje.includes('Código enviado')) {
        alert('✅ ' + data.mensaje);
        // Cambiar de panel
        $('#panel-correorecuperar').removeClass('d-block').addClass('d-none');
        $('#panel-procesorecuperacion').removeClass('d-none').addClass('d-block');
      } else {
        alert('❌ ' + data.mensaje);
      }
    })
    .catch(err => {
      console.error(err);
      alert('❌ Error al enviar solicitud de recuperación');
    });
});

$('#btn_recuperar_acceso').on('click', function (e) {
  e.preventDefault();

  const nueva = $('#ipt_nuevaclave_recuperar').val().trim();
  const repetir = $('#ipt_repitanuevaclave_recuperar').val().trim();
  const id_usuario = localStorage.getItem('id_usuario_recuperado');

  if (!nueva || !repetir) {
    alert('⚠️ Ambos campos son obligatorios.');
    return;
  }

  if (nueva !== repetir) {
    alert('⚠️ Las contraseñas no coinciden.');
    return;
  }

  if (!id_usuario) {
    alert('⚠️ No se pudo validar al usuario. Intente desde el inicio.');
    return;
  }

  fetch('/api/recuperar-clave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_usuario, nueva_clave: nueva })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('✅ Contraseña actualizada correctamente');
        // Ir al panel de autenticación
        localStorage.removeItem('id_usuario_recuperado');
        $('.panel').removeClass('d-block').addClass('d-none');
        $('#panel-autenticacion').removeClass('d-none').addClass('d-block');
      } else {
        alert('❌ ' + data.mensaje);
      }
    })
    .catch(err => {
      console.error(err);
      alert('❌ Error al conectar con el servidor');
    });
});
$('#btn_mostrar_ocultar_clave').on('click', function () {
    const $input = $('#ipt_contrasena_autenticar');
    const $icono = $(this).find('i');

    if ($input.attr('type') === 'password') {
        $input.attr('type', 'text');
        $icono.removeClass('bi-eye-slash').addClass('bi-eye'); // Ojo abierto
    } else {
        $input.attr('type', 'password');
        $icono.removeClass('bi-eye').addClass('bi-eye-slash'); // Ojo cerrado
    }
});

