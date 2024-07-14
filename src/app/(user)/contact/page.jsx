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
     
      <Footer />
    </>
  );
}
