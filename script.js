document.addEventListener('DOMContentLoaded', function () {
    // Funciones para actualizar subtotales y totales
    function updateSubtotalParts() {
        let totalParts = 0;
        document.querySelectorAll('.part-row').forEach(row => {
            const quantity = parseFloat(row.querySelector('.quantity-input').value) || 0;
            const price = parseFloat(row.querySelector('.price-input').value) || 0;
            const subtotal = quantity * price;
            row.querySelector('.subtotal').textContent = subtotal.toFixed(2);
            totalParts += subtotal;
        });
        updateTotal();
    }

    function updateSubtotalLabor() {
        let totalLabor = 0;
        document.querySelectorAll('.labor-row').forEach(row => {
            const labor = parseFloat(row.querySelector('.quantity-input').value) || 0;
            const laborCost = parseFloat(row.querySelector('.price-input').value) || 0;
            const subtotal = labor * laborCost;
            row.querySelector('.labor-subtotal').textContent = subtotal.toFixed(2);
            totalLabor += subtotal;
        });
        updateTotal();
    }

    function updateTotal() {
        let totalParts = 0;
        let totalLabor = 0;

        document.querySelectorAll('.part-row').forEach(row => {
            const subtotal = parseFloat(row.querySelector('.subtotal').textContent) || 0;
            totalParts += subtotal;
        });

        document.querySelectorAll('.labor-row').forEach(row => {
            const subtotal = parseFloat(row.querySelector('.labor-subtotal').textContent) || 0;
            totalLabor += subtotal;
        });

        const total = totalParts + totalLabor;
        document.querySelector('#total').textContent = total.toFixed(2);
    }

    // Funciones de actualización en tiempo real
    document.querySelector('#equipment-table').addEventListener('input', updateSubtotalParts);
    document.querySelector('#parts-table').addEventListener('input', updateSubtotalParts);
    document.querySelector('#labor-table').addEventListener('input', updateSubtotalLabor);

    // Agregar nuevas filas
    document.querySelector('#add-part-row').addEventListener('click', function() {
        const newRow = document.querySelector('.part-row').cloneNode(true);
        document.querySelector('#parts-table tbody').appendChild(newRow);
        newRow.querySelectorAll('input').forEach(input => input.value = 0);
    });

    document.querySelector('#add-labor-row').addEventListener('click', function() {
        const newRow = document.querySelector('.labor-row').cloneNode(true);
        document.querySelector('#labor-table tbody').appendChild(newRow);
        newRow.querySelectorAll('input').forEach(input => input.value = 0);
    });
});
