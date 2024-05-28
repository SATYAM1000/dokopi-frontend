"use client";

import Image from "next/image";

const FileUploadProgress = () => {
  return (
    <section className="w-full h-auto flex items-center justify-center flex-col gap-8">
      <Image
        src={"/test/file-upload-animation.gif"}
        width={100}
        height={100}
        alt="file uploader"
        className="h-[150px] w-[150px] rounded-full border-blue-400 border"
      />
      <p className="mb-3 font-medium text-gray-700 flex flex-wrap justify-center">
        Processing your upload, just a moment...
      </p>
    </section>
  );
};

export default FileUploadProgress;
