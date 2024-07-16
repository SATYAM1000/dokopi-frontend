"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HeaderOptions = [
  {
    index: 1,
    heading: "Paper",
  },

  {
    index: 2,
    heading: "Sides",
  },
  {
    index: 3,
    heading: "Type",
  },

  {
    index: 4,
    heading: "Price (₹)",
  },

  {
    index: 5,
    heading: "On Pages(>=)",
  },
  {
    index: 6,
    heading: "New Price",
  },
];

const PricingTable = ({ prices }) => {
  if (!prices)
    return (
      <div className=" flex flex-col text-gray-500 gap-1 overflow-hidden">
        <div className="text-sm text-gray-500 font-medium">
          No pricing data found
        </div>
      </div>
    );
  const formatted = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }
  return (
    <div className="">
      <div className=" flex flex-col text-gray-500 gap-1 overflow-hidden">
        {prices?.length > 0 && (
          <Table className="min-w-full divide-y mt-2  divide-gray-200 ">
            <TableHeader className="bg-gray-50">
              <TableRow>
                {HeaderOptions.map((option, index) => (
                  <TableHead
                    key={index}
                    scope="col"
                    className=" whitespace-nowrap text-left text-xs font-black text-gray-500 uppercase tracking-wider"
                  >
                    {option.heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">

              {
                prices?.map((PriceForPageList) => {
                  return (
                    PriceForPageList?.PriceList?.map((price, index) => {
                      const basePrice = formatted(price?.basePrice);
                      return (
                        <React.Fragment key={Math.random()}>
                          {
                            price?.conditionsList?.map((conditionPriceList) => {
                              const conditionalPrice = formatted(conditionPriceList?.conditionPrice);
                              return (
                                <TableRow key={`condiotonalPrices${index * Math.random()}`}>
                                  <TableCell className="text-left whitespace-nowrap text-xs font-medium text-gray-500  tracking-wider">
                                    {price?.paperSize}
                                  </TableCell>
                                  <TableCell className="text-left whitespace-nowrap text-sm capitalize text-gray-500  tracking-wider">
                                    {price?.printingSides.split("_").join(" ")}
                                  </TableCell>
                                  <TableCell className="text-left whitespace-nowrap text-sm capitalize  text-gray-500  tracking-wider">
                                    {price?.printType.split("_").join(" ")}
                                  </TableCell>
                                  <TableCell className="text-left whitespace-nowrap text-sm  text-gray-500  tracking-wider">
                                    {basePrice}
                                  </TableCell>
                                  <TableCell className="text-left whitespace-nowrap text-sm  text-gray-500  tracking-wider">
                                    {conditionPriceList?.conditionValue}
                                  </TableCell>
                                  <TableCell className="text-left whitespace-nowrap text-sm  text-gray-500  tracking-wider">
                                    {conditionalPrice}
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          }
                        </React.Fragment>
                      )

                    })
                  )
                })
              }
            </TableBody>
          </Table>
        )}

        {/* ------black and white----- */}
      </div>
    </div>
  );
};

export default PricingTable;
