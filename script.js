document.addEventListener("DOMContentLoaded", function () {
    // Parts Section
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.querySelector('#partsTotal');
    const equipmentSection = document.querySelector('.equipment-section');

    function calculatePartSubtotal(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');
        const subTotalInput = partDiv.querySelector('.partSubTotal');

        const qt = parseFloat(qtInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const subTotal = qt * unitPrice;

        subTotalInput.value = subTotal.toFixed(2);
    }

    function calculatePartsTotal() {
        let total = 0;
        const subTotalInputs = partsContainer.querySelectorAll('.partSubTotal');
        subTotalInputs.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        partsTotalInput.value = total.toFixed(2);
    }

    function setupPartRowListeners(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');
        const subTotalInput = partDiv.querySelector('.partSubTotal'); 

        qtInput.addEventListener('input', function() {
            console.log('Qt input changed');
            console.log('Qt value:', qtInput.value);
            console.log('Unit Price value:', unitPriceInput.value);
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
            updateGrandTotal();
        });

        unitPriceInput.addEventListener('input', function() {
            console.log('Unit Price input changed');
            console.log('Qt value:', qtInput.value);
            console.log('Unit Price value:', unitPriceInput.value);
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
            updateGrandTotal();
        });
    }

    // Inicializar los listeners para la primera fila de partes
    const initialPartDiv = partsContainer.querySelector('> div');
    if (initialPartDiv) {
        setupPartRowListeners(initialPartDiv);
    }

    // Evento para agregar más partes
    addPartButton.addEventListener('click', function() {
        const newPartDiv = document.createElement('div');
        newPartDiv.classList.add("part-row");
        newPartDiv.innerHTML = `
          <div class="form-row">
            <div class="form-column">
                <label>Part Number:</label>
                <input type="text" class="partNumber" name="partNumber[]">
            </div>
            <div class="form-column">
                <label>Description:</label>
                <input type="text" class="partDescription" name="partDescription[]">
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
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
            </div>
            <div class="form-column">
              <div>
                  <label>Sub Total: $</label>
                  <input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly value="0.00">
              </div>
            </div>
          </div>
        `;
        partsContainer.insertBefore(newPartDiv, addPartButton);
        setupPartRowListeners(newPartDiv);
        calculatePartsTotal(); 
        updateGrandTotal(); 
    });

    // Function to add more workforce
    const addWorkforceButton = document.querySelector(".add-workforce")
    addWorkforceButton.addEventListener("click", function () {
        const workforceRow = document.createElement("div");
        workforceRow.classList.add("workforce-row");
        workforceRow.innerHTML = `
          <div class="form-row">
            <div class="form-column">
              <label for="workforceNotes">Notes:</label>
              <input type="text" id="workforceNotes" name="workforceNotes[]">
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="workforceHrs">Hrs:</label>
              <input type="number" id="workforceHrs" name="workforceHrs[]" min="0" class="workforceHrs" value="0">
            </div>
            <div class="form-column">
              <label for="workforcePriceHr">Price/Hr (USD):</label>
              <input type="number" id="workforcePriceHr" name="workforcePriceHr[]" step="0.01" class="workforcePriceHr" value="0">
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="workforceSubTotal">Sub Total (USD):</label>
              <input type="number" id="workforceSubTotal" name="workforceSubTotal[]" step="0.01" class="workforceSubTotal" readonly value="0.00">
            </div>
          </div>
        `;
        document.querySelector(".workforce").appendChild(workforceRow);
        setupWorkforceRowListeners(workforceRow);
    });

    function setupWorkforceRowListeners(workforceRow) {
        const hoursInput = workforceRow.querySelector(".workforceHrs");
        const pricePerHourInput = workforceRow.querySelector(".workforcePriceHr");
        const subTotalInput = workforceRow.querySelector(".workforceSubTotal");

        hoursInput.addEventListener("input", function() {
            updateWorkforceSubtotal(workforceRow);
            updateWorkforceTotal();
            updateGrandTotal();
        });

        pricePerHourInput.addEventListener("input", function() {
            updateWorkforceSubtotal(workforceRow);
            updateWorkforceTotal();
            updateGrandTotal();
        });

        function updateWorkforceSubtotal(workforceRow) {
            const hours = parseFloat(hoursInput.value) || 0;
            const pricePerHour = parseFloat(pricePerHourInput.value) || 0;
            const subTotal = hours * pricePerHour;
            subTotalInput.value = subTotal.toFixed(2);
        }
    }

    // Update workforce total
    function updateWorkforceTotal() {
        let total = 0;
        const workforceRows = document.querySelectorAll(".workforce-row");
        workforceRows.forEach(row => {
            total += parseFloat(row.querySelector(".workforceSubTotal").value) || 0;
        });
        document.querySelector("#grandTotal").value = total.toFixed(2);
    }

    // Update grand total (Parts + Workforce)
    function updateGrandTotal() {
        const partsTotal = parseFloat(document.querySelector("#partsTotal").value) || 0;
        let workforceTotal = 0;
        document.querySelectorAll(".workforce-row").forEach(row => {
            workforceTotal += parseFloat(row.querySelector(".workforceSubTotal").value) || 0;
        });
        document.querySelector("#grandTotal").value = (partsTotal + workforceTotal).toFixed(2);
    }
    document.querySelector("#partsTotal").addEventListener("input", updateGrandTotal);

    const initialWorkforceRow = document.querySelector(".workforce-row");
    if (initialWorkforceRow) {
        setupWorkforceRowListeners(initialWorkforceRow);
    }

    document.querySelector(".add-equipment").addEventListener("click", function () {
        const equipmentDiv = document.createElement("div");
        equipmentDiv.classList.add("equipment");
        equipmentDiv.innerHTML = `
            <div>
                <label for="equipmentType">Equipment Type:</label>
                <select name="equipmentType[]">
                    <option value="espresso">Espresso Coffee Equipment</option>
                    <option value="coffeeMachine">Coffee Machine</option>
                    <option value="coffeeGrinder">Coffee Grinder</option>
                    <option value="dripCoffee">Drip Coffee</option>
                    <option value="dripBrewer">Drip Brewer</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label for="equipmentBrandModel">Brand & Model:</label>
                <input type="text" name="equipmentBrandModel[]">
            </div>
            <div>
                <label for="equipmentSerialNumber">Serial Number:</label>
                <input type="text"  name="equipmentSerialNumber[]">
            </div>
        `;
        equipmentSection.querySelector(".equipment").appendChild(equipmentDiv);
    });
});