<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Bootstrap Modal Draggable</title>
		<link href="lib/bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
		<link href="lib/jquery-ui-1.14.0/jquery-ui.min.css" rel="stylesheet">
		<link href="lib/alertifyjs/css/alertify.min.css" rel="stylesheet">
		<link href="lib/estilos.css" rel="stylesheet">
	</head>
	<body>
		<div class="container-fluid bg-danger full-height">
			Bienvenido al generador de reportes finacieros de información pública <button type="button" class="btn btn-primary" id="openModal"> Mostrar paleta de control</button>
		</div>

		<div class="modal fade" id="div-modal-paleta-mostrar" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5">Paleta de control</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						
						
						

  <div class="list-group" id="list-group-content">
	<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
			<small class="opacity-50 text-nowrap">Estructura vacía</small>
          <p class="mb-0 opacity-75">Reporte de gastos detallado</p>
        </div>
        <small class="opacity-50 text-nowrap" style="font-size: 11px;">Ahora</small>
      </div>
    </a>
    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
			<small class="opacity-50 text-nowrap">Incluye información de prueba</small>
          <p class="mb-0 opacity-75">Reporte de gastos detallado</p>
        </div>
        <small class="opacity-50 text-nowrap" style="font-size: 11px;">Ahora</small>
      </div>
    </a>
    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
			<small class="opacity-50 text-nowrap">Incluye información cargada hasta el 14/09/24 18:22</small>
          <p class="mb-0 opacity-75">Reporte de marco presupuestal a nivel de cadena de gastos</p>
        </div>
         <small class="opacity-50 text-nowrap" style="font-size: 11px;">05/08/24</small>
      </div>
    </a>
    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <small class="opacity-50 text-nowrap">Incluye información cargada hasta el 14/09/24 19:20</small>
          <p class="mb-0 opacity-75">Reporte de pendientes por rendir filtrado por año 2024</p>
        </div>
        <small class="opacity-50 text-nowrap" style="font-size: 11px;">11/08/24</small>
      </div>
    </a>
	      <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <small class="opacity-50 text-nowrap">Incluye información cargada hasta el 14/09/24 19:20</small>
          <p class="mb-0 opacity-75">Reporte de pendientes por rendir filtrado por año 2024</p>
        </div>
        <small class="opacity-50 text-nowrap" style="font-size: 11px;">11/08/24</small>
      </div>
    </a>
	      <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <small class="opacity-50 text-nowrap">Incluye información cargada hasta el 14/09/24 19:20</small>
          <p class="mb-0 opacity-75">Reporte de pendientes por rendir filtrado por año 2024</p>
        </div>
        <small class="opacity-50 text-nowrap" style="font-size: 11px;">11/08/24</small>
      </div>
    </a>
	  	      <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-2">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <small class="opacity-50 text-nowrap">Incluye información cargada hasta el 14/09/24 19:20</small>
          <p class="mb-0 opacity-75">Reporte de pendientes por rendir filtrado por año 2024</p>
        </div>
        <small class="opacity-50 text-nowrap" style="font-size: 11px;">11/08/24</small>
      </div>
    </a>
  </div>
<nav class="mt-1" aria-label="Page navigation">
    <ul class="pagination justify-content-center" id="pagination">
        <!-- Los botones de paginación se generarán dinámicamente aquí -->
    </ul>
</nav>
						
						
						
						
						
						
						
						
						<div class="d-flex align-items-start">
							<div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist">
								<button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab">
									Proyectos
								</button>
								<button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab">
									Profile
								</button>
							</div>
							<div class="tab-content" id="v-pills-tabContent">
								<div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" tabindex="0">
									<button type="button" class="btn btn-secondary" id="btn_agregar_proyecto">
										+ Agregar nuevo proyecto
									</button>
								</div>
								<div class="tab-pane fade" id="v-pills-profile" role="tabpanel" tabindex="0">
									...
								</div>
							</div>
						</div>
						
						
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Necesito ayuda</button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="modal fade" id="div_modal_crearproyecto" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5">Nuevo proyecto</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingInput" placeholder="">
							<label for="floatingInput">Escriba aquí el nombre su nuevo proyecto</label>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Guardar proyecto</button>
					</div>
				</div>
			</div>
		</div>
		<script src="lib/jquery-3.7.1.min.js"></script>
		<script src="lib/jquery-ui-1.14.0/jquery-ui.min.js"></script>
		<script src="lib/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
		<script src="lib/alertifyjs/alertify.min.js"></script>
		<script src="lib/eventos.js"></script>
		<script>

document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 2;
    const listGroupContent = document.getElementById('list-group-content');
    const listItems = listGroupContent.querySelectorAll('.list-group-item');
    const pagination = document.getElementById('pagination');
    let currentPage = 1;
    const totalPages = Math.ceil(listItems.length / itemsPerPage);

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        listItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.classList.remove('d-none'); // Mostrar el elemento
                if (index > 0) {
                    item.style.borderTop = '1px solid #dee2e6'; // Asegurar borde superior
                }
            } else {
                item.classList.add('d-none');    // Ocultar el elemento
            }
        });
    }

    function createPagination() {
        pagination.innerHTML = '';  // Limpiar la paginación existente
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
                updateActivePage();
            });
            pagination.appendChild(li);
        }
        updateActivePage();
    }

    function updateActivePage() {
        const pageItems = pagination.querySelectorAll('.page-item');
        pageItems.forEach((item, index) => {
            item.classList.toggle('active', index + 1 === currentPage);
        });
    }

    // Mostrar la primera página por defecto
    showPage(currentPage);
    createPagination();
});



		</script>
	</body>
</html>
