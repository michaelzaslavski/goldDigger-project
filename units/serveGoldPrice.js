let cachedPrice= null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds


export async function serveGoldPrice () {
    const now =  Date.now();

if(cachedPrice && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedPrice;
}

try{
    const response = await fetch('https://api.gold-api.com/price/XAU/USD')
    const data = await response.json();
    
    if(data && data.price) {
        cachedPrice = data.price;
        lastFetchTime = now;
        console.log("Updated live gold price:", cachedPrice);
    
    }

}catch(err) {

    console.error("API failed! Keeping last known price:", cachedPrice);
}
if (!cachedPrice) {
    throw new Error("Unable to fetch initial gold price from API.");
  }

  return cachedPrice.toFixed(2);
}