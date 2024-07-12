"use client";
import React from "react";
import Image from "next/image";

const UploadedFileProgress = () => {
  return (
    <section className="w-full h-auto flex items-center justify-center flex-col gap-8">
      <Image
        src={"/test/file-upload-animation.gif"}
        width={100}
        height={100}
        alt="file uploader"
        className="h-[70px] w-[70px] object-cover object-center  rounded-full border-blue-400 border"
      />
      <p className="mb-3 font-medium text-gray-700 text-[13px] flex flex-wrap justify-center">
        Processing your upload, wait a moment...
      </p>
    </section>
  );
};

export default UploadedFileProgress;
