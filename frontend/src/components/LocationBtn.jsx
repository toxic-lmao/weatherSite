import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import fetchWeatherFromServer, {
  fetchStaticWeather,
} from "../managers/ApiManager";

function LocationBtn(props) {
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    const fetchWeatherFromCookie = async () => {
      const storedLocation = Cookies.get("weather-location");

      if (storedLocation) {
        props.setLoading(true);

        const { lat, lon } = JSON.parse(storedLocation);
        try {
          const weatherData = await fetchWeatherFromServer(lat, lon);

          props.setWeatherData(weatherData);
          setLocationAllowed(false);
          props.setLoading(false);
        } catch (error) {
          console.error("Error fetching weather from cookie:", error);
        }
      } else {
        staticWeather();
      }
    };

    const staticWeather = async () => {
      try {
        const staticWeather = await fetchStaticWeather();

        if (staticWeather) {
          props.setWeatherData(staticWeather);
          setLocationAllowed(true);
          props.setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching static weather:", error);
      }
    };

    if (props.loading) {
      fetchWeatherFromCookie();
    }
  }, [props]);

  const getLocation = () => {
    props.setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const weatherData = await fetchWeatherFromServer(
              latitude,
              longitude
            );

            if (weatherData) {
              props.setWeatherData(weatherData);
              setLocationAllowed(false);
              props.setLoading(false);
            } else {
              console.log("Error fetching weather!");
            }
          } catch (error) {
            console.error(error);
            props.setLoading(false);
          }
        },
        (err) => {
          console.error("Error retrieving location:", err.message);
        }
      );
    } else {
      props.setLoading(false);
      console.error("Geolocation is not supported by this browser.");
    }
  };

  LocationBtn.propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setLocationAllowed: PropTypes.func.isRequired,
    setWeatherData: PropTypes.func.isRequired,
  };

  return (
    <>
      {locationAllowed && (
        <div id="getLocation">
          <h3 onClick={getLocation}>Allow Location</h3>
        </div>
      )}
    </>
  );
}

export default LocationBtn;
