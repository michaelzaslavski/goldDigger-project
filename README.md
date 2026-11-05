# 🪙 GoldDigger — Real-Time Gold Portfolio & Transaction Tracker

A full-stack web application designed to track live gold spot prices, manage physical gold inventory, and calculate real-time portfolio valuations with persistent transaction history.

Built from scratch with a focus on deterministic state management, asynchronous API integration, and clean relational data storage.

---

## ✨ Key Features

- **Live Market Data:** Integrates with an external financial REST API to fetch live gold spot prices and currency rates.
- **Dynamic Portfolio Valuation:** Real-time calculation of total portfolio worth, weight metrics (grams/ounces), and profit/loss distribution.
- **Historical Transaction Logging:** Persistent relational database storage logging timestamped buy/sell transactions, purchase prices, and asset quantities.
- **Asynchronous Error & Fallback Handling:** Robust handling of network latency, API rate limits, and server-side state synchronizations.
- **Clean Architecture:** Modular component structure separating presentation, state management, and API logic.

---

## 🏗 Architecture & Data Flow

```text
[ External Gold Price API ]
            │ (REST / HTTPS)
            ▼
┌───────────────────────┐
│     Client / App      │ ◄─── User Actions (Buy / Sell / View)
│  (State & Logic Layer)│
└───────────┬───────────┘
            │
            ▼ (Async SQL Queries)
┌───────────────────────┐
│  Relational Database  │ (Transaction History, Asset Balances)
└───────────────────────┘
