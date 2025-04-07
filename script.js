document.addEventListener('DOMContentLoaded', function () {
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.getElementById('partsTotal');
    
    const workforceContainer = document.querySelector('.workforce');
    const addWorkforceButton = document.querySelector('.add-workforce');
    const workforceSubTotalInputs = document.querySelectorAll('.workforceSubTotal');

    // Calcular el subtotal de los repuestos
    function calculatePartSubtotal(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');
        const subTotalInput = partDiv.querySelector('.partSubTotal');

        const qt = parseFloat(qtInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const subTotal = qt * unitPrice;

        subTotalInput.value = subTotal.toFixed(2);
    }

    // Calcular el total de los repuestos
    function calculatePartsTotal() {
        let total = 0;
        const subTotalInputs = partsContainer.querySelectorAll('.partSubTotal');
        subTotalInputs.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        partsTotalInput.value = total.toFixed(2);
    }

    // Calcular el subtotal de workforce
    function calculateWorkforceSubtotal(workforceDiv) {
        const hoursInput = workforceDiv.querySelector('.workforceHrs');
        const pricePerHourInput = workforceDiv.querySelector('.workforcePriceHr');
        const subTotalInput = workforceDiv.querySelector('.workforceSubTotal');

        const hours = parseFloat(hoursInput.value) || 0;
        const pricePerHour = parseFloat(pricePerHourInput.value) || 0;
        const subTotal = hours * pricePerHour;

        subTotalInput.value = subTotal.toFixed(2);
    }

    // Calcular el total de workforce
    function calculateWorkforceTotal() {
        let total = 0;
        const subTotalInputs = workforceContainer.querySelectorAll('.workforceSubTotal');
        subTotalInputs.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        const grandTotalInput = document.getElementById('grandTotal');
        grandTotalInput.value = total.toFixed(2);
    }

    // Configurar los listeners para las filas de repuestos
    function setupPartRowListeners(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');

        const onChange = () => {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        };

        qtInput.addEventListener('input', onChange);
        unitPriceInput.addEventListener('input', onChange);
    }

    // Configurar los listeners para las filas de workforce
    function setupWorkforceRowListeners(workforceDiv) {
        const hoursInput = workforceDiv.querySelector('.workforceHrs');
        const pricePerHourInput = workforceDiv.querySelector('.workforcePriceHr');

        const onChange = () => {
            calculateWorkforceSubtotal(workforceDiv);
            calculateWorkforceTotal();
        };

        hoursInput.addEventListener('input', onChange);
        pricePerHourInput.addEventListener('input', onChange);
    }

    // Configuración de la primera fila de repuestos
    const initialPartRow = partsContainer.querySelector('.part-row');
    if (initialPartRow) {
        setupPartRowListeners(initialPartRow);
    }

    // Configuración de la primera fila de workforce
    const initialWorkforceRow = workforceContainer.querySelector('.workforce');
    if (initialWorkforceRow) {
        setupWorkforceRowListeners(initialWorkforceRow);
    }

    // Agregar nueva fila de repuestos
    addPartButton.addEventListener('click', function () {
        const newPartDiv = document.createElement('div');
        newPartDiv.classList.add('part-row');
        newPartDiv.innerHTML = `
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
        partsContainer.insertBefore(newPartDiv, addPartButton);
        setupPartRowListeners(newPartDiv);
    });

    // Agregar nueva fila de workforce
    addWorkforceButton.addEventListener('click', function () {
        const newWorkforceDiv = document.createElement('div');
        newWorkforceDiv.classList.add('workforce-row');
        newWorkforceDiv.innerHTML = `
            <div>
                <label>Hrs:</label>
                <input type="number" name="workforceHrs[]" min="0" class="workforceHrs" value="0">
            </div>
            <div>
                <label>Notes:</label>
                <input type="text" name="workforceNotes[]">
            </div>
            <div>
                <label>Price/Hr (USD):</label>
                <input type="number" name="workforcePriceHr[]" step="0.01" class="workforcePriceHr" value="0">
            </div>
            <div>
                <label>Sub Total (USD):</label>
                <input type="number" name="workforceSubTotal[]" step="0.01" class="workforceSubTotal" readonly value="0.00">
            </div>
        `;
        workforceContainer.insertBefore(newWorkforceDiv, addWorkforceButton);
        setupWorkforceRowListeners(newWorkforceDiv);
    });
});
