document.addEventListener("DOMContentLoaded", function () {
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.querySelector('#partsTotal');
    const workforceContainer = document.querySelector('.workforce');
    const addWorkforceButton = document.querySelector(".add-workforce");
    const grandTotalInput = document.querySelector("#grandTotal");

    // Función para formatear números con comas y dos decimales
    function formatNumberWithCommas(number) {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Función para analizar números formateados
    function parseNumber(formattedNumber) {
        return parseFloat(formattedNumber.replace(/\./g, '').replace(',', '.')) || 0;
    }

    // Calcular el subtotal de una fila de partes
    function calculatePartSubtotal(partRow) {
        const qtInput = partRow.querySelector('.partQt');
        const unitPriceInput = partRow.querySelector('.partUnitPrice');
        const subTotalInput = partRow.querySelector('.partSubTotal');

        const qt = parseFloat(qtInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const subTotal = qt * unitPrice;

        subTotalInput.value = formatNumberWithCommas(subTotal);
    }

    // Calcular el total de todas las partes
    function calculatePartsTotal() {
        let total = 0;
        const subTotalInputs = partsContainer.querySelectorAll('.partSubTotal');
        subTotalInputs.forEach(input => {
            total += parseNumber(input.value);
        });
        partsTotalInput.value = formatNumberWithCommas(total);
    }

    // Configurar listeners para una fila de partes
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

    // Configurar listeners para las filas iniciales de partes
    const initialPartRows = partsContainer.querySelectorAll('.part-row');
    initialPartRows.forEach(row => {
        setupPartRowListeners(row);
        calculatePartSubtotal(row); // Calcular el subtotal inicial
    });
    calculatePartsTotal(); // Calcular el total inicial de partes

    // Agregar más filas de partes
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
                        <input type="text" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly value="0,00">
                    </div>
                </div>
            </div>
        `;
        partsContainer.insertBefore(newPartRow, addPartButton);
        setupPartRowListeners(newPartRow);
        calculatePartsTotal();
        updateGrandTotal();
    });

    // Calcular el subtotal de una fila de mano de obra
    function calculateWorkforceSubtotal(workforceRow) {
        const hoursInput = workforceRow.querySelector(".workforceHrs");
        const pricePerHourInput = workforceRow.querySelector(".workforcePriceHr");
        const subTotalInput = workforceRow.querySelector(".workforceSubTotal");

        const hours = parseFloat(hoursInput.value) || 0;
        const pricePerHour = parseFloat(pricePerHourInput.value) || 0;
        const subTotal = hours * pricePerHour;

        subTotalInput.value = formatNumberWithCommas(subTotal);
    }

    // Configurar listeners para una fila de mano de obra
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

    // Configurar listeners para las filas iniciales de mano de obra
    const initialWorkforceRows = workforceContainer.querySelectorAll(".workforce-row");
    initialWorkforceRows.forEach(row => {
        setupWorkforceRowListeners(row);
        calculateWorkforceSubtotal(row); // Calcular el subtotal inicial
    });
    updateGrandTotal(); // Calcular el gran total inicial

    // Agregar más filas de mano de obra
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
                    <input type="text" id="workforceSubTotal" name="workforceSubTotal[]" step="0.01" class="workforceSubTotal" readonly value="0,00">
                </div>
            </div>
        `;
        workforceContainer.appendChild(workforceRow);
        setupWorkforceRowListeners(workforceRow);
        updateGrandTotal();
    });

    // Calcular el gran total
    function updateGrandTotal() {
        const partsTotal = parseNumber(partsTotalInput.value);
        let workforceTotal = 0;
        document.querySelectorAll(".workforce-row").forEach(row => {
            workforceTotal += parseNumber(row.querySelector(".workforceSubTotal").value);
        });
        grandTotalInput.value = formatNumberWithCommas(partsTotal + workforceTotal);
    }
});
