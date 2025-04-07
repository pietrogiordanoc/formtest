document.addEventListener('DOMContentLoaded', function() {
    const partsContainer = document.querySelector('.parts');
    const addPartButton = document.querySelector('.add-part');
    const partsTotalInput = document.querySelector('.partsTotal');

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

        qtInput.addEventListener('input', function() {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        });

        unitPriceInput.addEventListener('input', function() {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
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
        newPartDiv.innerHTML = `
            <div>
                <div>
                    <label for="partNumber">Part Number:</label>
                    <input type="text" id="partNumber" name="partNumber[]">
                </div>
                <div>
                    <label for="partDescription">Description:</label>
                    <input type="text" id="partDescription" name="partDescription[]">
                </div>
                <div class="qt-price-row">
                    <div>
                        <label for="partQt">Qt:</label>
                        <input type="number" id="partQt" name="partQt[]" min="0" class="partQt">
                    </div>
                    <div>
                        <label for="partUnitPrice">Unit Price:</label>
                        <label>$
                            <input type="number" id="partUnitPrice" name="partUnitPrice[]" step="0.01" class="partUnitPrice">
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label for="partSubTotal">Sub Total:</label>
                <label>$
                    <input type="number" id="partSubTotal" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly>
                </label>
            </div>
        `;
        partsContainer.insertBefore(newPartDiv, addPartButton);
        setupPartRowListeners(newPartDiv);
    });
});