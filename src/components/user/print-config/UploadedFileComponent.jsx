"use client";
import React from "react";
import Image from "next/image";
import { toast } from "sonner";

const UploadedFileComponent = ({
  file,
  setIsFileUploadedSuccessfully,
  resetUploadedFileInfo,
}) => {
  function convertBytes(sizeInBytes) {
    const KB = sizeInBytes / 1024;
    const MB = sizeInBytes / (1024 * 1024);
    if (MB > 1) {
      return `${MB.toFixed(2)} MB`;
    } else if (KB > 1) {
      return `${KB.toFixed(2)} KB`;
    }
    return `${sizeInBytes} B`;
  }

  const removeUploadedFile = () => {
    try {
      resetUploadedFileInfo();
      setIsFileUploadedSuccessfully(false);
      toast.success("File removed successfully");
    } catch (error) {
      console.error("Error removing the file:", error);
      toast.error("Failed to remove the file");
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="p-4 md:p-5 space-y-7">
          <div>
            <div className="mb-2 flex justify-between items-center">
              <div className="flex items-center gap-x-3">
                <span
                  className={`size-8 flex justify-center items-center text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500 `}
                >
                  {file.iconPath ? (
                    <Image
                      src={file.iconPath}
                      width={28}
                      height={28}
                      alt="icon"
                    />
                  ) : (
                    <svg
                      className="flex-shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {file.fileName.length > 17
                      ? file.fileName.slice(0, 17) + "..." + file.fileExtension
                      : file.fileName + "." + file.fileExtension}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-neutral-500">
                    <span>{convertBytes(file.fileSize)} </span>
                    <span span className="ml-2">
                      {" "}
                      {file.pageCount} pages
                    </span>
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-x-2 ">
                {true && (
                  <div className="text-gray-500 p-1.5 border rounded-md bg-green-100 border-green-500 cursor-pointer hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200">
                    <svg
                      className="flex-shrink-0 size-4 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                    </svg>
                  </div>
                )}
                <div
                  onClick={removeUploadedFile}
                  className="text-gray-500 ml-2 p-1.5 border rounded-md border-gray-200 cursor-pointer hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadedFileComponent;
