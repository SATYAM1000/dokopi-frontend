"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API_DOMAIN } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";

const UpdateFileInfo = ({
  uploadedFileInfo,
  setUploadedFileInfo,
  handleUpdateItem,
}) => {
  const user = useCurrentUser();
  console.log("uploadedFileInfo is ", uploadedFileInfo);
  const [xeroxStorePricing, setXeroxStorePricing] = useState([]);
  const [availablePrintSides, setAvailablePrintSides] = useState([]);
  const [availablePrintTypes, setAvailablePrintTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchXeroxStorePricing();
  }, []);

  const fetchXeroxStorePricing = async () => {
    try {
      const response = await axios.get(
        `${API_DOMAIN}/api/v1/store/pricing/get/${localStorage.getItem(
          "storeId"
        )}`
      );

      if (response.data.success) {
        setXeroxStorePricing(response.data.data.priceList);
        updateAvailablePrintTypes(uploadedFileInfo.paperSize);
      }
    } catch (error) {
      console.error("Error fetching store pricing:", error);
      setError("Failed to fetch store pricing. Please try again later.");
    }
  };

  const updateAvailablePrintTypes = (paperSize) => {
    const filteredPrintTypes = xeroxStorePricing
      .filter((price) => price.paperSize === paperSize)
      .map((price) => price.printType);
    setAvailablePrintTypes([...new Set(filteredPrintTypes)]);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUploadedFileInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handlePaperSizeChange = (value) => {
    setUploadedFileInfo((prevInfo) => ({
      ...prevInfo,
      paperSize: value,
    }));
    updateAvailablePrintTypes(value);
  };

  const handlePrintTypeChange = (value) => {
    setUploadedFileInfo((prevInfo) => ({
      ...prevInfo,
      printType: value,
    }));

    const sides = xeroxStorePricing
      .filter(
        (price) =>
          price.printType === value &&
          price.paperSize === uploadedFileInfo.paperSize
      )
      .map((price) => price.printingSides);
    setAvailablePrintSides([...new Set(sides)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await handleUpdateItem(uploadedFileInfo.fileId, uploadedFileInfo);
      setSuccess("File updated successfully!");
    } catch (err) {
      setError("Failed to update file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-32 rounded-lg border border-gray-200 p-4">
      <p className="font-semibold text-gray-700">Printing Preferences</p>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-6 w-full text-gray-700"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="grid w-full items-center gap-2">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
            htmlFor="copiesCount"
          >
            Number of copies:
          </label>
          <Input
            id="copiesCount"
            type="number"
            min="1"
            defaultValue={uploadedFileInfo.copiesCount || ""}
            required={true}
            className="w-full border border-gray-200 rounded-sm h-[40px] pl-2"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
            htmlFor="paperSize"
          >
            Paper Size:
          </label>
          <RadioGroup
            name="paperSize"
            id="paperSize"
            value={uploadedFileInfo.paperSize || ""}
            defaultValue={uploadedFileInfo.paperSize || ""}
            onValueChange={handlePaperSizeChange}
          >
            <div className="grid grid-cols-2 gap-4">
              {["A4", "A3"].map((size) => (
                <div
                  key={size}
                  className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer"
                >
                  <RadioGroupItem value={size} name="paperSize" id={size} />
                  <label
                    htmlFor={size}
                    className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {availablePrintTypes.length > 0 && (
          <div className="grid w-full items-center gap-2">
            <label
              className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
              htmlFor="printType"
            >
              Print Type:
            </label>
            <RadioGroup
              name="printType"
              defaultValue={uploadedFileInfo.printType || ""}
              onValueChange={handlePrintTypeChange}
            >
              <div className="grid grid-cols-2 gap-4">
                {availablePrintTypes.map((printType, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer"
                  >
                    <RadioGroupItem value={printType} id={printType} />
                    <label
                      className="uppercase bg-red-200 w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor={printType}
                    >
                      {printType === "black_and_white" && "B/W"}
                      {printType === "simple_color" && "Simple Color"}
                      {printType === "digital_color" && "Digital Color"}
                      {printType === "mixed" && "Mixed"}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {availablePrintSides.length > 0 && (
          <div className="grid w-full items-center gap-2">
            <label
              className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
              htmlFor="printSides"
            >
              Printing Sides:
            </label>
            <RadioGroup
              defaultValue={uploadedFileInfo.printSides || ""}
              onValueChange={(value) =>
                setUploadedFileInfo((prevInfo) => ({
                  ...prevInfo,
                  printSides: value,
                }))
              }
            >
              <div className="grid grid-cols-2 gap-4">
                {availablePrintSides.includes("single_sided") && (
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                    <RadioGroupItem value="single_sided" id="single_sided" />
                    <label
                      className="uppercase w-full h-full bg-red-700 flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor="single_sided"
                    >
                      Single Sided
                    </label>
                  </div>
                )}
                {availablePrintSides.includes("double_sided") && (
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                    <RadioGroupItem value="double_sided" id="double_sided" />
                    <Label
                      className="uppercase w-full bg-green-700 h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor="double_sided"
                    >
                      Double Sided
                    </Label>
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="grid w-full items-center gap-2">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
            htmlFor="xeroxStoreMessage"
          >
            Message For Xerox Store:
          </label>
          <div className="w-full">
            <Textarea
              id="xeroxStoreMessage"
              name="xeroxStoreMessage"
              defaultValue={uploadedFileInfo.xeroxStoreMessage || ""}
              className="w-full bg-white border rounded-md pl-2"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="w-full grid items-center gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-[40px] bg-indigo-500 hover:bg-indigo-600 text-white border border-gray-200 rounded-md"
          >
            {isLoading ? (
              <ClipLoader color="white" size={16} />
            ) : (
              <p>Update File</p>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFileInfo;
