export const connectToWebSocket = (onMessage) => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      onMessage(data);
    };
    return ws;
  };