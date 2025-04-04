import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { fetchCrypto } from '../redux/cryptoSlice';
import { fetchNews } from '../redux/newsSlice';
import { toggleFavoriteCity, toggleFavoriteCrypto } from '../redux/preferenceSlice';
import AlertPanel from '../components/alertPanel';
import NewsCard from '../components/NewsCard';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data: weatherData, loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather);
  const { data: cryptoData, loading: cryptoLoading, error: cryptoError } = useSelector((state) => state.crypto);
  const { data: newsData, loading: newsLoading, error: newsError } = useSelector((state) => state.news);
  const favorites = useSelector((state) => state.preferences);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchWeather());
    dispatch(fetchCrypto());
    dispatch(fetchNews());

    // Periodic refresh every 60s
    const interval = setInterval(() => {
      dispatch(fetchWeather());
      dispatch(fetchCrypto());
      dispatch(fetchNews());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center">📊 Personalized Dashboard</h1>

      {/* 🔔 Real-Time Alert Panel */}
      <AlertPanel />

      {/* 🌤 Weather Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🌦 Weather Forecast</h2>
        {weatherError ? (
          <p className="text-red-500">Failed to load weather data. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weatherLoading ? (
              <p>Loading weather data...</p>
            ) : (
              weatherData.map((city) => {
                const isFav = favorites.favoriteCities.includes(city.name);
                return (
                  <div
                    key={city.id}
                    className="bg-white rounded-2xl p-5 shadow hover:shadow-md transition-all duration-300 relative"
                  >
                    <button
                      onClick={() => dispatch(toggleFavoriteCity(city.name))}
                      className={`absolute top-3 right-3 text-2xl focus:outline-none ${
                        isFav ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-400'
                      }`}
                      title="Toggle Favorite"
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                    <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                    <p className="text-sm">Temperature: {city.main.temp} °C</p>
                    <p className="text-sm">Humidity: {city.main.humidity} %</p>
                    <p className="text-sm capitalize">Condition: {city.weather[0].description}</p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* 💰 Crypto Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">💹 Cryptocurrency</h2>
        {cryptoError ? (
          <p className="text-red-500">Failed to load crypto data. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoLoading ? (
              <p>Loading crypto data...</p>
            ) : (
              cryptoData.map((coin) => {
                const isFav = favorites.favoriteCryptos.includes(coin.id);
                return (
                  <div
                    key={coin.id}
                    className="bg-white rounded-2xl p-5 shadow hover:shadow-md transition-all duration-300 relative"
                  >
                    <button
                      onClick={() => dispatch(toggleFavoriteCrypto(coin.id))}
                      className={`absolute top-3 right-3 text-2xl focus:outline-none ${
                        isFav ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-400'
                      }`}
                      title="Toggle Favorite"
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                    <h3 className="text-xl font-semibold mb-2">{coin.name}</h3>
                    <p className="text-sm">Price: ${coin.current_price}</p>
                    <p className="text-sm">
                      24h Change:{' '}
                      <span
                        className={
                          coin.price_change_percentage_24h >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </p>
                    <p className="text-sm">Market Cap: ${coin.market_cap.toLocaleString()}</p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* 📰 News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📰 Latest Headlines</h2>
        {newsError ? (
          <p className="text-red-500">Failed to load news. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsLoading ? (
              <p>Loading news...</p>
            ) : (
              newsData.slice(0, 6).map((article, idx) => (
                <NewsCard key={idx} article={article} />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
