"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { API_DOMAIN } from "@/lib/constants";

const SupportForm = () => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required.";
    tempErrors.email = formData.email ? "" : "Email is required.";
    tempErrors.phone = formData.phone ? "" : "Phone number is required.";
    tempErrors.message = formData.message ? "" : "Message is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/user/support`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      toast.success(res.data?.msg || "Support request sent successfully");
      setFormData({
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending support request:", error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full mt-8 bg-gray-100 p-4 rounded-md" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
            Name
            </label>
            <input
              name="name"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="text"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              name="phone"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="text"
              autoComplete="off"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full grid grid-cols-1">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <Textarea
              name="message"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-xs italic">{errors.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <Button variant="default" type="submit">
          {loading ? <ClipLoader color="white" size={16} /> : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default SupportForm;
