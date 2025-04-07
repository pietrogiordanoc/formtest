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

    function calculatePartSubtotal(partRow) {
        const qtInput = partRow.querySelector('.partQt');
        const unitPriceInput = partRow.querySelector('.partUnitPrice');
        const subTotalInput = partRow.querySelector('.partSubTotal');

        const qt = parseFloat(qtInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const subTotal = qt * unitPrice;

        subTotalInput.value = formatNumberWithCommas(subTotal);
    }

    function calculatePartsTotal() {
        let total = 0;
        const subTotalInputs = partsContainer.querySelectorAll('.partSubTotal');
        subTotalInputs.forEach(input => {
            total += parseFloat(input.value.replace(/\./g, '').replace(',', '.')) || 0;
        });
        partsTotalInput.value = formatNumberWithCommas(total);
    }

    function setupPartRowListeners(partRow) {
        const qtInput = partRow.querySelector('.partQt');
        const unitPriceInput = partRow.
