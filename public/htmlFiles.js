import {data} from './data.js';
import {getCurrentGoldPrice} from './GoldPrice.js';

const ratePrice = document.getElementById('rate-price');
const pbSub = document.querySelector(".pb-sub")
const pbBalance = document.querySelector(".pb-balance")
const Availablelty = document.getElementById('Availablelty')


async function feeTransaction() {
    

const {summary, transactions} = await data()
const goldPrice = await getCurrentGoldPrice();



const currentportfolioValue = summary.current_market_value;
const currentportfolioOZ = summary.total_gold_oz


if(transactions.type === "buy"){
    const fee = 10.00; // Fixed fee in USD;
    const totalPrice = (Number(goldPrice) + Number(fee)).toFixed(2);
    ratePrice.textContent += `Rate: USD ${totalPrice} / oz`

}

pbSub.textContent += `Equivalent: USD${currentportfolioValue.toFixed(2)}`

pbBalance.textContent += `${currentportfolioOZ.toFixed(2)} oz`
Availablelty.textContent += `Available to sell: ${currentportfolioOZ.toFixed(2)} oz`

}
feeTransaction()