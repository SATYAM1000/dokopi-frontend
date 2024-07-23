"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Wrapper from "../global/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClipLoader from "react-spinners/ClipLoader";
import { MoveRight } from "lucide-react";
import axios from "axios";
import { fetchAccessToken } from "@/actions/access-token";
import { toast } from "sonner";
import { API_DOMAIN } from "@/lib/constants";

const DoKopiUserPhone = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const validatePhoneNumber = (number) => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      setError("");

      if (validatePhoneNumber(phoneNumber)) {
        const res = await axios.post(
          `${API_DOMAIN}/api/v1/user/phone`,
          { phoneNumber },
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );
        toast.success(res.data.msg);
        window.location.href = "/stores";
      } else {
        setShowLoader(false);
        setError("Please enter a valid Indian phone number");
      }
    } catch (error) {
      console.log("phone number error ", error);
      toast.error(
         error?.response?.data?.msg || error?.message || "Something went wrong"
      );

    } finally {
      setShowLoader(false);
    }
  };

  return (
    <section className="w-full h-auto">
      <Wrapper className={"w-full mt-40 flex items-center justify-center"}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[350px] shadow-md border-2 rounded-3xl border-r-8 border-black border-b-8">
            <CardHeader>
              <CardTitle>DoKopi</CardTitle>
              <CardDescription className="text-[16px] text-black">
                Please enter your phone number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-2">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <div className="w-full flex gap-2">
                    <input
                      name="phoneNumber"
                      className={`appearance-none block w-full text-gray-700 border ${
                        error ? "border-red-500" : "border-black/[0.4]"
                      } rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3`}
                      type="text"
                      autoComplete="off"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button type="submit">
                      {showLoader ? (
                        <ClipLoader color="white" size={16} />
                      ) : (
                        <MoveRight className={`w-4 h-4`} />
                      )}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs italic">{error}</p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default DoKopiUserPhone;
