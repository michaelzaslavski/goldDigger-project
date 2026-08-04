async function updateNavTicker() {
    const liveGoldPrice = document.querySelector('.nav-ticker');


    try {
        const response = await fetch('/api/gold-price');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const price = Number(data.price).toFixed(2);
        
        liveGoldPrice.textContent = `GOLD: USD ${price}/oz`;
    } catch (error) {
        console.error('Error fetching live gold price:', error);
        liveGoldPrice.textContent = 'GOLD: USD N/A';
    }
}
updateNavTicker()

export function getCurrentGoldPrice() {
  return { value: price };
}