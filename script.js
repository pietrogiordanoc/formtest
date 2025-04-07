document.addEventListener("DOMContentLoaded", function () {
  // Function to add a new part
  document.querySelector(".add-part").addEventListener("click", function () {
  const partRow = document.createElement("div");
  partRow.classList.add("part-row");
  partRow.innerHTML = `
  <div>
  <label>Part Number:</label>
  <input type="text" class="partNumber" name="partNumber[]">
  </div>
  <div>
  <label>Description:</label>
  <input type="text" class="partDescription" name="partDescription[]">
  </div>
  <div class="qt-price-row">
  <div>
  <label>Qt:</label>
  <input type="number" name="partQt[]" min="0" class="partQt" value="0">
  </div>
  <div>
  <label>Unit Price: $</label>
  <input type="number" name="partUnitPrice[]" step="0.01" class="partUnitPrice" value="0">
  </div>
  </div>
  <div>
  <label>Sub Total: $</label>
  <input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly value="0.00">
  </div>
  `;
  document.querySelector(".parts").appendChild(partRow);
  updatePartsTotal();
  });

  // Function to add more workforce
  document.querySelector(".add-workforce").addEventListener("click", function () {
  const workforceRow = document.createElement("div");
  workforceRow.classList.add("workforce-row");
  workforceRow.innerHTML = `
  <div>
  <label>Notes:</label>
  <input type="text" class="workforceNotes" name="workforceNotes[]">
  </div>
  <div>
  <label>Hrs:</label>
  <input type="number" class="workforceHrs" name="workforceHrs[]" min="0" value="0">
  </div>
  <div>
  <label>Price/Hr (USD):</label>
  <input type="number" class="workforcePriceHr" name="workforcePriceHr[]" step="0.01" value="0">
  </div>
  <div>
  <label>Sub Total (USD):</label>
  <input type="number" class="workforceSubTotal" name="workforceSubTotal[]" step="0.01" readonly value="0.00">
  </div>
  `;
  document.querySelector(".workforce").appendChild(workforceRow);
  updateWorkforceTotal();
  });

  // Function to add a new selectable equipment field
  document.querySelector(".add-equipment-selectable").addEventListener("click", function () {
  const equipmentsContainer = document.querySelector(".equipments-selectable");
  const numEquipments = equipmentsContainer.querySelectorAll(".equipment-selectable-row").length;
  const newEquipmentRow = document.createElement("div");
  newEquipmentRow.classList.add("equipment-selectable-row");
  newEquipmentRow.innerHTML = `
  <div>
  <label for="equipmentType_${numEquipments}">Equipment Type:</label>
  <select class="equipmentType" id="equipmentType_${numEquipments}" name="equipmentType[]">
  <option value="">Select...</option>
  <option value="Espresso Coffee Equipment">Espresso Coffee Equipment</option>
  <option value="Coffee Machine">Coffee Machine</option>
  <option value="Coffee Grinder">Coffee Grinder</option>
  <option value="Other Equipment">Other Equipment</option>
  </select>
  </div>
  <div>
  <label for="brandModel_${numEquipments}">Brand & Model:</label>
  <input type="text" class="brandModel" id="brandModel_${numEquipments}" name="brandModel[]">
  </div>
  <div>
  <label for="serialNumber_${numEquipments}">Serial Number:</label>
  <input type="text" class="serialNumber" id="serialNumber_${numEquipments}" name="serialNumber[]">
  </div>
  <button type="button" class="delete-equipment">Delete</button>
  `;
  equipmentsContainer.appendChild(newEquipmentRow);

  // Add event listener to delete this equipment row
  newEquipmentRow.querySelector(".delete-equipment").addEventListener("click", function () {
  newEquipmentRow.remove();
  });
  });

  // Update parts total
  function updatePartsTotal() {
  let total = 0;
  const partRows = document.querySelectorAll(".part-row");
  partRows.forEach(row => {
  const quantity = parseFloat(row.querySelector(".partQt").value) || 0;
  const unitPrice = parseFloat(row.querySelector(".partUnitPrice").value) || 0;
  const subTotal = quantity * unitPrice;
  row.querySelector(".partSubTotal").value = subTotal.toFixed(2);
  total += subTotal;
  });
  document.querySelector("#partsTotal").value = total.toFixed(2);
  updateGrandTotal();
  }

  // Update workforce total
  function updateWorkforceTotal() {
  let total = 0;
  const workforceRows = document.querySelectorAll(".workforce-row");
  workforceRows.forEach(row => {
  const hours = parseFloat(row.querySelector(".workforceHrs").value) || 0;
  const pricePerHour = parseFloat(row.querySelector(".workforcePriceHr").value) || 0;
  const subTotal = hours * pricePerHour;
  row.querySelector(".workforceSubTotal").value = subTotal.toFixed(2);
  total += subTotal;
  });
  document.querySelector("#workforceTotal").value = total.toFixed(2);
  updateGrandTotal();
  }

  // Update grand total (Parts + Workforce)
  function updateGrandTotal() {
  const partsTotal = parseFloat(document.querySelector("#partsTotal").value) || 0;
  const workforceTotal = parseFloat(document.querySelector("#workforceTotal").value) || 0;
  document.querySelector("#grandTotal").value = (partsTotal + workforceTotal).toFixed(2);
  }

  // Calculate part subtotal on input change
  document.querySelector(".parts").addEventListener("input", updatePartsTotal);
  // Calculate workforce subtotal on input change
  document.querySelector(".workforce").addEventListener("input", updateWorkforceTotal);

  // Initialize with one equipment row and delete button visible
  document
