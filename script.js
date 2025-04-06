document.addEventListener('DOMContentLoaded', function () {
    // ---- CODE MOVED FROM index.html ----
    function createEquipmentEntry() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <label for="espressoBrandModel">Espresso Brand & Model:</label>
                <input type="text" name="espressoBrandModel[]">
            </div>
            <div>
                <label for="espressoSerialNumber">Serial Number:</label>
                <input type="text" name="espressoSerialNumber[]">
            </div>
        `;
        return div;
    }
    function createGrinderEntry() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <label for="grinderBrandModel">Grinder Brand & Model:</label>
                <input type="text" name="grinderBrandModel[]">
            </div>
            <div>
                <label for="grinderSerialNumber">Serial Number:</label>
                <input type="text" name="grinderSerialNumber[]">
            </div>
        `;
        return div;
    }
    function createDripEntry() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <label for="dripBrewerBrandModel">Drip Brewer Brand & Model:</label>
                <input type="text" name="dripBrewerBrandModel[]">
            </div>
            <div>
                <label for="dripBrewerSerialNumber">Drip Brewer Serial Number:</label>
                <input type="text" name="dripBrewerSerialNumber[]">
            </div>
        `;
        return div;
    }
    function createPartsEntry() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <div>
                    <label for="partNumber">Part Number:</label>
                    <input type="text" name="partNumber[]">
                </div>
                <div>
                    <label for="partDescription">Description:</label>
                    <input type="text" name="partDescription[]">
                </div>
                <div class="qt-price-row">
                    <div>
                        <label for="partQt">Qt:</label>
                        <input type="number" name="partQt[]" min="0" class="partQt">
                    </div>
                    <div>
                        <label for="partUnitPrice">Unit Price:</label>
                        <label>$
                            <input type="number" name="partUnitPrice[]" step="0.01" class="partUnitPrice">
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label for="partSubTotal">Sub Total:</label>
                <label>$
                    <input type="number" name="partSubTotal[]" step="0.01" class="partSubTotal" readonly>
                </label>
            </div>
        `;
        return div;
    }
    function createWorkforceEntry() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <label for="workforceHrs">Hrs:</label>
                <input type="number" name="workforceHrs[]" min="0" class="workforceHrs">
            </div>
            <div>
                <label for="workforceNotes">Notes:</label>
                <input type="text" name="workforceNotes[]">
            </div>
            <div>
                <label for="workforcePriceHr">Price/Hr (USD):</label>
                <label>$
                    <input type="number" name="workforcePriceHr[]" step="0.01" class="workforcePriceHr">
                </label>
            </div>
            <div>
                <label for="workforceSubTotal">Sub Total (USD):</label>
                <label>$
                    <input type="number" name="workforceSubTotal[]" step="0.01" class="workforceSubTotal" readonly>
                </label>
            </div>
        `;
        return div;
    }

    function calculatePartSubtotal(entry) {
        const qt = parseFloat(entry.querySelector('.partQt').value) || 0;
        const unitPrice = parseFloat(entry.querySelector('.partUnitPrice').value) || 0;
        const subTotal = qt * unitPrice;
        entry.querySelector('.partSubTotal').value = subTotal.toFixed(2);
        updatePartsTotal();
    }

    function calculateWorkforceSubtotal(entry) {
        const hrs = parseFloat(entry.querySelector('.workforceHrs').value) || 0;
        const priceHr = parseFloat(entry.querySelector('.workforcePriceHr').value) || 0;
        const subTotal = hrs * priceHr;
        entry.querySelector('.workforceSubTotal').value = subTotal.toFixed(2);
    }

    function updatePartsTotal() {
        let total = 0;
        document.querySelectorAll('.partSubTotal').forEach(subTotalInput => {
            total += parseFloat(subTotalInput.value) || 0;
        });
        document.getElementById('partsTotal').value = total.toFixed(2);
    }

    document.querySelector('.equipment .add-equipment').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.insertBefore(createEquipmentEntry(), this);
    });
    document.querySelector('.grinder .add-grinder').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.insertBefore(createGrinderEntry(), this);
    });
    document.querySelector('.drip .add-drip').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.insertBefore(createDripEntry(), this);
    });
    document.querySelector('.parts .add-part').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.insertBefore(createPartsEntry(), this);
        attachCalculationListeners(this.parentNode.lastElementChild);
    });
    document.querySelector('.workforce .add-workforce').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.insertBefore(createWorkforceEntry(), this);
        attachWorkforceCalculationListeners(this.parentNode.lastElementChild);
    });

    function attachCalculationListeners(entry) {
        entry.querySelector('.partQt').addEventListener('input', function () {
            calculatePartSubtotal(entry);
        });
        entry.querySelector('.partUnitPrice').addEventListener('input', function () {
            calculatePartSubtotal(entry);
        });
    }

    function attachWorkforceCalculationListeners(entry) {
        entry.querySelector('.workforceHrs').addEventListener('input', function () {
            calculateWorkforceSubtotal(entry);
        });
        entry.querySelector('.workforcePriceHr').addEventListener('input', function () {
            calculateWorkforceSubtotal(entry);
        });
    }

    document.querySelectorAll('.parts > div').forEach(entry => {
        attachCalculationListeners(entry);
    });

    document.querySelectorAll('.workforce > div').forEach(entry => {
        attachWorkforceCalculationListeners(entry);
    });

    updatePartsTotal();
    // ---- END CODE MOVED FROM index.html ----
});