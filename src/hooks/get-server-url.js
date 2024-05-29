export const getCurrentServerURL = async () => {
  if (process.env.ENVIRONMENT === "development") {
    return "http://localhost:4000";
  } else {
    return "https://api.dokopi.com";
  }
};
