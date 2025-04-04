import axios from 'axios';

export const getWeatherByCity = (city) => {
  const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
};

export const getCryptoById = (id) => {
  return axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
};

export const getNewsByTopic = (topic) => {
  const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  return axios.get(`https://newsdata.io/api/1/news?apikey=${key}&q=${topic}&language=en`);
};
