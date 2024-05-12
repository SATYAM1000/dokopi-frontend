"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Trash } from "lucide-react";
import { API_DOMAIN } from "@/lib/constants";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { extractColorPages } from "@/lib/colorPagesExtractor";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DoKopiFileUpload = ({ token }) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const fileUploadRef = useRef(null);
  const { toast } = useToast();
  const [pagesInput, setPagesInput] = useState(null);
  const [error, setError] = useState(null);

  const [files, setFiles] = useState([]);
  const [showFileUploadProgress, setShowFileUploadProgress] = useState(false);
  const [isFileUploadedSuccessfully, setIsFileUploadedSuccessfully] =
    useState(false);

  const [fileInfo, setFileInfo] = useState({
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
    fileColorPagesToPrint: [""],
  });

  const handleFileInputClick = () => {
    if (fileInfo?.fileURL) {
      toast({
        title: alertToast({
          title: "File already uploaded!",
        }),
        variant: "destructive",
      });
      return;
    }
    fileUploadRef.current.value = null;
    fileUploadRef.current.click();
  };

  const onFileUpload = async (e) => {
    if (!currentUser || !token) {
      toast({
        title: alertToast({
          title: "Please login to proceed!",
        }),
        variant: "destructive",
      });
      router.replace("/auth/sign-in");
    }

    const file = e.target.files[0];
    if (!file) {
      toast({
        title: alertToast({
          title: "Please select a file!",
        }),
        variant: "destructive",
      });
      return;
    }

    const uploadedFileExtension = file.name.split(".").pop();
    const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "docx", "odt"];

    if (!allowedExtensions.includes(uploadedFileExtension)) {
      toast({
        title: alertToast({
          title: "Only PDF, JPG, JPEG, PNG, DOCX, ODT are allowed!",
        }),
        variant: "destructive",
      });
      return;
    }

    const fileOriginalName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... ${file.name.split(".")[1]}`
        : file.name;

    const formData = new FormData();
    formData.append("file", file);
    setFiles((prev) => [...prev, { name: fileOriginalName, loading: 0 }]);
    setShowFileUploadProgress(true);
    try {
      const response = await axios.post(
        `${API_DOMAIN}/api/v1/user/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFiles((prev) => [
              ...prev,
              { name: fileOriginalName, loading: percentCompleted },
            ]);
            const fileSize =
              progressEvent.total < 1024
                ? `${progressEvent.total}B`
                : progressEvent.total < 1024 * 1024
                ? `${(progressEvent.total / 1024).toFixed(2)}KB`
                : `${(progressEvent.total / (1024 * 1024)).toFixed(2)}MB`;

            setFileInfo((prev) => ({
              ...prev,
              fileSize: fileSize,
            }));
          },
        }
      );

      const { data } = response;
      console.log("data is ", data);
      setFileInfo((prev) => ({
        ...prev,
        fileURL: data?.url,
        fileOriginalName: fileOriginalName,
        fileExtension: uploadedFileExtension,
        filePageCount: data?.pageCount,
      }));
      toast({
        title: alertToast({
          title: "File uploaded successfully",
        }),
      });

      setIsFileUploadedSuccessfully(true);
      setShowFileUploadProgress(false);
      return;
    } catch (error) {
      setShowFileUploadProgress(false);
      toast({
        title: alertToast({
          title:
            error?.message ||
            error?.response?.data?.msg ||
            "Something went wrong!",
        }),
        variant: "destructive",
      });
      console.log("error is ", error);
    }
  };

  const onFinalSubmit = async (e) => {
    e.preventDefault();
    console.log("final submit called", fileInfo);
  };

  const handleColorPagesToPrintChange = (e) => {
    setError(null);
    console.log("fileinfo page count", fileInfo?.filePageCount);
    if (e.target.value.length < 0 || !fileInfo?.filePageCount) {
      return;
    }
    const res = extractColorPages(e.target.value, fileInfo?.filePageCount);
    if (!res?.success) {
      setError(res?.msg);
      return;
    }
    setPagesInput(res?.data);
    setFileInfo((prev) => ({
      ...prev,
      fileColorPagesToPrint: res?.data,
    }));
  };

  return (
    <section className="w-full pb-8">
      <section className="w-full">
        <div className=" h-auto">
          <main className="h-full">
            {/* <!-- file upload modal --> */}
            <article
              aria-label="File Upload Modal"
              className="relative h-full flex flex-col bg-white shadow-xl rounded-md "
            >
              {/* <!-- overlay --> */}

              {/* <!-- scroll area --> */}
              <section className="h-full overflow-auto p-0 py-4 md:p-4 w-full flex flex-col">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className="min-h-32 rounded-lg bg-white">
                    {isFileUploadedSuccessfully ? (
                      <header
                        className={`border-dashed border border-gray-400 py-12 flex flex-col justify-center items-center rounded-md h-full `}
                      >
                        <Image
                          src={"/main/file.jpg"}
                          alt="loader"
                          width={300}
                          height={300}
                        />
                        <p className="text-gray-600 rounded-md  my-2 font-medium ">
                          {fileInfo?.fileOriginalName}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="text-emerald-500 h-[40px] bg-emerald-100 px-4 py-2 rounded-md text-[14px]">
                            File Uploaded Successfully
                          </button>

                          <div className="px-3 py-3 h-[40px] bg-red-100 text-red-600 flex items-center justify-center rounded-md cursor-pointer">
                            <Trash size={17} />
                          </div>
                        </div>
                      </header>
                    ) : showFileUploadProgress ? (
                      <>
                        <header className="border-dashed border-2 border-gray-600 py-12 flex flex-col justify-center items-center rounded-md h-full">
                          <Image
                            src={"/main/loader.gif"}
                            alt="loader"
                            width={70}
                            height={70}
                          />
                          <p className="text-gray-600 px-4 py-2 rounded-md  mt-4 font-medium">
                            Uploading...
                          </p>
                        </header>
                      </>
                    ) : (
                      <header
                        className={`border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center rounded-md h-full cursor-pointer`}
                        onClick={handleFileInputClick}
                      >
                        <Image
                          src={"/main/upload.jpg"}
                          alt="loader"
                          width={300}
                          height={300}
                        />
                        <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                          <span>Drag and drop your</span>&nbsp;
                          <span>files anywhere or</span>
                        </p>
                        <input
                          id="hidden-input"
                          type="file"
                          name="file"
                          className="hidden"
                          ref={fileUploadRef}
                          onChange={onFileUpload}
                        />
                        <Button
                          id="button"
                          size="sm"
                          className="mt-2 rounded-sm px-3 py-1  "
                        >
                          Select a file
                        </Button>
                      </header>
                    )}
                  </div>
                  {/* ----------- printing prefrences------------ */}
                  <div className="min-h-32 rounded-lg bg-white border border-gray-400  p-4">
                    <p className="font-semibold text-gray-900 ">
                      Printing Preferences
                    </p>
                    <form
                      className="mt-4 flex flex-col gap-4 w-full "
                      onSubmit={onFinalSubmit}
                    >
                      {/* -------------- COPIES COUNT------------------- */}
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="fileCopiesCount">
                          Number of Copies
                        </Label>
                        <Input
                          id="fileCopiesCount"
                          type="number"
                          placeholder="Enter number of copies"
                          min="1"
                          defaultValue="1"
                          required={true}
                          className="w-full"
                          onChange={(e) =>
                            setFileInfo((prev) => ({
                              ...prev,
                              fileCopiesCount: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {/* --------------------fileColorType----------------------      */}
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="fileColorType">Printing Type</Label>
                        <RadioGroup
                          id="fileColorType"
                          defaultValue="black and white"
                          value={fileInfo?.fileColorType}
                          onValueChange={(value) =>
                            setFileInfo((prev) => ({
                              ...prev,
                              fileColorType: value,
                            }))
                          }
                        >
                          <div className="grid md:grid-cols-3 gap-4">
                            <div
                              type="button"
                              className="flex items-center space-x-2 bg-white border h-[40px] rounded-md pl-2 cursor-pointer"
                            >
                              <RadioGroupItem
                                value="black and white"
                                id="black_and_white"
                              />
                              <Label
                                htmlFor="black_and_white"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Black & White
                              </Label>
                            </div>

                            <div
                              type="button"
                              className="flex items-center space-x-2 h-[40px] bg-white border rounded-md pl-2 cursor-pointer"
                            >
                              <RadioGroupItem value="color" id="color" />
                              <Label
                                htmlFor="color"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Color
                              </Label>
                            </div>

                            <div
                              type="button"
                              className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 cursor-pointer"
                            >
                              <RadioGroupItem value="mixed" id="mixed" />
                              <Label
                                htmlFor="mixed"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Mixed
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {fileInfo?.fileColorType === "mixed" && (
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="fileColorPagesToPrint">
                            Color Pages Selection
                          </Label>
                          <div className="flex flex-col gap-2">
                            <Input
                              id="fileColorPagesToPrint"
                              type="text"
                              placeholder="Example: 1,2,3-10"
                              className="w-full"
                              onChange={handleColorPagesToPrintChange}
                            />
                            {error && (
                              <p className="text-red-500 text-[12px]">
                                {error}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {fileInfo?.fileColorType === "mixed" && (
                        <section className="w-full flex items-center justify-start gap-4 mt-2 overflow-x-scroll pb-2 ">
                          {[...Array(fileInfo?.filePageCount).keys()].map(
                            (pageNumber) => (
                              <button
                                key={pageNumber}
                                onClick={() => {
                                  if (
                                    fileInfo?.fileColorPagesToPrint.includes(
                                      pageNumber + 1
                                    )
                                  ) {
                                    handleColorPagesToPrintChange({
                                      target: {
                                        value: fileInfo?.fileColorPagesToPrint
                                          .filter(
                                            (page) => page != pageNumber + 1
                                          )
                                          .join(","),
                                      },
                                    });
                                  } else {
                                    handleColorPagesToPrintChange({
                                      target: {
                                        value: fileInfo?.fileColorPagesToPrint
                                          .concat(pageNumber + 1)
                                          .join(","),
                                      },
                                    });
                                    
                                  }
                                }}
                                className={`w-10 h-10 shrink-0 rounded-sm text-sm font-medium  shadow-md   transition-all duration-100 ${
                                  fileInfo?.fileColorPagesToPrint.includes(
                                    pageNumber + 1
                                  )
                                    ? "border bg-blue-200 border-blue-400 text-blue-500"
                                    : "bg-gray-200 border border-black/[0.1] text-black "
                                } `}
                              >
                                {pageNumber + 1}
                              </button>
                            )
                          )}
                        </section>
                      )}

                      {/* ------------------filePrintMode--------------------- */}
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Print Sides</Label>
                        <RadioGroup
                          defaultValue="duplex"
                          value={fileInfo?.filePrintMode}
                          onValueChange={(value) =>
                            setFileInfo((prev) => ({
                              ...prev,
                              filePrintMode: value,
                            }))
                          }
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 ">
                              <RadioGroupItem value="simplex" id="simplex" />
                              <Label
                                htmlFor="simplex"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Single Sided
                              </Label>
                            </div>
                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 ">
                              <RadioGroupItem value="duplex" id="duplex" />
                              <Label
                                htmlFor="duplex"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Double Sided
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      {/* ----------------filePaperType--------------------- */}
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="filePaperType">Paper Type</Label>
                        <RadioGroup
                          defaultValue="A4"
                          value={fileInfo?.filePaperType}
                          onValueChange={(value) =>
                            setFileInfo((prev) => ({
                              ...prev,
                              filePaperType: value,
                            }))
                          }
                        >
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                              <RadioGroupItem value="A4" id="A4" />
                              <Label
                                htmlFor="A4"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                A4
                              </Label>
                            </div>

                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                              <RadioGroupItem value="A3" id="A3" />
                              <Label
                                htmlFor="A3"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                A3
                              </Label>
                            </div>
                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 ">
                              <RadioGroupItem value="Letter" id="Letter" />
                              <Label
                                htmlFor="Letter"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Letter
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* -------------------additionalServices--------------------- */}
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="additionalServices">
                          Additional Services
                        </Label>
                        <RadioGroup
                          value={fileInfo?.additionalServices}
                          onValueChange={(value) =>
                            setFileInfo((prev) => ({
                              ...prev,
                              additionalServices: value,
                            }))
                          }
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                              <RadioGroupItem value="binding" id="binding" />
                              <Label
                                htmlFor="binding"
                                className="w-full flex items-center justify-start  h-full"
                              >
                                Binding
                              </Label>
                            </div>
                            <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                              <RadioGroupItem value="taping" id="taping" />
                              <Label
                                htmlFor="taping"
                                className=" w-full flex items-center justify-start  h-full"
                              >
                                Taping
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="messageForXeroxStore">Message</Label>
                        <Textarea
                          placeholder="Type your message here."
                          value={fileInfo?.messageForXeroxStore}
                          onChange={(e) =>
                            setFileInfo((prev) => ({
                              ...prev,
                              messageForXeroxStore: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <Button type="submit">Upload File</Button>
                    </form>
                  </div>
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

const alertToast = ({ title, description = "" }) => {
  if (!title) {
    return;
  }
  return (
    <div className="flex items-center gap-2">
      <AlertTriangle className=" h-4 w-4" />
      <p>{title}</p>
    </div>
  );
};
