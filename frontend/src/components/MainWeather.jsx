import CurrentWeather from "./weather/CurrentWeather";
import ForecastWeather from "./weather/ForecastWeather";
import PropTypes from "prop-types";

function MainWeather(props) {
  const { currentWeather, forecastWeather } = props.weatherData;

  if (!currentWeather || !forecastWeather) {
    return (
      <div>
        <h3>Loading</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="forecast-section">
        <h1>Forecast</h1>
        <div className="forecast">
          <CurrentWeather current={currentWeather} />
          <ForecastWeather forecast={forecastWeather} />
        </div>
      </div>
    </div>
  );
}

MainWeather.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default MainWeather;
