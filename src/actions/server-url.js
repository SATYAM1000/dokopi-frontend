"use server";

export const fetchServerURL = async () => {
  const cookess =
    process.env.ENVIRONMENT === "development"
      ? process.env.DEV_SERVER_URL
      : process.env.PROD_SERVER_URL;
  if (!cookess) {
    return null;
  }

  return cookess;
};
