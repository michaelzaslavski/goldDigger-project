
import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_PUBLISHABLE_KEY);

export async function sendData(type,newTransaction) {


const{data: transactionData, error: transactionError} = await supabase.from('transactions').insert({
    type: type,
    amount_usd: newTransaction.amount_usd,
    gold_oz: newTransaction.gold_oz,
    price_per_oz: newTransaction.price_per_oz,
    




})
.select();
if(transactionError) {
    console.error("Error inserting transaction:", transactionError);
    throw new Error("Failed to insert transaction.");

}
return transactionData[0]; // Return the inserted transaction data
}