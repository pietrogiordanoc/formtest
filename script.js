document.addEventListener('DOMContentLoaded', function () {
    // ========== PARTES ========== 
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.getElementById('partsTotal');

    function calculatePartSubtotal(partDiv) {
        const qt = parseFloat(partDiv.querySelector('.partQt')?.value) || 0;
        const price = parseFloat(partDiv.querySelector('.partUnitPrice')?.value) || 0;
        const subtotal = qt * price;
        partDiv.querySelector('.partSubTotal').value = subtotal.toFixed(2);
    }

    function calculatePartsTotal() {
        let total = 0;
        partsContainer.querySelectorAll('.partSubTotal').forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        partsTotalInput.value = total.toFixed(2);
        calculateGrandTotal();
    }

    function setupPartListeners(partDiv) {
        partDiv.querySelector('.partQt')?.addEventListener('input', () => {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        });
        partDiv.querySelector('.partUnitPrice')?.addEventListener('input', () => {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        });
    }

    const initialPart = partsContainer.querySelector('> div');
    if (initialPart) setupPartListeners(initialPart);

    addPartButton.addEventListener('click', () => {
        const newPartDiv = document.createElement('div');
        newPartDiv.classList.add('part');
        newPartDiv.innerHTML = `
            <div class="form-row">
                <div class="form-column">
                    <label for="partNumber">Part Number:</label>
                    <input type="text" name="partNumber[]">
                </div>
                <div class="form-column">
                    <label for="partDescription">Descripción:</label>
                    <input type="text" name="partDescription[]">
                </div>
            </div>
            <div class="qt-price-row">
                <div class="form-column">
                    <label for="partQt">Cantidad:</label>
                    <input type="number" name="partQt[]" min="0" class="partQt">
                </div>
                <div class="form-column">
                    <label for="partUnitPrice">Precio Unitario:</label>
                    <input type="number" name="partUnitPrice[]" step="0.01" class="partUnitPrice">
                </div>
            </div>
            <div class="form-row">
                <label for="partSubTotal">Sub Total:</label>
                <input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly>
            </div>
        `;
        partsContainer.insertBefore(newPartDiv, addPartButton);
        setupPartListeners(newPartDiv);
    });

    // ========== FUERZA LABORAL ========== 
    const workforceContainer = document.querySelector('.workforce');
    const addWorkforceBtn = document.querySelector('.add-workforce');
    const workforceTotalInput = document.getElementById('workforceTotal');

    function calculateWorkforceSubtotal(row) {
        const hrs = parseFloat(row.querySelector('.workforceHrs')?.value) || 0;
        const price = parseFloat(row.querySelector('.workforcePriceHr')?.value) || 0;
        const subtotal = hrs * price;
        row.querySelector('.workforceSubTotal').value = subtotal.toFixed(2);
    }

    function calculateWorkforceTotal() {
        let total = 0;
        workforceContainer.querySelectorAll('.workforceSubTotal').forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        workforceTotalInput.value = total.toFixed(2);
        calculateGrandTotal();
    }

    function setupWorkforceRow(row) {
        row.querySelector('.workforceHrs')?.addEventListener('input', () => {
            calculateWorkforceSubtotal(row);
            calculateWorkforceTotal();
        });
        row.querySelector('.workforcePriceHr')?.addEventListener('input', () => {
            calculateWorkforceSubtotal(row);
            calculateWorkforceTotal();
        });
    }

    const initialWorkforce = workforceContainer.querySelector('> div');
    if (initialWorkforce) setupWorkforceRow(initialWorkforce);

    addWorkforceBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('workforce-row');
        newRow.innerHTML = `
            <div class="workforce-row">
                <label for="workforceHrs">Horas:</label>
                <input type="number" name="workforceHrs[]" min="0" class="workforceHrs">
            </div>
            <div class="workforce-row">
                <label for="workforceNotes">Notas:</label>
                <input type="text" name="workforceNotes[]">
            </div>
            <div class="workforce-row">
                <label for="workforcePriceHr">Precio/Hora (USD):</label>
                <input type="number" name="workforcePriceHr[]" step="0.01" class="workforcePriceHr">
            </div
