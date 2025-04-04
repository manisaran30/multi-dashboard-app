// components/CryptoPriceChart.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CryptoPriceChart = ({ coinId }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!coinId) return;

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: 7,
        },
      })
      .then((res) => {
        const formatted = res.data.prices.map((entry) => ({
          date: new Date(entry[0]).toLocaleDateString(),
          price: entry[1],
        }));
        setChartData(formatted);
      });
  }, [coinId]);

  if (!chartData || chartData.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">7-Day Price Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="$" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#4caf50" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoPriceChart;
