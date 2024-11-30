import axios from "axios";

async function fetchWeatherFromServer(latitude, longitude) {
  try {
    const response = await axios.post(
      "http://localhost:3000/toxicapi/weather",
      {
        latitude: latitude,
        longitude: longitude,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending location to server:", error);
  }
}

async function fetchStaticWeather() {
  try {
    const response = await axios.get(
      "http://localhost:3000/toxicapi/staticweather"
    );

    return response.data;
  } catch (error) {
    console.error("Error sending location to server:", error);
  }
}

export default fetchWeatherFromServer;
export { fetchStaticWeather };
