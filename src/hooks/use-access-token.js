import { cookies } from "next/headers";

export const useAccessToken = async () => {
  const cookess = cookies().get("__Secure-authjs.session-token")?.value;
  console.log("cookess", cookess);
  if (!cookess) {
    return null;
  }

  return cookess;
};
