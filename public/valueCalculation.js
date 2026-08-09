import { getCurrentGoldPrice } from './GoldPrice.js';
import { data } from './data.js';

const checkoutValue = document.getElementById('checkout-value');
const qtyPills = document.querySelectorAll('.qty-pill');
const customQtyInput = document.getElementById('custom-qty-input');
const tradeForm = document.querySelector('#trade-form');

const FEE_USD = 10.00;

export async function valueCalculation() {
  const tradeType = tradeForm?.dataset.type || 'buy';
  const inputQty = parseFloat(customQtyInput?.value) || 0;

  // 1. Validation: Quantity must be > 0
  if (inputQty <= 0) {
    checkoutValue.textContent = 'USD 0.00';
    return null;
  }

  const goldPrice = Number(await getCurrentGoldPrice()) || 0;
  const baseCost = inputQty * goldPrice;

  // 2. Universal calculation: Buy adds fee, Sell subtracts fee
  const totalCost = tradeType === 'buy' ? (baseCost + FEE_USD) : (baseCost - FEE_USD);

  // 3. Validation: Sell holdings check
  if (tradeType === 'sell') {
    const { summary } = await data();
    if ((summary?.total_gold_oz || 0) < inputQty) {
      alert('Insufficient gold holdings for this transaction.');
      checkoutValue.textContent = 'USD 0.00';
      return null;
    }
  }

  // 4. Update UI
  checkoutValue.textContent = `USD ${totalCost.toFixed(2)}`;

  // 5. Always return the universal object shape expected by trade.js
  return {
    goldPrice,
    inputQty,
    totalCost
  };
}

// Attach pill event listeners
qtyPills.forEach(pill => {
  pill.addEventListener('click', async (event) => {
    event.preventDefault();
    const currentQty = parseFloat(customQtyInput.value) || 0;
    const addedOz = parseFloat(event.target.dataset.oz) || 0;

    customQtyInput.value = (currentQty + addedOz).toFixed(1);
    await valueCalculation();
  });
});

// Live update when typing custom quantity
customQtyInput?.addEventListener('input', valueCalculation);