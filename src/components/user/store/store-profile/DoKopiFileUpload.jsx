"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  File,
  FileWarning,
  Trash,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { API_DOMAIN } from "@/lib/constants";
import axios from "axios";

import { toast } from "sonner";
import { extractColorPages } from "@/lib/colorPagesExtractor";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { addToCart } from "@/providers/redux/reducers/cart-slice";
import Link from "next/link";
import { encryptSensitiveData } from "@/lib/encrypt-decrypt";
import { Progress } from "@/components/ui/progress";

const DoKopiFileUpload = ({ token, encryptionKey }) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const fileUploadRef = useRef(null);
  const [pagesInput, setPagesInput] = useState(null);
  const [error, setError] = useState(null);

  const [files, setFiles] = useState([]);
  const [showFileUploadProgress, setShowFileUploadProgress] = useState(false);
  const [isFileUploadedSuccessfully, setIsFileUploadedSuccessfully] =
    useState(false);

  const dispatch = useDispatch();

  const [fileInfo, setFileInfo] = useState({
    fileURL: null,
    fileOriginalName: null,
    fileSize: null,
    fileExtension: null,
    filePageCount: null,
    fileIconPath: "/file-icons/pdf.svg",
    fileCopiesCount: 1,
    messageForXeroxStore: "",
    additionalServices: null,
    filePaperType: "A4",
    fileColorType: "black and white",
    filePrintMode: "simplex",
    fileColorPagesToPrint: [""],
  });

  const handleFileInputClick = () => {
    if (fileInfo?.fileURL) {
      toast.error("File already uploaded");
      return;
    }
    fileUploadRef.current.value = null;
    fileUploadRef.current.click();
  };

  const onFileUpload = async (e) => {
    if (!currentUser || !token) {
      toast.error("Login required", {
        description: "Please login to proceed",
      });
      router.replace("/auth/sign-in");
      return;
    }

    const file = e.target.files[0];
    if (!file) {
      toast.error("File is required");
      return;
    }

    const uploadedFileExtension = file.name.split(".").pop();
    const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "docx", "odt"];

    if (!allowedExtensions.includes(uploadedFileExtension)) {
      toast.error("Invalid file type", {
        description: "Only PDF, JPG, JPEG, PNG, DOCX are allowed",
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

    const uploadPromise = new Promise((resolve, reject) => {
      axios
        .post(`${API_DOMAIN}/api/v1/user/files/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: ({ loaded, total }) => {
            setFiles((prev) => {
              const newFiles = [...prev];
              newFiles[newFiles.length - 1].loading = Math.floor(
                (loaded / total) * 100
              );
              return newFiles;
            });

            if (loaded == total) {
              const fileSize =
                total < 1024
                  ? `${total} KB`
                  : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;

              setFileInfo((prev) => ({
                ...prev,
                fileSize: fileSize,
              }));
            }
          },
        })
        .then((response) => {
          const { data } = response;
          setFileInfo((prev) => ({
            ...prev,
            fileURL: data?.url,
            fileOriginalName: fileOriginalName,
            fileExtension: uploadedFileExtension,
            filePageCount: data?.pageCount,
          }));

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

    toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: () => {
        setShowFileUploadProgress(false);
        setIsFileUploadedSuccessfully(true);
        return "File uploaded successfully!";
      },
      error: (error) => {
        setShowFileUploadProgress(false);
        return (
          error?.response?.data?.msg || error?.message || "Something went wrong"
        );
      },
    });
  };

  const onFinalSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Login required", {
        description: "Please login to proceed",
      });

      return;
    }
    if (
      !fileInfo?.fileURL ||
      !fileInfo?.filePageCount ||
      !fileInfo?.fileOriginalName ||
      !fileInfo?.fileExtension ||
      !fileInfo?.filePageCount ||
      !fileInfo?.fileCopiesCount ||
      !fileInfo?.filePaperType ||
      !fileInfo?.fileColorType ||
      !fileInfo?.filePrintMode
    ) {
      toast.error("Please fill all the required fields!");
      return;
    }

    // Encrypt file URL
    const encryptedFileURL = encryptSensitiveData(
      fileInfo.fileURL,
      encryptionKey
    );

    // Update state with encrypted file URL
    setFileInfo((prev) => ({
      ...prev,
      fileURL: encryptedFileURL,
    }));

    // Update cart with the updated fileInfo
    dispatch(addToCart({ ...fileInfo, fileURL: encryptedFileURL }));

    // Save file info to local storage
    const file = JSON.parse(localStorage.getItem("file")) || [];
    file.push({ ...fileInfo, fileURL: encryptedFileURL });
    localStorage.setItem("file", JSON.stringify(file));

    // Reset fileInfo state
    setFileInfo({
      fileURL: null,
      fileOriginalName: null,
      fileSize: null,
      fileExtension: null,
      filePageCount: null,
      fileIconPath: "/file-icons/pdf.svg",
      fileCopiesCount: 1,
      messageForXeroxStore: "",
      additionalServices: null,
      filePaperType: "A4",
      fileColorType: "black and white",
      filePrintMode: "simplex",
      fileColorPagesToPrint: [""],
    });

    // Notify user
    toast.success("File added successfully");

    setIsFileUploadedSuccessfully(false);
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
                        className={`border-dashed border border-gray-400 flex rounded-md h-full px-4 py-4`}
                      >
                        {/* ----------uploaded file info----------- */}
                        <div className="w-full max-h-[70px] p-2 border-2 border-gray-700 rounded-md flex items-center ">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center px-2 py-2 border border-gray-300 rounded-md">
                                <File size={22} className="text-black" />
                              </div>
                              <div className="flex flex-col">
                                <p className="text-gray-700 text-[16px]">
                                  {fileInfo?.fileOriginalName?.length > 20
                                    ? fileInfo?.fileOriginalName.slice(0, 20) +
                                      "..."
                                    : fileInfo?.fileOriginalName}
                                </p>
                                <div className="flex items-center gap-4">
                                  <p className="text-gray-500 text-[13px]">
                                    {fileInfo?.fileSize}
                                  </p>
                                  <p className="text-gray-500 text-[13px]">
                                    {fileInfo?.filePageCount} pages
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Trash2 size={20} className="text-red-500" />
                            </div>
                          </div>
                        </div>
                      </header>
                    ) : showFileUploadProgress ? (
                      <>
                        <header className="border-dashed border border-gray-700 py-12 flex flex-col justify-center items-center rounded-md h-full">
                          <Progress value={files[0]?.loading} />
                          {files[0]?.loading}
                          <p className="text-gray-600 rounded-md  my-2 font-medium ">
                            Uploading...
                          </p>
                        </header>
                      </>
                    ) : (
                      <header
                        className={`border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center rounded-md h-full cursor-pointer`}
                        onClick={handleFileInputClick}
                      >
                        <p className="mb-3 font-medium text-gray-700 flex flex-wrap justify-center">
                          <span>Drag and drop or</span>&nbsp;
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
                    <p className="font-semibold text-gray-700 ">
                      Printing Preferences
                    </p>
                    <form
                      className="mt-4 flex flex-col gap-4 w-full text-gray-700 "
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

                      <div
                        className="w-full grid grid-cols-2 
                      items-center gap-4
                      "
                      >
                        <Button type="submit">Upload more</Button>
                        <Link href={"/cart"}>
                          <Button className="w-full">Checkout</Button>
                        </Link>
                      </div>
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
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
