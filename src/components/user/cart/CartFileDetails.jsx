import React from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const CartFileDetails = ({ product, handleDeleteItem }) => {
  if (!product) return null;
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
      <div className="w-full flex bg-white p-2  rounded-md items-center gap-4">
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
            <div className="flex  w-full flex-col ">
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

              <div className="cursor-pointer absolute top-2 right-2 flex items-center gap-2">
                {/* <div className="p-1 rounded-full flex items-center justify-center ">
                  <FaRegEdit size={16} className="h-4 w-4" />
                </div> */}
                <div
                  onClick={() => handleDeleteItem(product?.fileId)}
                  className="p-1 rounded-full "
                >
                  <X className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-[11px] ">
              <dd className="inline capitalize ">{product?.filePrintMode}</dd>
              <dd className="inline capitalize">{product?.fileColorType}</dd>
              <dd className="inline capitalize">
                {product?.additionalServices}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="w-full flex flex-col p-2 text-[12px] text-gray-600">
        <div className="flex items-center justify-between gap-4">
          <span className=" font-medium">Paper Size:</span>{" "}
          <span className=" font-medium ">{product?.paperSize}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className=" font-medium">Print Type:</span>{" "}
          <span className=" font-medium ">{product?.printType}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className=" font-medium ">Print Sides:</span>{" "}
          <span className=" font-medium ">{product?.printSides}</span>
        </div>

        {product?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className=" font-medium ">Color Type:</span>{" "}
            <span className=" font-medium ">{product?.mixedPrintType}</span>
          </div>
        )}
        {product?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className=" font-medium ">Color Pages:</span>{" "}
            <span className=" font-medium ">
              {product?.colorPages.join(", ")}
            </span>
          </div>
        )}

        {product?.xeroxStoreMessage.length > 0 && (
          <div className="flex flex-col">
            <span className=" font-medium ">Color Pages:</span>{" "}
            <span className=" font-medium ">{product?.xeroxStoreMessage}</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default CartFileDetails;
