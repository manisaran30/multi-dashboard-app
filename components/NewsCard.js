import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/newsSlice';

const NewsSection = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">📰 Crypto News</h2>

      {loading && <p className="text-gray-500">Loading latest crypto news...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="space-y-4">
        {data.map((item, index) => (
          <li key={index} className="border-b pb-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(item.pubDate).toLocaleString()}
            </p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;
