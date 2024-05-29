import { cookies } from "next/headers";

export const useAccessToken = async () => {
  const cookess = cookies().get("__Secure-authjs.session-token")?.value;
  // const cookess = cookies().get("authjs.session-token")?.value;

  if (!cookess) {
    return null;
  }

  return cookess;
};
