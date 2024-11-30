import { useState } from "react";
import LocationBtn from "./components/LocationBtn";
import MainWeather from "./components/MainWeather";

function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    currentWeather: null,
    forecastWeather: null,
  });

  return (
    <div>
      <LocationBtn
        loading={loading}
        setLoading={setLoading}
        setWeatherData={setWeatherData}
      />
      {loading ? (
        <p>Loading weather...</p>
      ) : (
        <MainWeather weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;
