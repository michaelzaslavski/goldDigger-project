export function validateData(data) {
  // Convert inputs to strict numbers
  const amount_usd = Number(data.amount_usd);
  const gold_oz = Number(data.gold_oz);
  const price_per_oz = Number(data.price_per_oz);

  // 1. Check if any of them failed to convert into a real number (NaN = Not a Number)
  if (isNaN(amount_usd) || isNaN(gold_oz) || isNaN(price_per_oz)) {
    throw new Error("Invalid data: All transaction values must be numbers.");
  }

  // 2. Check to make sure someone isn't trying to buy negative gold
  if (amount_usd <= 0 || gold_oz <= 0 || price_per_oz <= 0) {
    throw new Error("Invalid data: Values must be greater than zero.");
  }

  // Return the cleaned, guaranteed-number values
  return { amount_usd, gold_oz, price_per_oz };
}