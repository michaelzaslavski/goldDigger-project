

export async function parseData(req) {
let body = '';

for await (const chunk of req){
    body += chunk; 
}
try{
    return JSON.parse(body);

}catch(err){
    console.error("Error parsing request body:", err);
    throw new Error("Invalid JSON in request body.");

}
}