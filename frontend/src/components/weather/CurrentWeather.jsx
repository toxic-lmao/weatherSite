import PropTypes from "prop-types";

function CurrentWeather(props) {
  if (!props.current || !props.current.weather) {
    return <div>No current weather data available</div>;
  }

  const baseUrl = "https://openweathermap.org/img/wn/imgname@2x.png";
  const imgUrl = baseUrl.replace("imgname", props.current.weather[0].icon);
  return (
    <div id="current">
      <div id="current-day-time">
        <h3>{props.current.dt}</h3>
      </div>
      <div className="current-weather">
        <div className="curr-temp-icon">
          {props.current.main.temp}°
          <img src={imgUrl} alt="Cloudy Sun Icon" draggable="false" />
        </div>
        <div className="apparent-weather">
          <h3>{props.current.name}</h3>
          <h4>Feels like: {props.current.main.feels_like}°</h4>
          <h4>{props.current.weather[0].description}</h4>
        </div>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  current: PropTypes.object.isRequired,
};

export default CurrentWeather;
