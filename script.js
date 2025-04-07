document.addEventListener("DOMContentLoaded", function () {
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.querySelector('#partsTotal');
    const equipmentSection = document.querySelector('.equipment-section');
    const workforceContainer = document.querySelector('.workforce');
    const addWorkforceButton = document.querySelector('.add-workforce');
    const grandTotalInput = document.querySelector('#grandTotal');
    
    // Recalcular subtotal de Partes
    function calculatePartSubtotal(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');
        const subTotalInput = partDiv.querySelector('.partSubTotal');

        const qt = parseFloat(qtInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const subTotal = qt * unitPrice;

        subTotalInput.value = subTotal.toFixed(2);
    }

    // Recalcular el total de las Partes
    function calculatePartsTotal() {
        let total = 0;
        const subTotalInputs = partsContainer.querySelectorAll('.partSubTotal');
        subTotalInputs.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        partsTotalInput.value = total.toFixed(2);
        updateGrandTotal();
    }

    // Recalcular el subtotal del Workforce
    function updateWorkforceSubtotal(workforceRow) {
        const hoursInput = workforceRow.querySelector(".workforceHrs");
        const pricePerHourInput = workforceRow.querySelector(".workforcePriceHr");
        const subTotalInput = workforceRow.querySelector(".workforceSubTotal");

        const hours = parseFloat(hoursInput.value) || 0;
        const pricePerHour = parseFloat(pricePerHourInput.value) || 0;
        const subTotal = hours * pricePerHour;

        subTotalInput.value = subTotal.toFixed(2);
    }

    // Recalcular el total del Workforce
    function updateWorkforceTotal() {
        let total = 0;
        const workforceRows = document.querySelectorAll(".workforce-row");
        workforceRows.forEach(row => {
            total += parseFloat(row.querySelector(".workforceSubTotal").value) || 0;
        });
        updateGrandTotal();
    }

    // Recalcular el total general (Parts + Workforce)
    function updateGrandTotal() {
        const partsTotal = parseFloat(partsTotalInput.value) || 0;
        let workforceTotal = 0;
        document.querySelectorAll(".workforce-row").forEach(row => {
            workforceTotal += parseFloat(row.querySelector(".workforceSubTotal").value) || 0;
        });
        grandTotalInput.value = (partsTotal + workforceTotal).toFixed(2);
    }

    // Configuración de eventos para las filas de Partes
    function setupPartRowListeners(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');

        qtInput.addEventListener('input', function() {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        });

        unitPriceInput.addEventListener('input', function() {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        });
    }

    // Agregar nuevas filas de Partes
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
    });

    // Configuración de eventos para las filas de Workforce
    function setupWorkforceRowListeners(workforceRow) {
        const hoursInput = workforceRow.querySelector(".workforceHrs");
        const pricePerHourInput = workforceRow.querySelector(".workforcePriceHr");

        hoursInput.addEventListener("input", function() {
            updateWorkforceSubtotal(workforceRow);
            updateWorkforceTotal();
        });

        pricePerHourInput.addEventListener("input", function() {
            updateWorkforceSubtotal(workforceRow);
            updateWorkforceTotal();
        });
    }

    // Agregar nuevas filas de Workforce
    addWorkforceButton.addEventListener("click", function() {
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
                    <input type="number" id="workforceHrs" name="workforceHrs[]" min="0" class
