import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className=" relative w-full h-screen flex items-center justify-center">
      <ClipLoader color="blue" size={40} />
    </section>
  );
};

export default Loading;
