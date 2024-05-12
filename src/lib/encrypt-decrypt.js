import CryptoJS from "crypto-js";

const encryptionKey = "your-secret-key";

export const encryptSensitiveData = (data, encryptionKey="1234567890") => {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
};

export const decryptSensitiveData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData;
};
