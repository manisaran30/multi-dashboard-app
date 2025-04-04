import Link from "next/link";
export default function WeatherCard({ weather }) {
  return (
    <Link href={`/weather/${weather.city}`}>
      <div className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-md">
        <h2 className="text-lg font-bold">{weather.city}</h2>
        <p>Temperature: {weather.temp} °C</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Condition: {weather.condition}</p>
      </div>
    </Link>
  );
}
