import SupportForm from "@/components/user/avatar/SupportForm";
import Wrapper from "@/components/user/global/Wrapper";
import React from "react";

const SupportPage = () => {
  return (
    <Wrapper className={"w-full relative h-auto mt-3"}>
      <div>
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-gray-600 text-sm">
          If you have any questions or concerns, please don't hesitate to get in
          touch with our support team. We are here to help!
        </p>
      </div>
      <SupportForm />
    </Wrapper>
  );
};

export default SupportPage;
