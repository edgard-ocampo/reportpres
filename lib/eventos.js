$(document).ready(function() {
    var selectedItemId = null;
    var selectedPerfilId = null; // Nueva variable para el card de perfiles

    const iconOpen = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg>`;

    const iconClose = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"/>
            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
        </svg>`;

    $('#toggleButton').on('click', function() {
        $('#sidePanel').toggleClass('open');
        $('#toggleButton').toggleClass('open').html($('#sidePanel').hasClass('open') ? iconOpen : iconClose);
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
            $('#panel-olvidecontrasena').removeClass('d-none').addClass('d-block');
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
