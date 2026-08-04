import http from 'http'; 
import path from 'path';
import { serveStatic } from './units/serveStatic.js';
import { handleGoldPrice } from './handlers/routeHandlers.js';
import {handletransactionRequest} from './handlers/handlerTransactions.js';
import { handleCustomerSummary } from './handlers/routeHandlers.js';


const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async(req, res) => {
if(req.url === '/api/gold-price') {
    if(req.method === 'GET') {
  await handleGoldPrice(res);
    }else if(req.url === '/api/customer-summary') {
        if(req.method === 'GET') {
            const liveGoldPrice = await serveGoldPrice();
            await handleCustomerSummary(res, liveGoldPrice);
        } 
    }
    if(req.method === 'POST') {

    if(req.url === '/api/sell') {
        await handletransactionRequest('sell', req, res);
    }else if(req.url === '/api/buy') {
        await handletransactionRequest('buy', req, res);


} 
}else if(!req.url.startsWith('/api')) {
  await serveStatic(req, res, __dirname);
}
}
});

// ✅ Includes http:// (clickable in VS Code & macOS Terminal)
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
