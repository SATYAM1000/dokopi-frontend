import DoKopiSignIn from "@/components/user/auth/DoKopiSignIn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect("/stores");
  }

  return <DoKopiSignIn  />;
}
