"use client";
import React, { useState, useRef } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/providers/redux/slices/cart-slice";
import { toast } from "sonner";
import UploadedFile from "./UploadedFile";
import PrintConfig from "./PrintConfig";
import FileUploader from "./FileUploader";
import FileUploadProgress from "./FileUploadProgress";
import { encryptSensitiveData } from "@/lib/encrypt-decrypt";
import { extractColorPages } from "@/lib/colorPagesExtractor";

const DoKopiFileUpload = ({ token, encryptionKey }) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const fileUploadRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [shake, setShake] = useState(false);
  const [pageNumberInput, setPageNumberInput] = React.useState(``);
  const [showFileUploadProgress, setShowFileUploadProgress] = useState(false);
  const [isFileUploadedSuccessfully, setIsFileUploadedSuccessfully] =
    useState(false);
  const [error, setError] = useState(null);

  const [fileInfo, setFileInfo] = useState({
    id: null,
    fileURL: null,
    fileOriginalName: null,
    fileSize: null,
    fileExtension: null,
    filePageCount: null,
    fileIconPath: null,
    fileCopiesCount: 1,
    messageForXeroxStore: null,
    additionalServices: null,
    filePaperType: "A4",
    fileColorType: "black and white",
    filePrintMode: "simplex",
    fileColorPagesToPrint: [],
    
  });

  const onFinalSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Login required", { description: "Please login to proceed" });
      return;
    }
    if (
      !fileInfo.fileURL ||
      !fileInfo.filePageCount ||
      !fileInfo.fileOriginalName ||
      !fileInfo.fileExtension ||
      !fileInfo.fileCopiesCount ||
      !fileInfo.filePaperType ||
      !fileInfo.fileColorType ||
      !fileInfo.filePrintMode
    ) {
      toast.error("Please fill all the required fields!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const encryptedFileURL = encryptSensitiveData(
      fileInfo.fileURL,
      encryptionKey
    );
    setFileInfo((prev) => ({ ...prev, fileURL: encryptedFileURL }));
    dispatch(addToCart({ ...fileInfo, fileURL: encryptedFileURL }));
    setFileInfo({
      id: null,
      fileURL: null,
      fileOriginalName: null,
      fileSize: null,
      fileExtension: null,
      filePageCount: null,
      fileIconPath: null,
      fileCopiesCount: 1,
      messageForXeroxStore: "",
      additionalServices: null,
      filePaperType: "A4",
      fileColorType: "black and white",
      filePrintMode: "simplex",
      fileColorPagesToPrint: [],
    });
    setPageNumberInput(``);
    toast.success("File added successfully");
    setIsFileUploadedSuccessfully(false);
  };

  const handleColorPagesToPrintChange = (e) => {
    setError(null);
    if (e.target.value.length < 0 || !fileInfo.filePageCount) {
      setError("Please upload the file first");
      return;
    }
    const res = extractColorPages(e.target.value, fileInfo.filePageCount);
    setPageNumberInput(e.target.value);
    if (!res.success) {
      setError(res.msg);
      return;
    }
    setFileInfo((prev) => ({ ...prev, fileColorPagesToPrint: res.data }));
  };

  return (
    <section className="w-full">
      <section className="w-full">
        <div className="h-auto">
          <main className="h-full">
            <article
              aria-label="File Upload Modal"
              className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
            >
              <section className="h-full overflow-auto p-0 py-4 md:p-4 w-full flex flex-col">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div
                    className={`w-full flex flex-col h-auto rounded-lg border border-gray-400 p-4`}
                  >
                    <div className="w-full flex flex-col">
                      <h1 className="font-semibold text-gray-700">
                        {isFileUploadedSuccessfully
                          ? "Uploaded File"
                          : "Upload File"}
                      </h1>
                    </div>
                    <div className="rounded-lg bg-white mt-4 p-2">
                      {isFileUploadedSuccessfully ? (
                        <header
                          className={`overflow-hidden rounded-md w-full max-h-fit`}
                        >
                          <UploadedFile
                            fileInfo={fileInfo}
                            setFileInfo={setFileInfo}
                            setIsFileUploadedSuccessfully={
                              setIsFileUploadedSuccessfully
                            }
                            setPageNumberInput={setPageNumberInput}
                          />
                        </header>
                      ) : (
                        <>
                          {showFileUploadProgress ? (
                            <FileUploadProgress />
                          ) : (
                            <FileUploader
                              token={token}
                              currentUser={currentUser}
                              setFileInfo={setFileInfo}
                              setFiles={setFiles}
                              setShowFileUploadProgress={
                                setShowFileUploadProgress
                              }
                              setIsFileUploadedSuccessfully={
                                setIsFileUploadedSuccessfully
                              }
                              fileUploadRef={fileUploadRef}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <PrintConfig
                    fileInfo={fileInfo}
                    setFileInfo={setFileInfo}
                    shake={shake}
                    onFinalSubmit={onFinalSubmit}
                    handleColorPagesToPrintChange={
                      handleColorPagesToPrintChange
                    }
                    error={error}
                    pageNumberInput={pageNumberInput}

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

export default DoKopiFileUpload;
