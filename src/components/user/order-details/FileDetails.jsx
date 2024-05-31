import React from "react";

const FileDetails = ({ fileInfo, index }) => {
  if (!fileInfo) return null;
  
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
        {fileInfo?.messageForXeroxStore && (
          <div className="flex items-center justify-between">
            <p>Message: </p>
            <span>{fileInfo?.messageForXeroxStore}</span>
          </div>
        )}
        {fileInfo?.additionalServices && (
          <div className="flex items-center justify-between">
            <p>Additional Services: </p>
            <span>{fileInfo?.additionalServices[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
