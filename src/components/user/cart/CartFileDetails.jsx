"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateFileInfo from "./UpdateFileInfo";

const CartFileDetails = ({
  product,
  handleDeleteItem,
  loader,
  handleUpdateItem,
}) => {
  if (!product) return null;

  const [uploadedFileInfo, setUploadedFileInfo] = useState(product);
  console.log("product is ", product);

  return (
    <li className="flex flex-col border border-gray-200 relative p-1 bg-gray-100 rounded-md gap-1 w-full">
      <div className="w-full flex bg-white p-2 border border-gray-200 rounded-md items-center gap-4">
        <Image
          src={product?.iconPath}
          alt={product?.fileName}
          width={100}
          height={100}
          className="h-12 w-12 rounded object-contain"
        />
        <div className="w-full">
          <h3 className="text-[14px] font-medium text-gray-900">
            {product?.fileName && product.fileName.length > 20 ? (
              <>
                {product.fileName.slice(0, 20)}...
                {product.fileExtension}
              </>
            ) : (
              product?.fileName + "." + product?.fileExtension
            )}
          </h3>
          <dl className="mt-0.5 w-full space-y-px text-[12px] text-gray-700">
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-4">
                <dd className="inline font-medium">
                  {convertBytes(product?.fileSize)}
                </dd>
                <dd className="inline font-medium">
                  {product?.pageCount}&nbsp;Pages
                </dd>
                <dd className="inline font-medium">
                  {product?.copiesCount}&nbsp;Copies
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div className={`w-full flex flex-col p-2 text-[12px] text-gray-600 ${product?.xeroxStoreMessage?.length > 0 ? "border-b border-gray-300" : ""}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Paper Size:</span>{" "}
          <span className="font-medium">{product?.paperSize}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Print Type:</span>{" "}
          <span className="font-medium capitalize">
            {product?.printType.split("_").join(" ")}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Print Sides:</span>{" "}
          <span className="font-medium capitalize">
            {product?.printSides.split("_").join(" ")}
          </span>
        </div>
        {product?.printType === "mixed" && product?.mixedPrintType && (
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">Color Type:</span>{" "}
            <span className="font-medium">
              {product?.mixedPrintType.split("_").join(" ")}
            </span>
          </div>
        )}
        {product?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">Color Pages:</span>{" "}
            <span className="font-medium">
              {product?.colorPages
                ? [...product.colorPages].sort().join(", ")
                : ""}
            </span>
          </div>
        )}
      </div>
      {product?.xeroxStoreMessage?.length > 0 && (
        <div className="flex flex-col text-[12px] text-gray-600 px-2 py-1">
          <span className="font-medium">Message:</span>{" "}
          <span className="font-medium">{product?.xeroxStoreMessage}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger className="w-full focus:outline-none">
            <button className="w-full py-1   outline-none text-sm bg-white hover:bg-gray-50 rounded border border-gray-200">
              Edit
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit File Info</DialogTitle>
              <DialogDescription>
                Edit the file information for the selected file.
              </DialogDescription>
            </DialogHeader>
            <UpdateFileInfo
              uploadedFileInfo={uploadedFileInfo}
              setUploadedFileInfo={setUploadedFileInfo}
              product={product}
              handleUpdateItem={handleUpdateItem}
            />
          </DialogContent>
        </Dialog>

        <button
          className="w-full  py-1 text-sm bg-white hover:bg-gray-50 rounded border border-gray-200 flex items-center justify-center"
          onClick={() => handleDeleteItem(product?.fileId)}
        >
          {loader ? (
            <div className="flex items-center justify-center p-0.5">
              <ClipLoader color="black" size={16} />
            </div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </li>
  );
};

export default CartFileDetails;

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
