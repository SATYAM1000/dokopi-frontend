"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/user/global/Footer";
import Wrapper from "@/components/user/global/Wrapper";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Instagram, MapPin, Phone, Store } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ContactUsPage() {
  const currentUser = useCurrentUser();

  const [contactData, setContactData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      toast.error("All fields are required");
      return;
    } else {
      toast.success("Message submitted successfully!");
    }
  };
  return (
    <>
      <section className="mb-8">
        <div
          id="map"
          className="relative h-[200px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
        >
          <div className="w-[100%] h-[380px] bg-gray-200 bg-dot-black/[0.2]"></div>
        </div>
        <Wrapper>
          <div className="container ">
            <div className="block rounded-lg bg-white px-6 py-12   md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
              <div className="flex flex-col">
                <h2 className="mb-2 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                  Contact Us
                </h2>
                <p className="text-center text-gray-600 mb-12  md:text-lg">
                  If you have any questions, please fill out the form below.
                </p>
              </div>
              <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                  <form onSubmit={onSubmit}>
                    <div
                      className="relative mb-6 flex flex-col gap-2"
                      data-te-input-wrapper-init
                    >
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={contactData.name}
                      />
                    </div>
                    <div
                      className="relative mb-6 flex flex-col gap-2"
                      data-te-input-wrapper-init
                    >
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactData.email}
                        name="email"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div
                      className="relative mb-6 flex flex-col gap-2"
                      data-te-input-wrapper-init
                    >
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows="3"
                        name="message"
                        onChange={handleInputChange}
                        value={contactData.message}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="mb-6 w-full rounded bg-blue-600 text-white px-6 pt-2.5 pb-2 hover:bg-blue-800 font-medium uppercase leading-normal lg:mb-0"
                    >
                      Send
                    </Button>
                  </form>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <div className="flex flex-wrap">
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="flex align-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-sky-50 border border-blue-600/[0.4] p-4 text-primary">
                            <MapPin className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-6 grow text-gray-700">
                          <p className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
                            Address
                          </p>
                          <p className="text-gray-700 dark:text-neutral-200">
                            Jadav Nagar, Vadgaon, Pune
                          </p>
                          <p className="text-gray-700 dark:text-neutral-200">
                            Maharastra, 411041
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="flex align-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-sky-50 border border-blue-600/[0.4] p-4 text-primary">
                            <Phone className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-6 grow text-gray-700">
                          <p className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
                            Phone / Email
                          </p>
                          <p className="text-gray-700 dark:text-neutral-200">
                            +91 8789373766
                          </p>
                          <p className=" dark:text-neutral-200 underline underline-offset-4 text-blue-600">
                            dokopi.business@gmail.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="flex align-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-sky-50 border border-blue-600/[0.4] p-4 text-primary">
                            <Instagram className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-6 grow text-gray-700">
                          <p className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
                            Instagram
                          </p>
                          <p className="text-gray-700 dark:text-neutral-200">
                            @
                            <Link
                              className="text-blue-600 underline underline-offset-4"
                              href="https://www.instagram.com/dokopibusiness/"
                            >
                              dokopibusiness
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="flex align-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-blue-50 border border-blue-600/[0.4] p-4 text-primary">
                            <Store className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-semibold text-neutral-800">
                            Become a merchant
                          </p>
                          <p className="text-neutral-500 dark:text-neutral-200">
                            <Link
                              href={"#"}
                              className="underline underline-offset-4 text-blue-600"
                            >
                              merchant.dokopi.com
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
      <Footer />
    </>
  );
}
