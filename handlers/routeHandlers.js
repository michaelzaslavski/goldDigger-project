import {serveGoldPrice} from '../units/serveGoldPrice.js';
import { sendResponse } from '../units/sendResponse.js';
import { getData} from '../units/getData.js';



export async function handleGoldPrice(res) {
  try {
    const rawPrice = await serveGoldPrice();
    // Wrap inside { price } object so nav.js can read data.price correctly
    const content = JSON.stringify({ price: rawPrice });
    await sendResponse(res, 200, 'application/json', content);
  } catch (err) {
    console.error("Error in handleGoldPrice:", err);
    await sendResponse(res, 500, 'application/json', JSON.stringify({ error: err.message }));
  }
}

export async function handleCustomerSummary(res, liveGoldPrice) {
    try{
        const customerSummary = await getData(liveGoldPrice);
        if(customerSummary) {
            const content = JSON.stringify(customerSummary);
            await sendResponse(res, 200, 'application/json', content);
        } else {
            await sendResponse(res, 404, 'application/json', JSON.stringify({ error: "Customer summary not found." }));
        }



    }catch(error){
        console.error("Error in handleCustomerSummary:", error);
        await sendResponse(res, 500, 'application/json', JSON.stringify({ error: error.message }));
    }
}
