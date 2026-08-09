import { valueCalculation } from './valueCalculation.js';

import {data} from './data.js';


const customQtyInput = document.getElementById('custom-qty-input');
const tradeForm = document.querySelector('#trade-form');
const ratePrice = document.getElementById('rate-price');
const checkoutValue = document.getElementById('checkout-value');



tradeForm.addEventListener('submit', async (event) => {
event.preventDefault();
const tradetype = tradeForm.dataset.type; // Get the trade type from the form's data attribute
const endpoint = `/api/${tradetype}`; // Determine the endpoint based on the trade type



try {
const { goldPrice, inputQty, totalCost } = await valueCalculation();

const response = await fetch(endpoint, {
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
customQtyInput.value = '0';
checkoutValue.textContent = 'USD 0.00';
await valueCalculation();

}else {
const errorData = await response.json();
console.error('Purchase failed:', errorData);
alert(`Purchase failed: ${errorData.error}`);
}

} catch (error) {
console.error('Error during purchase:', error);
alert('An error occurred during the purchase. Please try again.');
}








}); 

