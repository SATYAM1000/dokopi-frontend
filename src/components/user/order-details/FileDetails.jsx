import React from "react";

const FileDetails = ({ fileInfo, index }) => {
  if (!fileInfo) return null;
  console.log("file info is ", fileInfo);

  return (
    <div className="w-full rounded-md bg-gray-100 px-4 py-2 flex flex-col gap-1 ">
      <h1 className="text-left text-[16px] font-bold text-gray-900">
        Document {index + 1}
      </h1>
      <div className="text-[14px] text-gray-800 w-full">
        <div className="flex items-center justify-between">
          <p>File Name: </p>
          <span>{fileInfo?.fileOriginalName}</span>
        </div>

        <div className="flex items-center justify-between">
          <p>Number of Copies: </p>
          <span>{fileInfo?.fileCopiesCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Print Mode: </p>
          <span className="capitalize">
            {fileInfo?.filePrintMode} on {fileInfo?.filePaperType}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p>Print Type:</p>
          <span className="capitalize">{fileInfo?.fileColorType} </span>
        </div>

        {fileInfo?.fileColorType === "mixed" && (
          <div
            className={`flex  ${
              fileInfo?.fileColorPagesToPrint.length > 8
                ? "flex-col"
                : "items-center justify-between"
            }`}
          >
            <p>Color Pages:</p>
            <span className="text-wrap">
              {fileInfo?.fileColorPagesToPrint
                ?.sort((a, b) => parseInt(a) - parseInt(b))
                .join(",")}{" "}
            </span>
          </div>
        )}

        {fileInfo?.additionalServices && (
          <div className="flex items-center justify-between">
            <p>Additional Services: </p>
            <span>{fileInfo?.additionalServices}</span>
          </div>
        )}

        {fileInfo?.messageForXeroxStore && (
          <div className="flex flex-col">
            <p>Message: </p>
            <span className="py-1 px-2 border bg-white font-normal mt-1 rounded-md text-wrap ">
              {fileInfo?.messageForXeroxStore}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
