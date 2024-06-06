"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DokopiCartComponent from "../../cart/DokopiCartComponent";
import { useSelector } from "react-redux";

const PrintConfig = ({
  fileInfo,
  setFileInfo,
  shake,
  onFinalSubmit,
  handleColorPagesToPrintChange,
  error,
  pageNumberInput,
}) => {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <div
        className={`min-h-32 rounded-lg  border border-gray-400  p-4 ${
          shake && "animate-shake"
        }`}
      >
        <p className="font-semibold text-gray-700 ">Printing Preferences</p>
        <form
          className="mt-4 flex flex-col gap-4 w-full text-gray-700 "
          onSubmit={onFinalSubmit}
        >
          {/* -------------- COPIES COUNT------------------- */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fileCopiesCount">Number of Copies</Label>
            <Input
              id="fileCopiesCount"
              type="number"
              placeholder="Enter number of copies"
              min="1"
              defaultValue="1"
              required={true}
              className="w-full"
              onChange={(e) =>
                setFileInfo((prev) => ({
                  ...prev,
                  fileCopiesCount: e.target.value,
                }))
              }
            />
          </div>
          {/* --------------------fileColorType----------------------      */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fileColorType">Printing Type</Label>
            <RadioGroup
              id="fileColorType"
              defaultValue="black and white"
              value={fileInfo?.fileColorType}
              onValueChange={(value) =>
                setFileInfo((prev) => ({
                  ...prev,
                  fileColorType: value,
                }))
              }
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  type="button"
                  className="flex items-center space-x-2 bg-white border h-[40px] rounded-md pl-2 cursor-pointer"
                >
                  <RadioGroupItem
                    value="black and white"
                    id="black_and_white"
                  />
                  <Label
                    htmlFor="black_and_white"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Black & White
                  </Label>
                </div>

                <div
                  type="button"
                  className="flex items-center space-x-2 h-[40px] bg-white border rounded-md pl-2 cursor-pointer"
                >
                  <RadioGroupItem value="color" id="color" />
                  <Label
                    htmlFor="color"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Color
                  </Label>
                </div>

                <div
                  type="button"
                  className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 cursor-pointer"
                >
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label
                    htmlFor="mixed"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Mixed
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {fileInfo?.fileColorType === "mixed" && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="fileColorPagesToPrint">
                Color Pages Selection
              </Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="fileColorPagesToPrint"
                  type="text"
                  placeholder="Example: 1,2,3-10"
                  className="w-full"
                  onChange={handleColorPagesToPrintChange}
                  value={pageNumberInput}
                />
                {error && <p className="text-red-500 text-[12px]">{error}</p>}
              </div>
            </div>
          )}
          {fileInfo?.fileColorType === "mixed" && fileInfo?.filePageCount && (
            <section className="w-full flex items-center justify-start gap-4 mt-2 overflow-x-scroll pb-2 ">
              {[...Array(fileInfo?.filePageCount).keys()].map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => {
                    if (
                      fileInfo?.fileColorPagesToPrint.includes(pageNumber + 1)
                    ) {
                      handleColorPagesToPrintChange({
                        target: {
                          value: fileInfo?.fileColorPagesToPrint
                            .filter((page) => page != pageNumber + 1)
                            .join(","),
                        },
                      });
                    } else {
                      handleColorPagesToPrintChange({
                        target: {
                          value: fileInfo?.fileColorPagesToPrint
                            .concat(pageNumber + 1)
                            .join(","),
                        },
                      });
                    }
                  }}
                  className={`w-10 h-10 shrink-0 rounded-sm text-sm font-medium  shadow-md   transition-all duration-100 ${
                    fileInfo?.fileColorPagesToPrint.includes(pageNumber + 1)
                      ? "border bg-blue-200 border-blue-400 text-blue-500"
                      : "bg-gray-200 border border-black/[0.1] text-black "
                  } `}
                >
                  {pageNumber + 1}
                </button>
              ))}
            </section>
          )}

          {/* ------------------filePrintMode--------------------- */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="copies_count">Print Sides</Label>
            <RadioGroup
              defaultValue="duplex"
              value={fileInfo?.filePrintMode}
              onValueChange={(value) =>
                setFileInfo((prev) => ({
                  ...prev,
                  filePrintMode: value,
                }))
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 ">
                  <RadioGroupItem value="simplex" id="simplex" />
                  <Label
                    htmlFor="simplex"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Single Sided
                  </Label>
                </div>
                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 ">
                  <RadioGroupItem value="duplex" id="duplex" />
                  <Label
                    htmlFor="duplex"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Double Sided
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          {/* ----------------filePaperType--------------------- */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="filePaperType">Paper Type</Label>
            <RadioGroup
              defaultValue="A4"
              value={fileInfo?.filePaperType}
              onValueChange={(value) =>
                setFileInfo((prev) => ({
                  ...prev,
                  filePaperType: value,
                }))
              }
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                  <RadioGroupItem value="A4" id="A4" />
                  <Label
                    htmlFor="A4"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    A4
                  </Label>
                </div>

                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                  <RadioGroupItem value="A3" id="A3" />
                  <Label
                    htmlFor="A3"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    A3
                  </Label>
                </div>
                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2 ">
                  <RadioGroupItem value="Letter" id="Letter" />
                  <Label
                    htmlFor="Letter"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Letter
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* -------------------additionalServices--------------------- */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="additionalServices">Additional Services</Label>
            <RadioGroup
              value={fileInfo?.additionalServices}
              onValueChange={(value) =>
                setFileInfo((prev) => ({
                  ...prev,
                  additionalServices: value,
                }))
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                  <RadioGroupItem value="binding" id="binding" />
                  <Label
                    htmlFor="binding"
                    className="w-full flex items-center justify-start  h-full"
                  >
                    Binding
                  </Label>
                </div>
                <div className="flex h-[40px] items-center space-x-2 bg-white border  rounded-md pl-2">
                  <RadioGroupItem value="taping" id="taping" />
                  <Label
                    htmlFor="taping"
                    className=" w-full flex items-center justify-start  h-full"
                  >
                    Taping
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="messageForXeroxStore">Message</Label>
            <Textarea
              placeholder="Type your message here."
              value={fileInfo?.messageForXeroxStore}
              onChange={(e) =>
                setFileInfo((prev) => ({
                  ...prev,
                  messageForXeroxStore: e.target.value,
                }))
              }
            />
          </div>

          <div
            className="w-full grid grid-cols-2 
                      items-center gap-4
                      "
          >
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800"
            >
              Upload more
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button type="submit" className="w-full  bg-blue-600 hover:bg-blue-800 ">
                  Checkout
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-xl">Your Cart</SheetTitle>
                  <SheetDescription className="text-gray-600">
                    You have {cartItems.length} items in your cart
                  </SheetDescription>
                </SheetHeader>
                <DokopiCartComponent setOpen={setOpen} />
              </SheetContent>
            </Sheet>
          </div>
        </form>
      </div>
    </>
  );
};
export default PrintConfig;
