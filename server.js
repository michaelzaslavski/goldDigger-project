import http from 'http'; 
import path from 'path';
import { serveStatic } from './units/serveStatic.js';
import { handleGoldPrice } from './handlers/routeHandlers.js';
import {handletransactionRequest} from './handlers/handlerTransactions.js';
import { handleCustomerSummary } from './handlers/routeHandlers.js';
import { serveGoldPrice } from './units/serveGoldPrice.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  
  // IF it is an API request:
  if (req.url.startsWith('/api')) {
    
    if (req.url === '/api/gold-price' && req.method === 'GET') {
      await handleGoldPrice(res);
    } 
    else if (req.url === '/api/customer-summary' && req.method === 'GET') {
      const liveGoldPrice = await serveGoldPrice();
      await handleCustomerSummary(res, liveGoldPrice);
    } 
    else if (req.url === '/api/sell' && req.method === 'POST') {
      await handletransactionRequest('sell', req, res);
    } 
    else if (req.url === '/api/buy' && req.method === 'POST') {
      await handletransactionRequest('buy', req, res);
    }

  } 
  // OTHERWISE (if it's NOT an API request, serve HTML/CSS/JS):
  else {
    await serveStatic(req, res, __dirname);
  }

});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));