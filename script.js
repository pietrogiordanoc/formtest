document.addEventListener("DOMContentLoaded", function () {
  // Función para agregar una nueva parte
  document.querySelector(".add-part").addEventListener("click", function () {
  const filaParte = document.createElement("div");
  filaParte.classList.add("fila-parte");
  filaParte.innerHTML = `
  <div>
  <label>Número de Parte:</label>
  <input type="text" class="numeroParte" name="numeroParte[]">
  </div>
  <div>
  <label>Descripción:</label>
  <input type="text" class="descripcionParte" name="descripcionParte[]">
  </div>
  <div class="fila-cantidad-precio">
  <div>
  <label>Cant:</label>
  <input type="number" name="cantidadParte[]" min="0" class="cantidadParte" value="0">
  </div>
  <div>
  <label>Precio Unitario: $</label>
  <input type="number" name="precioUnitarioParte[]" step="0.01" class="precioUnitarioParte" value="0">
  </div>
  </div>
  <div>
  <label>Sub Total: $</label>
  <input type="number" name="subTotalParte[]" step="0.01" class="subTotalParte" readonly value="0.00">
  </div>
  `;
  document.querySelector(".partes").appendChild(filaParte);
  actualizarTotalPartes();
  });

  // Función para agregar más trabajo de mano de obra
  document.querySelector(".add-workforce").addEventListener("click", function () {
  const filaTrabajo = document.createElement("div");
  filaTrabajo.classList.add("fila-trabajo");
  filaTrabajo.innerHTML = `
  <div>
  <label>Notas:</label>
  <input type="text" class="notasTrabajo" name="notasTrabajo[]">
  </div>
  <div>
  <label>Horas:</label>
  <input type="number" class="horasTrabajo" name="horasTrabajo[]" min="0" value="0">
  </div>
  <div>
  <label>Precio/Hora (USD):</label>
  <input type="number" class="precioHoraTrabajo" name="precioHoraTrabajo[]" step="0.01" value="0">
  </div>
  <div>
  <label>Sub Total (USD):</label>
  <input type="number" class="subTotalTrabajo" name="subTotalTrabajo[]" step="0.01" readonly value="0.00">
  </div>
  `;
  document.querySelector(".mano-de-obra").appendChild(filaTrabajo);
  actualizarTotalManoDeObra();
  });

  // Actualizar el total de partes
  function actualizarTotalPartes() {
  let total = 0;
  const filasParte = document.querySelectorAll(".fila-parte");
  filasParte.forEach(fila => {
  const cantidad = parseFloat(fila.querySelector(".cantidadParte").value) || 0;
  const precioUnitario = parseFloat(fila.querySelector(".precioUnitarioParte").value) || 0;
  const subTotal = cantidad * precioUnitario;
  fila.querySelector(".subTotalParte").value = subTotal.toFixed(2);
  total += subTotal;
  });
  document.querySelector("#totalPartes").value = total.toFixed(2);
  actualizarTotalGeneral();
  }

  // Actualizar el total de mano de obra
  function actualizarTotalManoDeObra() {
  let total = 0;
  const filasTrabajo = document.querySelectorAll(".fila-trabajo");
  filasTrabajo.forEach(fila => {
  const horas = parseFloat(fila.querySelector(".horasTrabajo").value) || 0;
  const precioPorHora = parseFloat(fila.querySelector(".precioHoraTrabajo").value) || 0;
  const subTotal = horas * precioPorHora;
  fila.querySelector(".subTotalTrabajo").value = subTotal.toFixed(2);
  total += subTotal;
  });
  document.querySelector("#totalManoDeObra").value = total.toFixed(2);
  actualizarTotalGeneral();
  }

  // Actualizar el total general (Partes + Mano de Obra)
  function actualizarTotalGeneral() {
  const totalPartes = parseFloat(document.querySelector("#totalPartes").value) || 0;
  const totalManoDeObra = parseFloat(document.querySelector("#totalManoDeObra").value) || 0;
  document.querySelector("#totalGeneral").value = (totalPartes + totalManoDeObra).toFixed(2);
  }

  // Calcular el subtotal de partes cuando el usuario ingrese datos
  document.querySelector(".partes").addEventListener("input", actualizarTotalPartes);
  // Calcular el subtotal de mano de obra cuando el usuario ingrese datos
  document.querySelector(".mano-de-obra").addEventListener("input", actualizarTotalManoDeObra);
 });
