"use server";

import { connectToDB } from "@/lib/db.connect";
import axios from "axios";

export const fetchAllStoresId = async () => {
  try {
    await connectToDB();
    const serverURL =
      process.env.ENVIRONMENT === "development"
        ? "http://localhost:4000"
        : "https://api.dokopi.com";
    const { data } = await axios.get(`${serverURL}/api/v1/user/stores/all`);
    return data.data;
  } catch (error) {
    return null;
  }

  return cookess;
};
