import { createClient } from '@supabase/supabase-js';



const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_PUBLISHABLE_KEY);


    export async function getData(liveGoldPrice) {

    const {data:customerData, error:dbError} = await supabase.rpc('get_portfolio_summary',{
        current_spot_price: liveGoldPrice
    })


    if (dbError) {
    console.error("Database Error:", dbError);
    return null;
  }

  return customerData; // Return the summary object
}