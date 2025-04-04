import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addAlert } from '../redux/alertSlice';

const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      Object.entries(data).forEach(([coin, price]) => {
        const message = `${coin.toUpperCase()} is now $${parseFloat(price).toFixed(2)}`;

        toast.success(`📈 ${message}`);
        dispatch(addAlert({ type: 'price_alert', message }));
      });
    };

    ws.onerror = () => {
      toast.error('WebSocket Error!');
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  // Simulated weather alerts (every 30 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      const cities = ['New York', 'London', 'Tokyo'];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const message = `🌧️ Weather Alert: Heavy rain in ${city}`;

      toast(`⚠️ ${message}`);
      dispatch(addAlert({ type: 'weather_alert', message }));
    }, 30000); // every 30s

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useWebSocket;
