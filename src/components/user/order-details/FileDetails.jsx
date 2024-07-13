import React from "react";
import Image from "next/image";

const FileDetails = ({ fileInfo, index }) => {
  console.log("file info is ", fileInfo);
  if (!fileInfo) return null;
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
    <li className="flex flex-col border border-gray-200 relative p-1 bg-white rounded-md gap-1 w-full">
      <div className="w-full flex bg-gray-100 p-2  rounded-md items-center gap-4">
        <Image
          src={fileInfo?.iconPath}
          alt={fileInfo?.fileName}
          width={100}
          height={100}
          className="h-12 w-12 rounded object-contain"
        />
        <div className="w-full">
          <h3 className="text-[14px] font-medium text-gray-900">
            {fileInfo?.fileName && fileInfo.fileName.length > 20 ? (
              <>
                {fileInfo.fileName.slice(0, 20)}...
                {fileInfo.fileExtension}
              </>
            ) : (
              fileInfo?.fileName + "." + fileInfo?.fileExtension
            )}
          </h3>

          <dl className="mt-0.5 w-full space-y-px text-[12px] text-gray-700">
            <div className="flex  w-full flex-col ">
              <div className="flex items-center gap-4">
                <dd className="inline font-medium">
                  {convertBytes(fileInfo?.fileSize)}
                </dd>
                <dd className="inline font-medium">
                  {fileInfo?.pageCount}&nbsp;Pages
                </dd>
                <dd className="inline font-medium">
                  {fileInfo?.copiesCount}&nbsp;Copies
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-[11px] ">
              <dd className="inline capitalize ">{fileInfo?.filePrintMode}</dd>
              <dd className="inline capitalize">{fileInfo?.fileColorType}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="w-full flex flex-col p-2 text-[12px] text-gray-600">
        <div className="flex items-center justify-between gap-4">
          <span className=" font-medium">Paper Size:</span>{" "}
          <span className=" font-medium ">{fileInfo?.paperSize}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className=" font-medium">Print Type:</span>{" "}
          <span className=" font-medium ">{fileInfo?.printType}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className=" font-medium ">Print Sides:</span>{" "}
          <span className=" font-medium ">{fileInfo?.printSides}</span>
        </div>

        {fileInfo?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className=" font-medium ">Color Type:</span>{" "}
            <span className=" font-medium ">{fileInfo?.mixedPrintType}</span>
          </div>
        )}
        {fileInfo?.printType === "mixed" && (
          <div className="flex items-center justify-between gap-4">
            <span className=" font-medium ">Color Pages:</span>{" "}
            <span className=" font-medium ">
              {fileInfo?.colorPages.join(", ")}
            </span>
          </div>
        )}

        {fileInfo?.xeroxStoreMessage.length > 0 && (
          <div className="flex flex-col">
            <span className=" font-medium ">Color Pages:</span>{" "}
            <span className=" font-medium ">{fileInfo?.xeroxStoreMessage}</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default FileDetails;
