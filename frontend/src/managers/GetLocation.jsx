function GetLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          resolve({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.error("Error retrieving location:", err.message);

          resolve({ lat: 44.34, lon: 10.99 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");

      resolve({ lat: 44.34, lon: 10.99 });
    }
  });
}

export default GetLocation;
