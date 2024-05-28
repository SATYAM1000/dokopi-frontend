"use client";
import Image from "next/image";
import React from "react";
import { X } from "lucide-react";
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
      className="border relative cursor-pointer  border-blue-500/[0.4] rounded-md px-4 py-2 w-full flex items-center justify-between gap-4 overflow-hidden
     hover:border-blue-500/[0.5] hover:bg-blue-100 bg-blue-50 "
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
            <p className="text-xs text-gray-700 font-medium">
              {fileInfo?.fileSize ? fileInfo?.fileSize : "No size available"}
            </p>
            <p className="text-xs text-gray-700 font-medium ">
              {fileInfo?.filePageCount ? fileInfo?.filePageCount : 0} pages
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Badge
          className={
            "mt-1 hidden md:flex max-w-fit text-[10px] bg-blue-500 hover:bg-blue-500"
          }
        >
          Uploaded
        </Badge>

        <X className="text-gray-700 cursor-pointer " onClick={onFileRemove} size={20} />
      </div>
    </section>
  );
};

export default UploadedFile;
