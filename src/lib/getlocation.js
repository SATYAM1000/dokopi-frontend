export const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  resolve({
                      latitude,
                      longitude,
                  });
              },
              (error) => {
                  console.error("Error getting location:", error);
                  reject(error);
              },
              {
                  enableHighAccuracy: true,  // Enable high accuracy mode
                  timeout: 10000,            // Timeout after 10 seconds
                  maximumAge: 0              
              }
          );
      } else {
          console.error("Geolocation is not supported by this browser.");
          reject(new Error("Geolocation is not supported by this browser."));
      }
  });
};
