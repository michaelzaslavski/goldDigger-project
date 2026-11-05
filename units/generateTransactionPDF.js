import PdfPrinter from 'pdfmake';
import fs from 'fs';

// Backend example inside your /api/buy or /api/sell route
export function generateTransactionPDF(transactionData) {
  const docDefinition = {
    content: [
      { text: 'MIZZAS - Transaction Receipt', style: 'header' },
      { text: `Date: ${new Date().toLocaleDateString()}`, margin: [0, 0, 0, 10] },
      {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            ['Type', 'Gold (oz)', 'Price / oz', 'Total Paid (USD)'],
            [
              transactionData.type.toUpperCase(),
              `${transactionData.gold_oz} oz`,
              `$${transactionData.price_per_oz}`,
              `$${transactionData.amount_usd}`
            ]
          ]
        }
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
    }
  };

  // Generate buffer or stream to return to client
}