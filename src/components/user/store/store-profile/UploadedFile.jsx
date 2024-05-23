"use client";
import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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
      className="border relative  border-blue-500/[0.3] rounded-md px-4 py-2 w-full flex items-center justify-between gap-4 overflow-hidden
     hover:border-blue-500/[0.5] bg-blue-50 "
    >
      <div className="flex items-center gap-4 relative ">
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
            {fileInfo?.fileOriginalName
              ? fileInfo?.fileOriginalName
              : "No name available"}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[11px] md:text-[13px] text-gray-500">
              {fileInfo?.fileSize ? fileInfo?.fileSize : "No size available"}
            </p>
            <p className="text-[11px] md:text-[13px] text-gray-500 ">
              {fileInfo?.filePageCount ? fileInfo?.filePageCount : 0} pages
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">

        <Badge
          className={
            "mt-1 hidden md:flex max-w-fit text-[10px] bg-blue-500 hover:bg-blue-500"
          }
        >
          Uploaded
        </Badge>

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
