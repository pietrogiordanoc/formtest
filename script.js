<script>
document.addEventListener('DOMContentLoaded', function () {
    // ========== PARTS ==========
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
        newPartDiv.innerHTML = `
            <div>
                <div>
                    <label>Part Number:</label>
                    <input type="text" name="partNumber[]">
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="partDescription[]">
                </div>
                <div class="qt-price-row">
                    <div>
                        <label>Qt:</label>
                        <input type="number" name="partQt[]" min="0" class="partQt">
                    </div>
                    <div>
                        <label>Unit Price:</label>
                        <label>$<input type="number" name="partUnitPrice[]" step="0.01" class="partUnitPrice"></label>
                    </div>
                </div>
            </div>
            <div>
                <label>Sub Total:</label>
                <label>$<input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly></label>
            </div>
        `;
        partsContainer.insertBefore(newPartDiv, addPartButton);
        setupPartListeners(newPartDiv);
    });

    // ========== WORKFORCE ==========
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

    const initialWorkforce = workforceContainer;
    if (initialWorkforce) setupWorkforceRow(initialWorkforce);

    addWorkforceBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.innerHTML = `
            <div>
                <label>Hrs:</label>
                <input type="number" name="workforceHrs[]" min="0" class="workforceHrs">
            </div>
            <div>
                <label>Notes:</label>
                <input type="text" name="workforceNotes[]">
            </div>
            <div>
                <label>Price/Hr (USD):</label>
                <input type="number" name="workforcePriceHr[]" step="0.01" class="workforcePriceHr">
            </div>
            <div>
                <label>Sub Total (USD):</label>
                <input type="number" name="workforceSubTotal[]" step="0.01" class="workforceSubTotal" readonly>
            </div>
        `;
        workforceContainer.insertBefore(newRow, addWorkforceBtn);
        setupWorkforceRow(newRow);
    });

    // ========== GRAND TOTAL ==========
    const grandTotalInput = document.getElementById('grandTotal');

    function calculateGrandTotal() {
        const partsTotal = parseFloat(partsTotalInput?.value) || 0;
        const workforceTotal = parseFloat(workforceTotalInput?.value) || 0;
        const grandTotal = partsTotal + workforceTotal;
        grandTotalInput.value = grandTotal.toFixed(2);
    }
});
</script>
