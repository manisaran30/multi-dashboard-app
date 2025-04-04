import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function CryptoDetails({ data }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=usd&days=7`
        );
        const result = await res.json();

        const formatted = result.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          price: price.toFixed(2),
        }));

        setHistory(formatted);
      } catch (err) {
        console.error('Failed to fetch price history:', err);
      }
    };

    fetchHistory();
  }, [data.id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-4">
        {data.name} ({data.symbol.toUpperCase()})
      </h1>

      <div className="mb-4">
        <img src={data.image.large} alt={data.name} className="w-20 h-20" />
      </div>

      <p className="text-lg">
        <strong>Current Price:</strong> ${data.market_data.current_price.usd.toLocaleString()}
      </p>
      <p className="text-lg">
        <strong>Market Cap:</strong> ${data.market_data.market_cap.usd.toLocaleString()}
      </p>
      <p className="text-lg">
        <strong>Rank:</strong> #{data.market_cap_rank}
      </p>

      {/* Chart Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">7-Day Price History</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={history}>
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: data.description.en
              ? data.description.en.split('. ')[0] + '.'
              : 'No description available.',
          }}
        />
      </div>
    </div>
  );
}
