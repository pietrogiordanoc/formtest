document.addEventListener("DOMContentLoaded", function () {
  // ... (funciones para partes y mano de obra sin cambios) ...

  // Función para agregar un nuevo campo de equipo seleccionable
  document.querySelector(".agregar-equipo-seleccionable").addEventListener("click", function () {
  const equiposContainer = document.querySelector(".equipos-seleccionables");
  const numEquipos = equiposContainer.querySelectorAll(".equipo-seleccionable-fila").length;
  const nuevoEquipoFila = document.createElement("div");
  nuevoEquipoFila.classList.add("equipo-seleccionable-fila");
  nuevoEquipoFila.innerHTML = `
  <div>
  <label for="tipoEquipo_${numEquipos}">Tipo de Equipo:</label>
  <select class="tipoEquipo" id="tipoEquipo_${numEquipos}" name="tipoEquipo[]">
  <option value="">Seleccionar...</option>
  <option value="Espresso Coffee Equipment">Equipo de Café Espresso</option>
  <option value="Coffee Machine">Máquina de Café</option>
  <option value="Coffee Grinder">Molinillo de Café</option>
  <option value="Other Equipment">Otro Equipo</option>
  </select>
  </div>
  <div>
  <label for="marcaModelo_${numEquipos}">Marca y Modelo:</label>
  <input type="text" class="marcaModelo" id="marcaModelo_${numEquipos}" name="marcaModelo[]">
  </div>
  <div>
  <label for="numeroSerie_${numEquipos}">Número de Serie:</label>
  <input type="text" class="numeroSerie" id="numeroSerie_${numEquipos}" name="numeroSerie[]">
  </div>
  <button type="button" class="eliminar-equipo">Eliminar</button>
  `;
  equiposContainer.appendChild(nuevoEquipoFila);

  // Mostrar el botón de eliminar si hay más de un equipo
  if (equiposContainer.querySelectorAll(".equipo-seleccionable-fila").length > 1) {
  nuevoEquipoFila.querySelector(".eliminar-equipo").style.display = "inline-block";
  }

  // Agregar event listener para eliminar este equipo
  nuevoEquipoFila.querySelector(".eliminar-equipo").addEventListener("click", function() {
  nuevoEquipoFila.remove();
  // Ocultar el botón de eliminar si solo queda un equipo
  if (equiposContainer.querySelectorAll(".equipo-seleccionable-fila").length === 1) {
  equiposContainer.querySelector(".eliminar-equipo").style.display = "none";
  }
  });

  // Asegurarse de que el botón de eliminar del primer elemento esté oculto inicialmente
  if (numEquipos === 0 && equiposContainer.querySelectorAll(".equipo-seleccionable-fila").length === 1) {
  equiposContainer.querySelector(".eliminar-equipo").style.display = "none";
  }
  });

  // Inicialmente ocultar el botón de eliminar del primer equipo
  const initialEquipoFila = document.querySelector(".equipos-seleccionables .equipo-seleccionable-fila");
  if (initialEquipoFila) {
  initialEquipoFila.querySelector(".eliminar-equipo").style.display = "none";
  }

  // ... (event listeners para partes y mano de obra sin cambios) ...
  document.querySelector(".partes").addEventListener("input", actualizarTotalPartes);
  document.querySelector(".mano-de-obra").addEventListener("input", actualizarTotalManoDeObra);
 });

 // ... (funciones actualizarTotalPartes y actualizarTotalManoDeObra sin cambios) ...
 function actualizarTotalGeneral() {
  const totalPartes = parseFloat(document.querySelector("#totalPartes").value) || 0;
  const totalManoDeObra = parseFloat(document.querySelector("#totalManoDeObra").value) || 0;
  document.querySelector("#totalGeneral").value = (totalPartes + totalManoDeObra).toFixed(2);
 }
