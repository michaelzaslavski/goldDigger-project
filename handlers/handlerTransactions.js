
import { sendResponse } from '../units/sendResponse.js';
import { validateData} from '../units/validateData.js';
import { parseData} from '../units/parseData.js';
import { sendData } from '../units/sendData.js';



export async function handletransactionRequest(type, req, res) {


try {
const parsedbody = await parseData(req);
const validatedbody = validateData(parsedbody);
await sendData(type,validatedbody);
await sendResponse(res, 200, 'application/json', JSON.stringify(validatedbody));



}catch(error) {
    console.error("Error in handletransactionRequest:", error);
    await sendResponse(res, 400, 'application/json', JSON.stringify({ error: error.message }));
}  
}

