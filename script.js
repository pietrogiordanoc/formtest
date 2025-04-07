document.addEventListener("DOMContentLoaded", function () {

    // Función para agregar una nueva parte
    document.querySelector(".add-part").addEventListener("click", function () {
        const partRow = document.createElement("div");
        partRow.classList.add("part-row");
        partRow.innerHTML = `
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
        document.querySelector(".parts").appendChild(partRow);
        updatePartsTotal();
    });

    // Función para agregar más trabajo de fuerza laboral
    document.querySelector(".add-workforce").addEventListener("click", function () {
        const workforceRow = document.createElement("div");
        workforceRow.innerHTML = `
            <div>
                <label for="workforceNotes">Notes:</label>
                <input type="text" class="workforceNotes" name="workforceNotes[]">
            </div>
            <div>
                <label for="workforceHrs">Hrs:</label>
                <input type="number" class="workforceHrs" name="workforceHrs[]" min="0">
            </div>
            <div>
                <label for="workforcePriceHr">Price/Hr (USD):</label>
                <input type="number" class="workforcePriceHr" name="workforcePriceHr[]" step="0.01">
            </div>
            <div>
                <label for="workforceSubTotal">Sub Total (USD):</label>
                <input type="number" class="workforceSubTotal" name="workforceSubTotal[]" step="0.01" readonly value="0.00">
            </div>
        `;
        document.querySelector(".workforce").appendChild(workforceRow);
        updateWorkforceTotal();
    });

    // Actualizar el total de partes
    function updatePartsTotal() {
        let total = 0;
        const partRows = document.querySelectorAll(".part-row");
        partRows.forEach(row => {
            const quantity = parseFloat(row.querySelector(".partQt").value) || 0;
            const unitPrice = parseFloat(row.querySelector(".partUnitPrice").value) || 0;
            const subTotal = quantity * unitPrice;
            row.querySelector(".partSubTotal").value = subTotal.toFixed(2);
            total += subTotal;
        });
        document.querySelector("#partsTotal").value = total.toFixed(2);
        updateGrandTotal();
    }

    // Actualizar el total de fuerza laboral
    function updateWorkforceTotal() {
        let total = 0;
        const workforceRows = document.querySelectorAll(".workforce > div");
        workforceRows.forEach(row => {
            const hours = parseFloat(row.querySelector(".workforceHrs").value) || 0;
            const pricePerHour = parseFloat(row.querySelector(".workforcePriceHr").value) || 0;
            const subTotal = hours * pricePerHour;
            row.querySelector(".workforceSubTotal").value = subTotal.toFixed(2);
            total += subTotal;
        });
        updateGrandTotal();
    }

    // Actualizar el total global (Parts + Workforce)
    function updateGrandTotal() {
        const partsTotal = parseFloat(document.querySelector("#partsTotal").value) || 0;
        const workforceTotal = Array.from(document.querySelectorAll(".workforceSubTotal")).reduce((total, input) => {
            return total + (parseFloat(input.value) || 0);
        }, 0);
        document.querySelector("#grandTotal").value = (partsTotal + workforceTotal).toFixed(2);
    }

    // Calcular el subtotal de partes cuando el usuario ingrese datos
    document.querySelector(".parts").addEventListener("input", updatePartsTotal);
    document.querySelector(".workforce").addEventListener("input", updateWorkforceTotal);
});
