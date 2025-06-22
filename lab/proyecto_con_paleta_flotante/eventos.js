$('#div-modal-paleta-mostrar').on('shown.bs.modal', function () {
    $('#div-modal-paleta-mostrar .modal-dialog').draggable({
        handle: ".modal-header"
    });
});
var modalPaleta = new bootstrap.Modal(document.getElementById('div-modal-paleta-mostrar'), {
    backdrop: false
});
document.getElementById('openModal').addEventListener('click', function () {
    modalPaleta.show();
});
$('#btn_agregar_proyecto').on('click', function () {
    $('#div_modal_crearproyecto').modal('show');
});
