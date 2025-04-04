import React, { useEffect, useState } from 'react';
import { connectToWebSocket } from '../utils/websocket';

export default function Toast() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ws = connectToWebSocket((data) => {
      const entries = Object.entries(data);
      if (entries.length > 0) {
        const [name, price] = entries[0];
        setMessage(`${name.toUpperCase()}: $${parseFloat(price).toFixed(2)}`);
        setTimeout(() => setMessage(null), 4000);
      }
    });
    return () => ws.close();
  }, []);

  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md animate-bounce">
      {message}
    </div>
  );
}