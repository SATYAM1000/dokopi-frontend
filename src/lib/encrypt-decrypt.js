import CryptoJS from "crypto-js";

export const encryptSensitiveData = (data, encryptionKey="1234567890") => {
  console.log("your encryption key is ", encryptionKey);
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
};

export const decryptSensitiveData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData;
};
