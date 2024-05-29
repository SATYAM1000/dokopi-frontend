"use client";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

const FileUploader = ({
  token,
  currentUser,
  setFileInfo,
  setFiles,
  setShowFileUploadProgress,
  setIsFileUploadedSuccessfully,
  fileUploadRef,
}) => {
  const handleFileInputClick = () => {
    fileUploadRef.current.value = null;
    fileUploadRef.current.click();
  };

  const onFileUpload = async (e) => {
    if (!currentUser || !token) {
      toast.error("Login required", { description: "Please login to proceed" });
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

            if (loaded === total) {
              const fileSize =
                total < 1024
                  ? `${total} KB`
                  : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
              setFileInfo((prev) => ({ ...prev, fileSize }));
            }
          },
        })
        .then((response) => {
          const { data } = response;
          setFileInfo((prev) => ({
            ...prev,
            id: uuidv4(),
            fileURL: data.url,
            fileOriginalName,
            fileExtension: uploadedFileExtension,
            filePageCount: data.pageCount,
          }));
          resolve();
        })
        .catch(reject);
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
        setIsFileUploadedSuccessfully(false);
        setFiles((prev) => prev.slice(0, -1));
        console.error("your error is ", error);
        return (
          error?.response?.data?.msg || error?.message || "Something went wrong"
        );
      },
    });
  };

  return (
    <header
      className={`border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center rounded-md h-full cursor-pointer`}
      onClick={handleFileInputClick}
    >
      <p className="mb-3 font-medium text-gray-700 flex flex-wrap justify-center">
        <span>Drag and drop or</span>&nbsp;<span>files anywhere or</span>
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
        className="mt-2 bg-blue-600 hover:bg-blue-800 rounded-sm px-3 py-1 flex items-center justify-center gap-2"
      >
        <p>
            Upload File
        </p>
      </Button>
    </header>
  );
};

export default FileUploader;
