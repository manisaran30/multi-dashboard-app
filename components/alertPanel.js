import { useSelector, useDispatch } from 'react-redux';
import { clearAlerts } from '../redux/alertSlice';

const AlertPanel = () => {
  const { items } = useSelector(state => state.alerts);
  const dispatch = useDispatch();

  return (
    <div className="p-4 border rounded-lg shadow bg-white max-w-lg mx-auto my-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">📢 Alerts</h2>
        <button onClick={() => dispatch(clearAlerts())} className="text-sm text-red-500">Clear</button>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-500">No alerts yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(alert => (
            <li key={alert.id} className="text-sm border-b pb-1">
              <span className="font-medium">{alert.type === 'price_alert' ? '💰' : '🌦️'}</span>{' '}
              {alert.message}
              <span className="text-gray-400 text-xs block">{new Date(alert.timestamp).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertPanel;
