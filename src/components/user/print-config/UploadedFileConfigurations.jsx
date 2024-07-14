"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API_DOMAIN } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/providers/redux/slices/new-cart-slice";
import { useCurrentUser } from "@/hooks/use-current-user";
import { extractColorPages } from "@/lib/colorPagesExtractor";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DokopiCartComponent from "../cart/DokopiCartComponent";

import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import FileConfigurationSkelton from "./FileConfigurationSkelton";

const UploadedFileConfigurations = ({
  uploadedFileInfo,
  setUploadedFileInfo,
  resetUploadedFileInfo,
  setIsFileUploadedSuccessfully,
}) => {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const [xeroxStorePricing, setXeroxStorePricing] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [availablePrintSides, setAvailablePrintSides] = useState([]);
  const [availablePrintTypes, setAvailablePrintTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [loaderForPriceFetching, setLoaderForPriceFetching] = useState(true);
  const [pageNumberInput, setPageNumberInput] = useState(null);
  const [errorForPageNumberInput, setErrorForPageNumberInput] = useState(null);
  useEffect(() => {
    fetchXeroxStorePricing();
  }, []);

  useEffect(() => {
    if (xeroxStorePricing.length > 0) {
      updateAvailablePrintTypes(uploadedFileInfo.paperSize);
      updateAvailablePrintSides(
        uploadedFileInfo.printType,
        uploadedFileInfo.paperSize
      );
    }
  }, [xeroxStorePricing]);

  const validateCartItem = (cartItem) => {
    const requiredFields = [
      "fileId",
      "fileKey",
      "fileName",
      "fileSize",
      "fileExtension",
      "pageCount",
      "copiesCount",
      "printType",
      "printSides",
      "paperSize",
    ];

    for (const field of requiredFields) {
      if (!cartItem[field]) {
        return false;
      }
    }

    return true;
  };

  const handleAddItem = async () => {
    try {
      console.log("set uploaded file info add component ", uploadedFileInfo);
      setIsLoading(true);
      if (validateCartItem(uploadedFileInfo)) {
        await dispatch(
          addCartItem({ userId: user.id, cartItem: uploadedFileInfo })
        ).unwrap();

        toast.success("File added to cart");
        resetUploadedFileInfo();
        setIsFileUploadedSuccessfully(false);
      } else {
        toast.error("Please fill all the required fields");
      }
    } catch (error) {
      console.error("Failed to add item:", error);
      toast.error(error?.msg || "Failed to add file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsLoader(true);
      if (validateCartItem(uploadedFileInfo)) {
        await dispatch(
          addCartItem({ userId: user.id, cartItem: uploadedFileInfo })
        ).unwrap();

        toast.success("File added to cart", {
          duration: 500,
        });
        resetUploadedFileInfo();
        setIsFileUploadedSuccessfully(false);
      }
    } catch (error) {
      console.error("Failed to add item:", error);
      toast.error(error?.msg || "Failed to add file");
    } finally {
      setIsLoader(false);
      setIsCartOpen(true);
    }
  };

  const fetchXeroxStorePricing = async () => {
    try {
      setLoaderForPriceFetching(true);
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
      console.log("Error fetching store pricing:", error);
    } finally {
      setLoaderForPriceFetching(false);
    }
  };

  const updateAvailablePrintTypes = (paperSize) => {
    const filteredPrintTypes = xeroxStorePricing
      .filter((price) => price.paperSize === paperSize)
      .map((price) => price.printType);

    // Ensure "mixed" is always available
    const printTypes = new Set(filteredPrintTypes);
    printTypes.add("mixed");

    setAvailablePrintTypes([...printTypes]);
  };

  const updateAvailablePrintSides = (printType, paperSize) => {
    if (printType === "mixed") {
      setAvailablePrintSides(["single_sided", "double_sided"]);
    } else {
      const sides = xeroxStorePricing
        .filter(
          (price) =>
            price.printType === printType && price.paperSize === paperSize
        )
        .map((price) => price.printingSides);
      setAvailablePrintSides([...new Set(sides)]);
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
      printType: "", // Clear the selected print type
      printSides: "", // Clear the selected print sides
    }));
    updateAvailablePrintTypes(value);
  };

  const handlePrintTypeChange = (value) => {
    setUploadedFileInfo((prevInfo) => ({
      ...prevInfo,
      printType: value,
      printSides: "", // Clear the selected print sides
    }));
    updateAvailablePrintSides(value, uploadedFileInfo.paperSize);
  };

  const handleColorPagesToPrintChange = (e) => {
    setErrorForPageNumberInput(null);
    if (e.target.value.length < 0 || !uploadedFileInfo.pageCount) {
      setErrorForPageNumberInput("Please upload the file first");
      return;
    }
    const res = extractColorPages(e.target.value, uploadedFileInfo.pageCount);
    setPageNumberInput(e.target.value);
    if (!res.success) {
      setErrorForPageNumberInput(res.msg);
      return;
    }
    console.log("res is from page selection ", res.data);
    setUploadedFileInfo((prev) => ({ ...prev, colorPages: res.data }));
  };

  return (
    <>
      {loaderForPriceFetching ? (
        <FileConfigurationSkelton />
      ) : (
        <div className={`min-h-32 rounded-lg border border-gray-200 p-4`}>
          <p className="font-semibold text-gray-700">Printing Preferences</p>
          <form
            onSubmit={handleAddItem}
            className="mt-4 flex flex-col gap-6 w-full text-gray-700"
          >
            {/* --------------🔥🔥FILE COPIES COUNT🔥🔥------------------- */}
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
                defaultValue="1"
                required={true}
                className="w-full border border-gray-200 rounded-sm h-[40px] pl-2"
                onChange={handleInputChange}
              />
            </div>

            {/* --------------🔥🔥PAPER SIZE🔥🔥------------------- */}
            <div className="grid w-full items-center gap-2">
              <label
                className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
                htmlFor="paperSize"
              >
                Paper Size:
              </label>
              <RadioGroup
                name="paperSize"
                defaultValue="A4"
                value={uploadedFileInfo.paperSize || "A4"}
                onValueChange={handlePaperSizeChange}
              >
                <div className={`grid grid-cols-2 gap-4`}>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                    <RadioGroupItem value="A4" id="A4" />
                    <label
                      className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor="A4"
                    >
                      A4
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                    <RadioGroupItem value="A3" id="A3" />
                    <label
                      className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor="A3"
                    >
                      A3
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* --------------------🔥🔥PRINT TYPE🔥🔥---------------------- */}
            <div className="grid w-full items-center gap-2">
              <label
                className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
                htmlFor="printType"
              >
                Print Type:
              </label>
              <RadioGroup
                name="printType"
                value={uploadedFileInfo.printType || ""}
                onValueChange={handlePrintTypeChange}
              >
                <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>
                  {availablePrintTypes.map((printType, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer"
                    >
                      <RadioGroupItem value={printType} id={printType} />
                      <label
                        className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
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

            {/* --------------------🔥🔥MIXED PRINT TYPE🔥🔥--------------------- */}
            {uploadedFileInfo?.printType === "mixed" && (
              <div className="grid w-full items-center gap-2">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
                  htmlFor="paperSize"
                >
                  PRINT TYPE FOR COLOR PAGES
                </label>
                <RadioGroup
                  name="paperSize"
                  defaultValue="simple_color"
                  value={uploadedFileInfo.mixedPrintType}
                  onValueChange={(value) => {
                    setUploadedFileInfo((prevInfo) => ({
                      ...prevInfo,
                      mixedPrintType: value,
                    }));
                  }}
                >
                  <div className={`grid grid-cols-2 gap-4`}>
                    <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                      <RadioGroupItem
                        value="simple_color"
                        id="mixed_simple_color"
                      />
                      <label
                        className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                        htmlFor="mixed_simple_color"
                      >
                        SIMPLE COLOR
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                      <RadioGroupItem
                        value="digital_color"
                        id="mixed_digital_color"
                      />
                      <label
                        className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                        htmlFor="mixed_digital_color"
                      >
                        DIGITAL COLOR
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* --------------------- 🔥🔥SELECT COLOR PAGES FOR MIXED PRINT🔥🔥 --------------------- */}
            {uploadedFileInfo?.printType === "mixed" && (
              <div className="grid w-full items-center gap-2">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
                  htmlFor="pageSelection"
                >
                  SELECT PAGES:
                </label>
                <Input
                  value={pageNumberInput}
                  type="text"
                  placeholder="Example: 1,2,3-10"
                  className="w-full"
                  onChange={handleColorPagesToPrintChange}
                />
                {errorForPageNumberInput && (
                  <p className="text-red-500 text-[12px]">
                    {errorForPageNumberInput}
                  </p>
                )}
                <section className="w-full flex items-center justify-start gap-4 mt-2 overflow-x-scroll pb-2 ">
                  {[...Array(uploadedFileInfo?.pageCount).keys()].map(
                    (pageNumber) => (
                      <button
                        type="button"
                        key={pageNumber}
                        onClick={() => {
                          if (
                            uploadedFileInfo?.colorPages.includes(
                              pageNumber + 1
                            )
                          ) {
                            handleColorPagesToPrintChange({
                              target: {
                                value: uploadedFileInfo?.colorPages
                                  .filter((page) => page != pageNumber + 1)
                                  .join(","),
                              },
                            });
                          } else {
                            handleColorPagesToPrintChange({
                              target: {
                                value: uploadedFileInfo?.colorPages
                                  .concat(pageNumber + 1)
                                  .join(","),
                              },
                            });
                          }
                        }}
                        className={`w-10 h-10 shrink-0 rounded-sm text-sm font-medium  shadow-md   transition-all duration-100 ${
                          uploadedFileInfo?.colorPages.includes(pageNumber + 1)
                            ? "border bg-indigo-200 border-indigo-400 text-indigo-500"
                            : "bg-gray-200 border border-black/[0.1] text-black "
                        } `}
                      >
                        {pageNumber + 1}
                      </button>
                    )
                  )}
                </section>
              </div>
            )}

            {/* --------------------🔥🔥PRINTING SIDES 🔥🔥--------------------- */}
            {availablePrintSides.length > 0 && (
              <div className="grid w-full items-center gap-2">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-medium"
                  htmlFor="printingSides"
                >
                  Printing Sides:
                </label>
                <RadioGroup
                  name="printingSides"
                  value={uploadedFileInfo.printSides || ""}
                  onValueChange={(value) =>
                    setUploadedFileInfo((prevInfo) => ({
                      ...prevInfo,
                      printSides: value,
                    }))
                  }
                >
                  <div className={`grid grid-cols-2 gap-4`}>
                    {availablePrintSides.includes("single_sided") && (
                      <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                        <RadioGroupItem
                          value="single_sided"
                          id="single_sided"
                        />
                        <label
                          className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                          htmlFor="single_sided"
                        >
                          Single Sided
                        </label>
                      </div>
                    )}
                    {availablePrintSides.includes("double_sided") && (
                      <div className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer">
                        <RadioGroupItem
                          value="double_sided"
                          id="double_sided"
                        />
                        <label
                          className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                          htmlFor="double_sided"
                        >
                          Double Sided
                        </label>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* ------------------🔥🔥MESSAGE FOR XEROX STORE🔥🔥--------------------- */}
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
                  className="w-full bg-white border rounded-md pl-2"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* ----------- 🔥🔥BUTTONS🔥🔥 ----------- */}
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Button
                onClick={handleAddItem}
                type="button"
                disabled={isLoading}
                className="w-full h-[40px] bg-indigo-500 hover:bg-indigo-600 text-white border border-gray-200 rounded-md"
              >
                {isLoading ? (
                  <ClipLoader color="white" size={16} />
                ) : (
                  <p>Upload more</p>
                )}
              </Button>

              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button
                    onClick={handleCheckout}
                    type="button"
                    disabled={isLoader}
                    className="w-full h-[40px] bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                  >
                    {isLoader ? (
                      <ClipLoader color="white" size={16} />
                    ) : (
                      "Checkout"
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-xl">Your Cart</SheetTitle>
                    <SheetDescription className="text-gray-600">
                      You have {items.length || 0} items in your cart
                    </SheetDescription>
                  </SheetHeader>
                  {xeroxStorePricing && (
                    <DokopiCartComponent
                      isCartOpen={isCartOpen}
                      setIsCartOpen={setIsCartOpen}
                      xeroxStorePricing={xeroxStorePricing}
                    />
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadedFileConfigurations;
