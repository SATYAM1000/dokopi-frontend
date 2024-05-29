import { cookies } from "next/headers";

export const useAccessToken = async () => {
  const cookess =
    process.env.ENVIRONMENT === "development"
      ? cookies().get("authjs.session-token")?.value
      : cookies().get("__Secure-authjs.session-token")?.value;

  if (!cookess) {
    return null;
  }

  return cookess;
};
