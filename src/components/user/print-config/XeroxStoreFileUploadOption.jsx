"use client";
import React, { useState } from "react";
import FileUploaderComponent from "./FileUploaderComponent";
import UploadedFileComponent from "./UploadedFileComponent";
import UploadedFileConfigurations from "./UploadedFileConfigurations";
import UploadedFileProgress from "./UploadedFileProgress";
import { initialFileInfo } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

const XeroxStoreFileUploadOption = () => {
  const [isFileUploadedSuccessfully, setIsFileUploadedSuccessfully] =
    useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(initialFileInfo);

  const resetUploadedFileInfo = () => {
    setUploadedFileInfo(initialFileInfo);
  };

  return (
    <section className="w-full mt-6 md:mt-6 ">
      <section className="w-full">
        <div className="h-auto">
          <main className="h-full">
            <article
              aria-label="File Upload Modal"
              className="relative flex flex-col h-full bg-white rounded-md"
            >
              <section className="flex flex-col w-full h-full p-0 overflow-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div
                    className={`w-full flex flex-col h-fit rounded-lg border bg-gray-50 border-gray-200 p-4 relative overflow-hidden pb-14`}
                  >
                    <div className="flex flex-col w-full">
                      <h1 className="font-semibold text-gray-700">
                        {isFileUploadedSuccessfully
                          ? "Uploaded File"
                          : "Upload File"}
                      </h1>
                    </div>
                    <div className="mt-4 rounded-md">
                      {isFileUploadedSuccessfully ? (
                        <UploadedFileComponent
                          file={uploadedFileInfo}
                          setUploadedFileInfo={setUploadedFileInfo}
                          setIsFileUploadedSuccessfully={
                            setIsFileUploadedSuccessfully
                          }
                          resetUploadedFileInfo={resetUploadedFileInfo}
                        />
                      ) : isFileUploading ? (
                        <UploadedFileProgress />
                      ) : (
                        <header
                          className={`overflow-hidden rounded-md w-full max-h-fit`}
                        >
                          <FileUploaderComponent
                            setUploadedFileInfo={setUploadedFileInfo}
                            setIsFileUploadedSuccessfully={
                              setIsFileUploadedSuccessfully
                            }
                            setIsFileUploading={setIsFileUploading}
                          />
                        </header>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 flex items-center w-full h-6 gap-2 p-1 text-gray-700 bg-gray-300">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span className="text-[12px] font-medium">We will delete your files once printed</span>
                    </div>
                  </div>
                  <UploadedFileConfigurations
                    uploadedFileInfo={uploadedFileInfo}
                    setUploadedFileInfo={setUploadedFileInfo}
                    resetUploadedFileInfo={resetUploadedFileInfo}
                    setIsFileUploadedSuccessfully={
                      setIsFileUploadedSuccessfully
                    }
                  />
                </div>
              </section>
            </article>
          </main>
        </div>
      </section>
    </section>
  );
};

export default XeroxStoreFileUploadOption;
