import { useEffect, useState } from "react";
import GetLocation from "./managers/GetLocation";
import GetWeather from "./managers/GetWeather";
import MainWeather from "./components/MainWeather";

function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lat, lon } = await GetLocation();
        const weather = await GetWeather(lat, lon);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading weather...</p>
      ) : weatherData ? (
        <MainWeather weatherData={weatherData} />
      ) : (
        <p>Unable to fetch weather data.</p>
      )}
    </>
  );
}

export default App;
