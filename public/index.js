// Target the main container from index.html
const pageContainer = document.getElementById('page-container');

async function initDashboard() {
  if (!pageContainer) return;

  try {
    
    const response = await fetch('/api/customer-summary');

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
     const data = await response.json();
    
     getHoldingsTableHTML(data) , renderInvestmentSummary(pageContainer, data);
  } catch (error) {
    console.error('Error fetching customer summary:', error);
    return null;
}
    renderEmptyState(pageContainer);
  }





// Helper: Generates HTML table string from data
function getHoldingsTableHTML(data) {
    const container = document.querySelector('.table-container');
    let tableHTML = '';
    data.forEach((item, index) => {

      tableHTML += `
    <table class="holdings-table">
      <thead>
        <tr>
          <th class="text-left">Date Purchased</th>
          <th class="text-right">Amount (USD)</th>
          <th class="text-right">Gold (oz)</th>
          <th class="text-right">Gold (kg)</th>
          <th class="text-right">Gold rate<br><span class="sub-header">(USD)</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="date-purchased" class="text-left">${data.date}</td>
          <td id="amount-purchased" class="text-right">${data.total_invested_usd.toFixed(2)}</td>
          <td class="text-right">${data.total_gold_oz.toFixed(4)}</td>
          <td class="text-right">${data.total_gold_kg.toFixed(4)}</td>
          <td class="text-right">USD ${data.current_spot_price.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `;
})

function renderEmptyState(container) {
  container.innerHTML = `
    <section class="main-card empty-state-welcome-card">
      <div class="empty-state-content">
        <h1 class="welcome-title">Welcome to My App</h1>
        <p class="welcome-text">It looks like you don't have any holdings yet. Start building your precious metals portfolio — buy gold instantly or list an item to sell.</p>
        
        <div class="welcome-action-buttons-stack">
          <a href="buy.html" class="btn btn-primary empty-stacked-btn">Buy Gold</a>
          <a href="sell.html" class="btn btn-secondary empty-stacked-btn">Sell Gold</a>
        </div>
        
        <p class="concierge-text">
          Prefer a walkthrough? Contact our concierge at 
          <a href="mailto:concierge@aurumvault.com" class="concierge-link">concierge@aurumvault.com</a> for assistance.
        </p>
      </div>
    </section>
  `;
}

function renderInvestmentSummary(container, data) {
  // Fixed: Target container.innerHTML directly
  container.innerHTML = `
    <section class="main-card">
      
      <!-- Left Portfolio Data Area -->
      <div class="portfolio-content">
        <h1 class="card-title">Investment Portfolio</h1>

        <!-- Dynamic Holdings Table -->
        <div class="table-container">
          ${getHoldingsTableHTML(data)}
        </div>

        <!-- Portfolio Total Banner -->
        <div class="summary-banner">
          <div class="summary-item">
            <span class="summary-label">Total Gold Held</span>
            <div class="summary-value">${data.total_gold_kg.toFixed(4)} kg • ${data.total_gold_oz.toFixed(4)} oz</div>
          </div>
          <div class="summary-item text-right">
            <span class="summary-label">Portfolio Market Value</span>
            <div class="summary-value">USD 40,000</div>
          </div>
        </div>

        <!-- Notes Footer -->
        <p class="notes-text">
        </p>
      </div>

      <!-- Right Sidebar Panel -->
      <aside class="portfolio-sidebar">
        
        <!-- Account Summary Card -->
        <div class="info-box">
          <span class="info-label">Account Summary</span>
          <div class="info-main-value">USD ${data.current_market_value.toFixed(2)}</div>
          <span class="info-subtext">Total profit/loss: USD ${data.profit_loss.toFixed(2)}</span>
        </div>

        <!-- Holdings Breakdown Card -->
        <div class="info-box">
          <span class="info-label">Holdings Breakdown</span>
          <div class="info-row">
            <span>Total gold</span>
            <strong>0.3119 kg</strong>
          </div>
          <div class="info-row">
            <span>Average purchase price</span>
            <strong>USD ${data.avg_price_per_oz.toFixed(2)}/oz</strong>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="info-box actions-box">
          <span class="info-label">Quick Actions</span>
          <a href="buy.html" class="btn btn-primary">Buy More</a>
          <a href="sell.html" class="btn btn-secondary">Sell</a>
        </div>

      </aside>
    </section>

    <!-- Bottom Three Feature Widgets -->
    <section class="widgets-grid">
      
      <!-- Widget 1: Spot Snapshot -->
      <div class="widget-card">
        <h3>Spot Snapshot</h3>
        <div class="widget-content">
          <svg class="chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
            <path d="M 10,60 L 30,50 L 50,70 L 70,55 L 90,52 L 110,75 L 130,55 L 150,68 L 170,62 L 190,75 L 210,50 L 230,75 L 250,58 L 270,70 L 290,90" fill="none" stroke="#555555" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 10,75 L 30,70 L 50,85 L 70,78 L 90,70 L 110,95 L 130,85 L 150,92 L 170,88 L 190,95 L 210,80 L 230,96 L 250,92 L 270,98 L 290,105" fill="none" stroke="#aaaaaa" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="10" y1="110" x2="290" y2="110" stroke="#333333" stroke-width="1.5"/>
          </svg>
        </div>
      </div>

      <!-- Widget 2: Vault Image -->
      <div class="widget-card">
        <h3>Vault Image</h3>
        <div class="widget-content img-container">
          <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=600&q=80" alt="Gold Bars in Vault">
        </div>
      </div>

      <!-- Widget 3: Market Heat -->
      <div class="widget-card">
        <h3>Market Heat</h3>
        <div class="widget-content">
          <svg class="chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
            <rect x="15" y="45" width="12" height="55" fill="#666666"/>
            <rect x="15" y="100" width="12" height="10" fill="#aaaaaa"/>
            <rect x="35" y="30" width="12" height="70" fill="#666666"/>
            <rect x="35" y="100" width="12" height="10" fill="#aaaaaa"/>
            <rect x="55" y="75" width="12" height="25" fill="#666666"/>
            <rect x="55" y="100" width="12" height="10" fill="#cccccc"/>
            <line x1="10" y1="110" x2="280" y2="110" stroke="#333333" stroke-width="1.5"/>
          </svg>
        </div>
      </div>

    </section>
  `;
}
}
// Run execution immediately
initDashboard();