import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";

const CartFileDetails = ({ product, handleDeleteItem, loader }) => {
  console.log("loader is ", loader)
  if (!product) return null;

  // Function to convert bytes to a readable format
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
      <div className="w-full flex flex-col p-2 text-[12px] text-gray-600">
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Paper Size:</span>{" "}
          <span className="font-medium">{product?.paperSize}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Print Type:</span>{" "}
          <span className="font-medium">{product?.printType}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Print Sides:</span>{" "}
          <span className="font-medium">{product?.printSides}</span>
        </div>
        {product?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">Color Type:</span>{" "}
            <span className="font-medium">{product?.mixedPrintType}</span>
          </div>
        )}
        {product?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">Color Pages:</span>{" "}
            <span className="font-medium">{product?.colorPages.join(", ")}</span>
          </div>
        )}
        {product?.xeroxStoreMessage.length > 0 && (
          <div className="flex flex-col">
            <span className="font-medium">Color Pages:</span>{" "}
            <span className="font-medium">{product?.xeroxStoreMessage}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-items-end">
        <button className="w-full py-1 outline-none text-sm bg-white hover:bg-gray-50 rounded border border-gray-200">
          Edit
        </button>
        <button
          className="w-full py-1 text-sm bg-white hover:bg-gray-50 rounded border border-gray-200 flex items-center justify-center"
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
