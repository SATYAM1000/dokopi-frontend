// export const getUserCoordinates = () => {
//   return new Promise((resolve, reject) => {
//       if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//               (position) => {
//                   const { latitude, longitude } = position.coords;
//                   resolve({
//                       latitude,
//                       longitude,
//                   });
//               },
//               (error) => {
//                   console.error("Error getting location:", error);
//                   reject(error);
//               },
//               {
//                   enableHighAccuracy: true,  // Enable high accuracy mode
//                   timeout: 15000,            // Timeout after 15 seconds
//                   maximumAge: 0              
//               }
//           );
//       } else {
//           console.error("Geolocation is not supported by this browser.");
//           reject(new Error("Geolocation is not supported by this browser."));
//       }
//   });
// };


export const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                reject(new Error("User denied the request for Geolocation. Please enter your location manually."));
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                reject(new Error("Location information is unavailable. Please enter your location manually."));
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                reject(new Error("The request to get user location timed out. Please enter your location manually."));
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                reject(new Error("An unknown error occurred. Please enter your location manually."));
                break;
              default:
                console.error("An unexpected error occurred.");
                reject(new Error("An unexpected error occurred. Please enter your location manually."));
                break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,  // Increased timeout to give more time for a fix
            maximumAge: 0
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };
  
