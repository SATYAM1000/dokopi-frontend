"use client";
import Image from "next/image";
import React from "react";
import { Check, Trash } from "lucide-react";
import { toast } from "sonner";

const UploadedFile = ({
  fileInfo,
  setIsFileUploadedSuccessfully,
  setFileInfo,
}) => {
  const onFileRemove = () => {
    setIsFileUploadedSuccessfully(false);
    setFileInfo((prev) => ({
      ...prev,
      id: null,
      fileURL: null,
      filePageCount: null,
      fileOriginalName: null,
      fileExtension: null,
      fileSize: null,
      fileIconPath: "/file-icons/pdf.svg",
      fileCopiesCount: 1,
      filePaperType: "A4",
      fileColorType: "black and white",
      filePrintMode: "simplex",
      fileColorPagesToPrint: [""],
      messageForXeroxStore: null,
      additionalServices: null,
      fileColorPagesToPrint: null,
    }));
    toast.success("File removed successfully");
  };

  return (
    <section
      className="border border-primary/[0.3] shadow-sm rounded-md px-4 py-2 w-full flex items-center justify-between gap-4 overflow-hidden
     hover:border-black/[0.4] hover:bg-gray-100 "
    >
      <div className="flex items-center gap-4">
        <div className="h-[60px] w-[40px] overflow-hidden shrink-0 flex items-center justify-center">
          <Image
            src={"/file-icons/pdf.svg"}
            width={50}
            height={100}
            alt="icon"
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-[13px] md:text-[15px] font-medium text-gray-700">
            {fileInfo?.fileOriginalName}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[11px] md:text-[13px] text-gray-500">
              {fileInfo?.fileSize}
            </p>
            <p className="text-[11px] md:text-[13px] text-gray-500 ">
              {fileInfo?.filePageCount} pages
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="p-2 flex items-center justify-center rounded-md 
          cursor-pointer
          border  border-green-500/[0.5]
          bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500"
        >
          {" "}
          <Check className="text-green-500 " size={20} />
        </div>

        <div
          onClick={onFileRemove}
          className="p-2 flex items-center justify-center rounded-md 
          cursor-pointer
          border border-red-500/[0.5]
          bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500"
        >
          {" "}
          <Trash className="text-red-500 " size={20} />
        </div>
      </div>
    </section>
  );
};

export default UploadedFile;
