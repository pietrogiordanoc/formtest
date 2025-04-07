document.addEventListener('DOMContentLoaded', function () {
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.getElementById('partsTotal');

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

        const onChange = () => {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        };

        qtInput.addEventListener('input', onChange);
        unitPriceInput.addEventListener('input', onChange);
    }

    // Setup listeners on the first row
    const initialPartRow = partsContainer.querySelector('.part-row');
    if (initialPartRow) {
        setupPartRowListeners(initialPartRow);
    }

    // Add new part row
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
});
