

export async function getCurrentGoldPrice() {
    try {
        const response = await fetch('/api/gold-price');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const price = Number(data.price).toFixed(2);
        return price;
    } catch (error) {
        console.error('Error fetching live gold price:', error);
        return null;
    }
}