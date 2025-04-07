document.addEventListener("DOMContentLoaded", function () {
  const partsContainer = document.querySelector(".parts");
  const workforceContainer = document.querySelector(".workforce");
  const equipmentsContainer = document.querySelector(".equipments-selectable");

  // Function to create a new part row
  function createPartRow() {
  const partRow = document.createElement("div");
  partRow.classList.add("part-row");
  partRow.innerHTML = `
  <div><label>Part Number:</label><input type="text" class="partNumber" name="partNumber[]"></div>
  <div><label>Description:</label><input type="text" class="partDescription" name="partDescription[]"></div>
  <div class="qt-price-row">
  <div><label>Qt:</label><input type="number" name="partQt[]" min="0" class="partQt" value="0"></div>
  <div><label>Unit Price: $</label><input type="number" name="partUnitPrice[]" step="0.01" class="partUnitPrice" value="0"></div>
  </div>
  <div><label>Sub Total: $</label><input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly value="0.00"></div>
  `;
  return partRow;
  }

  // Function to add a new part
  document.querySelector(".add-part").addEventListener("click", function () {
  partsContainer.appendChild(createPartRow());
  updateTotals();
  });

  // Function to create a new workforce row
  function createWorkforceRow() {
  const workforceRow = document.createElement("div");
  workforceRow.classList.add("workforce-row");
  workforceRow.innerHTML = `
  <div><label>Notes:</label><input type="text" class="workforceNotes" name="workforceNotes[]"></div>
  <div><label>Hrs:</label><input type="number" class="workforceHrs" name="workforceHrs[]" min="0" value="0"></div>
  <div><label>Price/Hr (USD):</label><input type="number" class="workforcePriceHr" name="workforcePriceHr[]" step="0.01" value="0"></div>
  <div><label>Sub Total (USD):</label><input type="number" class="workforceSubTotal" name="workforceSubTotal[]" step="0.01" readonly value="0.00"></div>
  `;
  return workforceRow;
  }

  // Function to add more workforce
  document.querySelector(".add-workforce").addEventListener("click", function () {
  workforceContainer.appendChild(createWorkforceRow());
  updateTotals();
  });

  // Function to create a new equipment row
  function createEquipmentRow(index) {
  const equipmentRow = document.createElement("div");
  equipmentRow.classList.add("equipment-selectable-row");
  equipmentRow.innerHTML = `
  <div>
  <label for="equipmentType_${index}">Equipment Type:</label>
  <select class="equipmentType" id="equipmentType_${index}" name="equipmentType[]">
  <option value="">Select...</option>
  <option value="Espresso Coffee Equipment">Espresso Coffee Equipment</option>
  <option value="Coffee Machine">Coffee Machine</option>
  <option value="Coffee Grinder">Coffee Grinder</option>
  <option value="Other Equipment">Other Equipment</option>
  </select>
  </div>
  <div>
  <label for="brandModel_${index}">Brand & Model:</label>
  <input type="text" class="brandModel" id="brandModel_${index}" name="brandModel[]">
  </div>
  <div>
  <label for="serialNumber_${index}">Serial Number:</label>
  <input type="text" class="serialNumber" id="serialNumber_${index}" name="serialNumber[]">
  </div>
  <button type="button" class="delete-equipment">Delete</button>
  `;

  const deleteButton = equipmentRow
