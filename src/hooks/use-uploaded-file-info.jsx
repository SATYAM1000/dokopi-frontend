import { useState } from 'react';

/**
 * Custom hook to manage uploaded file information
 * @returns {[object, function, function]} The state, setter, and resetter for uploaded file information
 */
export const useUploadedFileInfo = () => {
  const initialFileInfo = {
    fileId: null,
    fileKey: null,
    fileName: null,
    fileSize: null,
    fileExtension: null,
    pageCount: null,
    iconPath: null,
    copiesCount: 1,
    printType: 'black_and_white',
    printSides: 'single_sided',
    paperSize: 'A4',
    xeroxStoreMessage: '',
    colorPages: [],
    mixedPrintType: null,
  };

  const [uploadedFileInfo, setUploadedFileInfo] = useState(initialFileInfo);

  const resetUploadedFileInfo = () => {
    setUploadedFileInfo(initialFileInfo);
  };

  return [uploadedFileInfo, setUploadedFileInfo, resetUploadedFileInfo];
};


