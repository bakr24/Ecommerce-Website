document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');
        
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        cart.push({ name, price, image, qty: 1 });
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        alert(name + " added!");
    });
});
 
        function updateQty(btn, change) {
            let input = btn.parentElement.querySelector('input');
            let val = parseInt(input.value) + change;
            if (val > 0) input.value = val;
            // In a real project, you would update the subtotal here too!
        }

        function toggleCard(show) {
            document.getElementById('card-details').style.display = show ? 'block' : 'none';
        }

        function processCheckout() {
            const method = document.querySelector('input[name="payment"]:checked').value;
            if (method === 'card') {
                alert("Processing card payment... Your order will be in 'My Orders' soon!");
            } else {
                alert("Order placed via Cash on Delivery! Check 'My Orders' for status.");
            }
            window.location.href = "order.html";
        }

        function loadCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let container = document.getElementById('cart-container');
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty</h3>";
        return;
    }

    container.innerHTML = `<h3>Shopping Cart (${cart.length} items)</h3>`;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        container.innerHTML += `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.name}" width="100">
                <div class="item-details" style="flex: 1; margin-left: 20px;">
                    <h4>${item.name}</h4>
                    <div class="item-actions">
                        <button onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i> Remove</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="item-quantity">
                        <button onclick="updateQty(${index}, -1)">-</button>
                        <input type="number" value="${item.qty}" readonly>
                        <button onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    <div class="item-total-price">$${(item.price * item.qty).toFixed(2)}</div>
                </div>
            </div>
        `;
    });

    // Update the Summary Sidebar
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    let tax = subtotal * 0.05;
    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('final-total').innerText = `$${(subtotal + tax).toFixed(2)}`;
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('myCart'));
    cart[index].qty += change;
    if (cart[index].qty < 1) cart[index].qty = 1;
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart(); // Refresh view
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('myCart'));
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart(); // Refresh view
}

// Run this when page loads
window.onload = loadCart
   