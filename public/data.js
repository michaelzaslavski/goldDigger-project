

export async function data() { 
  try {
    
    const response = await fetch('/api/customer-summary');

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
     const data = await response.json();
     if(data) {
     const {summary, transactions} = data;
     return {summary, transactions};
     }
  } catch (error) {
    console.error('Error fetching customer summary:', error);
    return {summary: null, transactions: null};
}
}

