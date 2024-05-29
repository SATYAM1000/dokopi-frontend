import { getCurrentServerURL } from "@/hooks/get-server-url";
export let API_DOMAIN;

getCurrentServerURL()
  .then((url) => {
    API_DOMAIN = url;
  })
  .catch((error) => {
    console.error("Error getting the server URL:", error);
  });
