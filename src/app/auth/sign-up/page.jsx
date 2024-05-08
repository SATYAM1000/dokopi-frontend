import React from "react";
import { auth } from "@/auth";
import DoKopiSignUp from "@/components/user/auth/DoKopiSignUp";
import { redirect } from "next/navigation";

export default async function SignUpPage () {
  const session=await auth();
  if(session){
    redirect("/");
  }
  return <DoKopiSignUp />;
};
