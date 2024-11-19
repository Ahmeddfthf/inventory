document.addEventListener('DOMContentLoaded', () => {
    const inventoryForm = document.getElementById('inventory-form');
    const inventoryList = document.getElementById('inventory-list');
    const orderForm = document.getElementById('order-form');
    const orderList = document.getElementById('order-list');
    const inventory = {};

    inventoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemQuantity = document.getElementById('item-quantity').value;

        if (inventory[itemName]) {
            inventory[itemName] += parseInt(itemQuantity, 10);
        } else {
            inventory[itemName] = parseInt(itemQuantity, 10);
        }

        updateInventoryList();
        inventoryForm.reset();
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orderItemName = document.getElementById('order-item-name').value;
        const orderQuantity = document.getElementById('order-quantity').value;

        if (inventory[orderItemName] && inventory[orderItemName] >= orderQuantity) {
            inventory[orderItemName] -= parseInt(orderQuantity, 10);
            addToOrderList(orderItemName, orderQuantity);
            updateInventoryList();
            orderForm.reset();
        } else {
            alert('الكمية المطلوبة غير متوفرة في المخزون');
        }
    });

    function updateInventoryList() {
        inventoryList.innerHTML = '';
        for (const item in inventory) {
            const li = document.createElement('li');
            li.textContent = `${item}: ${inventory[item]} وحدة`;
            inventoryList.appendChild(li);
        }
    }

    function addToOrderList(itemName, quantity) {
        const li = document.createElement('li');
        li.textContent = `المنتج: ${itemName}, الكمية: ${quantity}`;
        orderList.appendChild(li);
    }
});
