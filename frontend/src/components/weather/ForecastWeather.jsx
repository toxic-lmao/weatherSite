import PropTypes from "prop-types";

function ForecastDay(weather) {
  const baseUrl = "https://openweathermap.org/img/wn/imgname@2x.png";
  const imgUrl = baseUrl.replace("imgname", weather.icon);

  return (
    <div id="days">
      <h3>{weather.date}</h3>
      <img src={imgUrl} alt="Weather Status Icon" draggable="false" />
      <h2>{weather.temp}°</h2>
      <h4>{weather.description}</h4>
    </div>
  );
}

function ForecastWeather(props) {
  const forecastList = props.forecast.list.slice(0, 6);

  return (
    <>
      {forecastList.map((entry, index) => (
        <ForecastDay
          key={index}
          icon={entry.weather[0].icon}
          date={entry.dt}
          temp={entry.main.temp}
          description={entry.weather[0].description}
        />
      ))}
    </>
  );
}

ForecastWeather.propTypes = {
  forecast: PropTypes.object.isRequired,
};

export default ForecastWeather;
