// components/WeatherChart.js
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const WeatherChart = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">Temperature Trend (Past 5 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#3182ce" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
