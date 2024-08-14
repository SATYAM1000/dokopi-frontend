export const API_DOMAIN = process.env.API_URL;

export const Day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const KnownMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const initialFileInfo = {
  fileId: null,
  fileKey: null,
  fileName: null,
  fileSize: null,
  fileExtension: null,
  pageCount: null,
  iconPath: null,
  copiesCount: 1,
  printType: "black_and_white",
  printSides: "single_sided",
  paperSize: "A4",
  xeroxStoreMessage: "",
  colorPages: [],
  mixedPrintType: null,
};
