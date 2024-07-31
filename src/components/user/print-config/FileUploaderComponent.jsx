"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

const FileUploaderComponent = ({
  setUploadedFileInfo,
  setIsFileUploadedSuccessfully,
  setIsFileUploading,
}) => {
  const currentUser = useCurrentUser();
  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!currentUser) {
        toast.error("Login required", {
          description: "Please login to proceed",
        });
        router.push("/auth/sign-in");
        return;
      }
      const file = acceptedFiles[0];
      if (!file) {
        toast.error("File is required");
        return;
      }
      const uploadedFileExtension = file.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "docx"];

      if (!allowedExtensions.includes(uploadedFileExtension)) {
        toast.error("Invalid file type", {
          description: "Only PDF, JPG, JPEG, PNG, DOCX are allowed",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      setIsFileUploading(true);

      const uploadPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            `${API_DOMAIN}/api/v1/user/files/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${await fetchAccessToken()}`,
              },
            }
          );

          const { data } = response;

          setUploadedFileInfo((prev) => ({
            ...prev,
            fileId: nanoid(8),
            fileKey: data.key,
            fileName: file.name.substring(0, file.name.lastIndexOf(".")),
            fileSize: String(file.size),
            pageCount: data.pageCount,
            iconPath: `/file-icons/${uploadedFileExtension}.svg`,
            fileExtension: uploadedFileExtension,
          }));
          setIsFileUploading(false);
          setIsFileUploadedSuccessfully(true);
          resolve();
        } catch (error) {
          setIsFileUploading(false);
          setIsFileUploadedSuccessfully(false);
          reject(error);
        }
      });

      toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: () => {
          return "File uploaded successfully!";
        },
        error: (error) => {
          console.error("Error uploading file:", error);
          return (
            error?.response?.data?.msg ||
            error?.message ||
            "Something went wrong"
          );
        },
      });
    },
    [
      API_DOMAIN,
      setUploadedFileInfo,
      setIsFileUploading,
      setIsFileUploadedSuccessfully,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: `border-dashed border-2 bg-white border-gray-400 py-4 md:py-12 flex flex-col justify-center items-center rounded-md h-full cursor-pointer`,
      })}
    >
      <input {...getInputProps()} />
      <p className="mb-3 font-medium text-gray-500 text-xs md:text-sm flex flex-wrap justify-center">
        {isDragActive ? (
          <span>Drop the file here...</span>
        ) : (
          <div className="text-center flex flex-col">
            <div>
              <span>Drag and drop your</span>&nbsp;
              <span>files anywhere or</span>
            </div>
            <span className="text-[10px] text-gray-400 block">
              &nbsp;Allowed formats: PDF, JPG, JPEG, PNG, DOCX, PPT
              <span className="text-red-500 ml-1">*</span>
            </span>
          </div>
        )}
      </p>
      <Button
        id="button"
        size="sm"
        className="mt-2 bg-indigo-600 hover:bg-indigo-800 rounded-sm px-3 py-1 flex items-center justify-center gap-2"
      >
        <span>Upload File</span>
      </Button>
    </div>
  );
};

export default FileUploaderComponent;
