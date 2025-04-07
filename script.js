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
        if (partsTotalInput) {
            partsTotalInput.value = total.toFixed(2);
        }
    }

    function setupPartRowListeners(partDiv) {
        const qtInput = partDiv.querySelector('.partQt');
        const unitPriceInput = partDiv.querySelector('.partUnitPrice');

        const recalculate = () => {
            calculatePartSubtotal(partDiv);
            calculatePartsTotal();
        };

        qtInput.addEventListener('input', recalculate);
        unitPriceInput.addEventListener('input', recalculate);
    }

    // Inicializar los listeners para la primera fila de partes
    const initialPartDiv = partsContainer.querySelector('.part-row');
    if (initialPartDiv) {
        setupPartRowListeners(initialPartDiv);
        calculatePartSubtotal(initialPartDiv);
        calculatePartsTotal();
    }

    // Evento para agregar más partes
    addPartButton.addEventListener('click', function () {
        const newPartDiv = document.createElement('div');
        newPartDiv.classList.add('part-row');
        newPartDiv.innerHTML = `
            <div>
                <label>Part Number:</label>
                <input type="text" name="partNumber[]">
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="partDescription[]">
            </div>
            <div>
                <label>Qty:</label>
                <input type="number" name="partQt[]" min="0" class="partQt" value="0">
            </div>
            <div>
                <label>Unit Price: $</label>
                <input type="number" name="partUnitPrice[]" step="0.01" class="partUnitPrice" value="0">
            </div>
            <div>
                <label>Sub Total: $</label>
                <input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly value="0.00">
            </div>
            <hr>
        `;
        partsContainer.appendChild(newPartDiv);
        setupPartRowListeners(newPartDiv);
    });
});
