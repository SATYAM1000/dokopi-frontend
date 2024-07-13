"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API_DOMAIN } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "@/providers/redux/slices/new-cart-slice";
import { useCurrentUser } from "@/hooks/use-current-user";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    fetchXeroxStorePricing();
  }, []);

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

        toast.success("File added to cart");
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
      const response = await axios.get(
        `${API_DOMAIN}/api/v1/store/pricing/get/${localStorage.getItem(
          "storeId"
        )}`
      );

      if (response.data.success) {
        setXeroxStorePricing(response.data.data.priceList);
      }
    } catch (error) {
      console.log("Error fetching store pricing:", error);
    }
  };

  const getUniquePrintTypes = (list) => {
    const seen = new Set();
    return list.filter((item) => {
      const duplicate = seen.has(item.printType);
      seen.add(item.printType);
      return !duplicate;
    });
  };

  const uniquePriceList = getUniquePrintTypes(xeroxStorePricing);
  uniquePriceList.push({
    printType: "mixed",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUploadedFileInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handlePrintTypeChange = (value) => {
    setUploadedFileInfo((prevInfo) => ({
      ...prevInfo,
      printType: value,
    }));

    if (value === "mixed") {
      setAvailablePrintSides(["single_sided", "double_sided"]);
    } else {
      const sides = xeroxStorePricing
        .filter((price) => price.printType === value)
        .map((price) => price.printingSides);
      setAvailablePrintSides([...new Set(sides)]);
    }
  };

  return (
    <>
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
              onValueChange={(value) =>
                setUploadedFileInfo((prevInfo) => ({
                  ...prevInfo,
                  paperSize: value,
                }))
              }
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
              defaultValue="black_and_white"
              onValueChange={handlePrintTypeChange}
            >
              <div className={`grid grid-cols-2 gap-4`}>
                {uniquePriceList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white border border-gray-200 h-[40px] rounded-md pl-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={item.printType}
                      id={item.printType}
                    />
                    <label
                      className="uppercase w-full h-full flex items-center tracking-wide text-gray-500 text-xs font-medium"
                      htmlFor={item.printType}
                    >
                      {item.printType === "black_and_white" && "B/W"}
                      {item.printType === "simple_color" && "Simple Color"}
                      {item.printType === "digital_color" && "Digital Color"}
                      {item.printType === "mixed" && "Mixed"}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

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
                defaultValue="single_sided"
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
                      <RadioGroupItem value="single_sided" id="single_sided" />
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
                      <RadioGroupItem value="double_sided" id="double_sided" />
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
    </>
  );
};

export default UploadedFileConfigurations;
