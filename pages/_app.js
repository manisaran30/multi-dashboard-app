import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Toaster } from 'react-hot-toast';
import useWebSocket from '../hooks/useWebsocket';

function WebSocketWrapper({ children }) {
  useWebSocket();
  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WebSocketWrapper>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </WebSocketWrapper>
    </Provider>
  );
}
