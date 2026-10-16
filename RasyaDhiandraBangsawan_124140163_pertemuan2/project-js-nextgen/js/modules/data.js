// Sumber data: localStorage key + API publik (Open-Meteo, DummyJSON, JSONPlaceholder)
export const STORAGE_KEY = 'dashboard-tugas-v1';

const API = {
  weather: 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true',
  quote: 'https://dummyjson.com/quotes/random',
  todos: 'https://jsonplaceholder.typicode.com/todos?_limit=5',
};

const getJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const fetchWeather = async () => {
  const { current_weather: { temperature, windspeed, weathercode } } = await getJSON(API.weather);
  return { temperature, windspeed, weathercode };
};

export const fetchQuote = async () => {
  const { quote, author } = await getJSON(API.quote);
  return { quote, author };
};

export const fetchSeedTasks = async () => {
  const todos = await getJSON(API.todos);
  return todos.map(({ title, completed }) => ({ title, done: completed, course: 'Contoh dari API' }));
};

export const weatherLabel = (code) => {
  if (code === 0) return 'Cerah';
  if (code <= 3) return 'Berawan';
  if (code <= 48) return 'Berkabut';
  if (code <= 57) return 'Gerimis';
  if (code <= 67 || (code >= 80 && code <= 82)) return 'Hujan';
  return 'Badai petir';
};
