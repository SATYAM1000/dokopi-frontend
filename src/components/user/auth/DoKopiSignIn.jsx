"use client";
import React, { useState, startTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Wrapper from "../global/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClipLoader from "react-spinners/ClipLoader";
import { MoveRight } from "lucide-react";

const DoKopiSignIn = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const signInWithGoogle = () => {
    startTransition(() => {
      setShowLoader(true);
      signIn("google", {
        callbackUrl: "/stores",
      }).finally(() => {
        setShowLoader(false);
      });
    });
  };

  return (
    <section className="w-full h-auto">
      <Wrapper className={" w-full mt-40 flex items-center justify-center"}>
        <Card className="w-[350px] shadow-md border-2 rounded-3xl border-r-8 border-black border-b-8">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription className="text-[16px] text-black ">
              to continue to <span className="font-bold">DoKopi</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  className={`${
                    !showLoader ? "cursor-pointer" : "cursor-not-allowed"
                  } rounded-lg border-r-4 border-black border-b-4 `}
                  onClick={signInWithGoogle}
                >
                  <div
                    className="flex items-center justify-between gap-2 overflow-hidden"
                    onMouseEnter={() => setShowRightArrow(true)}
                    onMouseLeave={() => setShowRightArrow(false)}
                  >
                    <div className="flex items-center gap-4">
                      {!showLoader ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#fbc02d"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                          <path
                            fill="#e53935"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          ></path>
                          <path
                            fill="#4caf50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          ></path>
                          <path
                            fill="#1565c0"
                            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                        </svg>
                      ) : (
                        <ClipLoader color="#000" size={20} />
                      )}
                      <p>Continue with Google</p>
                    </div>
                    {showRightArrow && (
                      <MoveRight
                        size={20}
                        className={
                          "animate-fade-in-right animate-duration-faster text-gray-700"
                        }
                      />
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-[11px] text-gray-500">
              No account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-primary font-medium underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </Wrapper>
    </section>
  );
};

export default DoKopiSignIn;
