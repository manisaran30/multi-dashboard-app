🌐 Multi-Dashboard App(https://multi-dashboard-app.vercel.app/)

A modern dashboard web app that fetches and displays data from multiple APIs, including weather and cryptocurrency, with a clean UI and smooth user experience.

![Dashboard Preview](public/dashboard-preview.png) <!-- Add an actual image or remove this -->

---

## 🚀 Features

- ⛅ Real-time Weather Info
- 💰 Cryptocurrency Market Data
- ⭐ Favorites System (for cities and coins)
- 📊 Historical Price Charts (Cryptos)
- ⚡ Fast Routing with SSR/SSG
- 🔁 Auto Data Refresh every 60 seconds
- ⚠️ Graceful Fallback on API Failures

---

## 🛠️ Tech Stack

| Tech            | Purpose                    |
|-----------------|----------------------------|
| Next.js         | React framework + SSR/SSG  |
| Tailwind CSS    | Styling and UI             |
| Chart.js        | Crypto price history chart |
| CoinGecko API   | Crypto data source         |
| OpenWeather API | Weather data source        |
| localStorage    | Persist favorites          |

---

## 📁 Project Structure

```
/components         # Reusable UI components
/pages              # Routes (Next.js)
  └── /crypto/[id]  # Dynamic route for each crypto
/utils              # Helper functions (e.g., API formatters)
```

---

🧠 Design Decisions

1. Next.js for SSR/SSG
- We use `getServerSideProps` to pre-fetch data for deep links (e.g. `/crypto/bitcoin`) to improve SEO and performance.
- Ensures each detail page is crawlable and loads with data on first request.

2. Modular Components
- The app is built with atomic design principles (Dashboard → Card → Data).
- Helps in scaling and maintaining UI elements across different dashboards.

3. Auto Refresh & Fallbacks
- Crypto and weather data auto-refresh every 60s using `setInterval`.
- On API failure, we show fallback UI instead of breaking the app.

4. Favorites Feature
- Favorites are stored in `localStorage` so they persist across sessions.
- Highlighted visually and grouped separately for quick access.

5. Routing Strategy
- Dynamic routing for cryptos (`/crypto/[id]`).
- Ensures deep links work directly, both with SSR and client-side transitions.

---

🧪 Run Locally

```bash
Clone the repo
git clone https://github.com/manisaran30/multi-dashboard-app.git
cd multi-dashboard-app

Install dependencies
npm install

Run the dev server
npm run dev
```

App will be live on `http://localhost:3000`

---

🌍 APIs Used

- [CoinGecko API](https://www.coingecko.com/en/api)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

📈 TODO

- Add user authentication
- Theme switch (dark/light mode)
- Mobile responsiveness (in progress)
- PWA support for offline access

---

🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

---

🧑‍💻 Author

[Manisaran](https://github.com/manisaran30) — passionate about building data-driven products and delightful UI.

---

```

Let me know if you'd like to include badges (like Netlify deploy, GitHub stars, or version), or a logo/banner!
