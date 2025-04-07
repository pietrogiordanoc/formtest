document.addEventListener("DOMContentLoaded", function () {
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.querySelector('#partsTotal');
    const equipmentSection = document.querySelector('.equipment-section');
    const workforceContainer = document.querySelector('.workforce');
    const addWorkforceButton = document.querySelector(".add-workforce");
    const grandTotalInput = document.querySelector("#grandTotal");

    function formatNumberWithCommas(number) {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function parseNumber(formattedNumber) {
        return parseFloat(formattedNumber.replace(/\./g, '').replace(',', '.')) || 0;
    }

    function calculatePartSubtotal(partRow) {
        const qtInput = partRow.querySelector('.partQt');
        const unitPriceInput = partRow.querySelector('.partUnitPrice');
        const subTotalInput = partRow.querySelector('.partSubTotal');

        const qt = parseFloat(qtInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const subTotal = qt * unitPrice;

        // Asigna el valor numérico antes de formatear para la visualización
        subTotalInput.value = subTotal;
        // Formatea el valor para la visualización
        subTotalInput.value = formatNumberWithCommas(subTotal);
    }

    function calculatePartsTotal() {
        let total = 0;
        const subTotalInputs = partsContainer.querySelectorAll('.partSubTotal');
        subTotalInputs.forEach(input => {
            total += parseNumber(input.value);
        });
        partsTotalInput.value = formatNumberWithCommas(total);
    }

    function setupPartRowListeners(partRow) {
        const qtInput = partRow.querySelector('.partQt');
        const unitPriceInput = partRow.querySelector('.partUnitPrice');

        qtInput.addEventListener('input', () => {
            calculatePartSubtotal(partRow);
            calculatePartsTotal();
            updateGrandTotal();
        });

        unitPriceInput.addEventListener('input', () => {
            calculatePartSubtotal(partRow);
            calculatePartsTotal();
            updateGrandTotal();
        });
    }

    const initialPartRow = partsContainer.querySelector('.part-row');
    if (initialPartRow) {
        setupPartRowListeners(initialPartRow);
    }

    addPartButton.addEventListener('click', function () {
        const newPartRow = document.createElement('div');
        newPartRow.classList.add("part-row");
        newPartRow.innerHTML = `
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
        partsContainer.insertBefore(newPartRow, addPartButton);
        setupPartRowListeners(newPartRow);
        calculatePartsTotal();
        updateGrandTotal();
    });

    function calculateWorkforceSubtotal(workforceRow) {
        const hoursInput = workforceRow.querySelector(".workforceHrs");
        const pricePerHourInput = workforceRow.querySelector(".workforcePriceHr");
        const subTotalInput = workforceRow.querySelector(".workforceSubTotal");

        const hours = parseFloat(hoursInput.value) || 0;
        const pricePerHour = parseFloat(pricePerHourInput.value) || 0;
        const subTotal = hours * pricePerHour;

        subTotalInput.value = subTotal;
        subTotalInput.value = formatNumberWithCommas(subTotal);
    }

    function setupWorkforceRowListeners(workforceRow) {
        const hoursInput = workforceRow.querySelector(".workforceHrs");
        const pricePerHourInput = workforceRow.querySelector(".workforcePriceHr");

        hoursInput.addEventListener("input", () => {
            calculateWorkforceSubtotal(workforceRow);
            updateGrandTotal();
        });

        pricePerHourInput.addEventListener("input", () => {
            calculateWorkforceSubtotal(workforceRow);
            updateGrandTotal();
        });
    }

    const initialWorkforceRow = workforceContainer.querySelector(".workforce-row");
    if (initialWorkforceRow) {
        setupWorkforceRowListeners(initialWorkforceRow);
    }

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
        workforceContainer.appendChild(workforceRow);
        setupWorkforceRowListeners(workforceRow);
        updateGrandTotal();
    });

    function updateGrandTotal() {
        const partsTotal = parseNumber(partsTotalInput.value);
        let workforceTotal = 0;
        document.querySelectorAll(".workforce-row").forEach(row => {
            workforceTotal += parseNumber(row.querySelector(".workforceSubTotal").value);
        });
        grandTotalInput.value = formatNumberWithCommas(partsTotal + workforceTotal);
    }

    document.querySelector(".add-equipment").addEventListener("click", function () {
        const equipmentDiv = document.createElement("div");
        equipmentDiv.classList.add("equipment");
        equipmentDiv.innerHTML = `
            <div class="form-row">
                <div class="form-column">
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
            </div>
            <div class="form-row">
                <div class="form-column">
                    <label for="equipmentBrandModel">Brand & Model:</label>
                    <input type="text" name="equipmentBrandModel[]">
                </div>
                <div class="form-column">
                    <label for="equipmentSerialNumber">Serial Number:</label>
                    <input type="text" name="equipmentSerialNumber[]">
                </div>
            </div>
        `;
        equipmentSection.querySelector(".equipment").appendChild(equipmentDiv);
    });

    // Inicializar el Grand Total al cargar la página
    updateGrandTotal();
});
