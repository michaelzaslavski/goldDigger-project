

import{getCurrentGoldPrice} from './nav.js';


const checkoutValue = document.getElementById('checkout-value');
const priceSub = document.getElementById('price-sub');
const qtyPills = document.querySelectorAll('.qty-pill');
const buyForm = document.querySelector('#buy-form');
const customQtyInput = document.getElementById('custom-qty-input');
const liveGoldPrice = document.querySelector('.nav-ticker');









buyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    qtyPills.forEach(pill => {
        pill.addEventListener('click', (event) => {
    
            event.preventDefault();
    
    
            
            customQtyInput.value = (parseFloat(customQtyInput.value) || 0) + parseFloat(event.target.dataset.oz);
    
        });
    });

    const goldPrice = getCurrentGoldPrice().value;
    const inputQty = parseFloat(customQtyInput.value);
    const totalCost = inputQty * goldPrice;
    

    if (inputQty <= 0) {
        alert('Please select a valid gold quantity.');
        return;
    }
    const response = await fetch('/api/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount_usd: totalCost,
            gold_oz: inputQty,
            price_per_oz: goldPrice
        })
    });

    if (response.ok) {
        console.log('Purchase successful!');
        alert('Purchase successful!');
        customQtyInput.value = '';

    }
    


});