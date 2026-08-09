import { getCurrentGoldPrice } from './GoldPrice.js';

async function updateNavTicker() {
    const liveGoldPrice = document.querySelector('.nav-ticker');


    try {
        const price = await getCurrentGoldPrice();
        
        liveGoldPrice.textContent = `GOLD: USD ${price}/oz`;
    } catch (error) {
        console.error('Error fetching live gold price:', error);
        liveGoldPrice.textContent = 'GOLD: USD N/A';
    }
}
updateNavTicker()

setInterval(updateNavTicker,60000)