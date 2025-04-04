// pages/weather/[city].js
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import WeatherChart from '../../components/WeatherChart';

const WeatherDetail = () => {
  const router = useRouter();
  const { city } = router.query;
  const weather = useSelector(state =>
    state.weather.data.find(item => item.name.toLowerCase() === city?.toLowerCase())
  );

  if (!weather) return <p>Loading...</p>;

  // Mock history data for chart (replace with actual history API if needed)
  const history = Array.from({ length: 5 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    temp: (weather.main.temp - i).toFixed(1), // Just dummy data
  })).reverse();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{weather.name} Weather</h1>

      <div className="mb-4">
        <p>🌡️ Temperature: <strong>{weather.main.temp}°C</strong></p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
        <p>🌤️ Description: {weather.weather[0].description}</p>
      </div>

      {/* Temperature History Chart */}
      <WeatherChart history={history} />
    </div>
  );
};

export default WeatherDetail;
