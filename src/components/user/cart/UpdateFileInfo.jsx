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
  const [xeroxStorePricing, setXeroxStorePricing] = useState([]);
  const [availablePrintSides, setAvailablePrintSides] = useState([]);
  const [availablePrintTypes, setAvailablePrintTypes] = useState([]);
  const [availablePaperSizes, setAvailablePaperSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [initialFileInfo, setInitialFileInfo] = useState({});

  useEffect(() => {
    fetchXeroxStorePricing();
    setInitialFileInfo(uploadedFileInfo);
  }, []);

  useEffect(() => {
    if (xeroxStorePricing.length > 0) {
      updateAvailablePrintTypes(uploadedFileInfo.paperSize);
      updateAvailablePrintSides(uploadedFileInfo.printType);
      updateAvailablePaperSizes();
    }
  }, [xeroxStorePricing]);

  const updateAvailablePaperSizes = () => {
    const paperSizes = xeroxStorePricing.map((price) => price.paperSize);
    setAvailablePaperSizes([...new Set(paperSizes)]);
  };

  useEffect(() => {
    setIsButtonEnabled(
      JSON.stringify(initialFileInfo) !== JSON.stringify(uploadedFileInfo)
    );
  }, [uploadedFileInfo, initialFileInfo]);

  const fetchXeroxStorePricing = async () => {
    try {
      const response = await axios.get(
        `${API_DOMAIN}/api/v1/store/pricing/get/${localStorage.getItem(
          "storeId"
        )}`
      );

      if (response.data.success) {
        setXeroxStorePricing(response.data.data.priceList);
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

    if (!filteredPrintTypes.includes(uploadedFileInfo.printType)) {
      setUploadedFileInfo((prevInfo) => ({
        ...prevInfo,
        printType: "",
        printSides: "",
      }));
    }
  };

  const updateAvailablePrintSides = (printType) => {
    const sides = xeroxStorePricing
      .filter(
        (price) =>
          price.printType === printType &&
          price.paperSize === uploadedFileInfo.paperSize
      )
      .map((price) => price.printingSides);
    setAvailablePrintSides([...new Set(sides)]);

    if (!sides.includes(uploadedFileInfo.printSides)) {
      setUploadedFileInfo((prevInfo) => ({
        ...prevInfo,
        printSides: "",
      }));
    }
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
      printSides: "", // Clear print sides when print type changes
    }));
    updateAvailablePrintSides(value);
  };

  const validateConfiguration = () => {
    const { paperSize, printType, printSides } = uploadedFileInfo;
    if (!paperSize || !printType || !printSides) {
      setError("Please complete all fields before submitting.");
      return false;
    }

    const isValid = xeroxStorePricing.some(
      (price) =>
        price.paperSize === paperSize &&
        price.printType === printType &&
        price.printingSides === printSides
    );

    if (!isValid) {
      setError("Invalid configuration. Please check your selections.");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateConfiguration()) {
      return;
    }

    setIsLoading(true);

    try {
      await handleUpdateItem(uploadedFileInfo.fileId, uploadedFileInfo);
      setSuccess("File updated successfully!");
      setInitialFileInfo(uploadedFileInfo);
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
        {error && <p className="text-red-500 text-xs">{error}</p>}
        {success && <p className="text-green-500 text-xs">{success}</p>}

        <div className="grid w-full items-center gap-2">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
            htmlFor="updatedCopiesCount"
          >
            Number of copies:
          </label>
          <Input
            id="updatedCopiesCount"
            type="number"
            name="copiesCount"
            min="1"
            value={uploadedFileInfo.copiesCount || ""}
            required={true}
            className="w-full border border-gray-200 rounded-sm h-[40px] pl-2"
            onChange={(e) => {
              setUploadedFileInfo((prevInfo) => ({
                ...prevInfo,
                copiesCount: e.target.value,
              }));
            }}
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
              {availablePaperSizes.map((size) => (
                <div
                  key={size}
                  className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer"
                >
                  <RadioGroupItem
                    value={size}
                    name="paperSize"
                    id={"updated" + size}
                  />
                  <label
                    htmlFor={"updated" + size}
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
              htmlFor="updatedPrintType"
            >
              Print Type:
            </label>
            <RadioGroup
              name="printType"
              id="updatedPrintType"
              defaultValue={uploadedFileInfo.printType || ""}
              value={uploadedFileInfo.printType || ""}
              onValueChange={handlePrintTypeChange}
            >
              <div className="grid grid-cols-2 gap-4">
                {availablePrintTypes.map((printType, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={printType}
                      id={"updated" + printType}
                    />
                    <label
                      className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor={"updated" + printType}
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
              htmlFor="updatedPrintSides"
            >
              Printing Sides:
            </label>
            <RadioGroup
              name="printSides"
              id="updatedPrintSides"
              defaultValue={uploadedFileInfo.printSides || ""}
              value={uploadedFileInfo.printSides || ""}
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
                    <RadioGroupItem
                      value="single_sided"
                      id="updated_single_sided"
                    />
                    <label
                      className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor="updated_single_sided"
                    >
                      Single Sided
                    </label>
                  </div>
                )}
                {availablePrintSides.includes("double_sided") && (
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                    <RadioGroupItem
                      value="double_sided"
                      id="updated_double_sided"
                    />
                    <Label
                      className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor="updated_double_sided"
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
            htmlFor="updatedxeroxStoreMessage"
          >
            Message For Xerox Store:
          </label>
          <div className="w-full">
            <Textarea
              id="updatedxeroxStoreMessage"
              name="xeroxStoreMessage"
              value={uploadedFileInfo.xeroxStoreMessage || ""}
              className="w-full bg-white border rounded-md pl-2"
              onChange={(e) => {
                setUploadedFileInfo((prevInfo) => ({
                  ...prevInfo,
                  xeroxStoreMessage: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        <div className="w-full grid items-center gap-4">
          <Button
            type="submit"
            disabled={isLoading || !isButtonEnabled}
            className={`w-full h-[40px] ${
              isButtonEnabled
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-400"
            } text-white border border-gray-200 rounded-md`}
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