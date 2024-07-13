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

const PricingTable = ({ storeData }) => {
  const { pricing } = storeData;
  if (!pricing)
    return (
      <div className=" flex flex-col text-gray-500 gap-1 overflow-hidden">
        <div className="text-sm text-gray-500 font-medium">
          No pricing data found
        </div>
      </div>
    );
  return (
    <div className="">
      <div className=" flex flex-col text-gray-500 gap-1 overflow-hidden">
        {pricing?.priceList.length > 0 && (
          <Table className="min-w-full divide-y mt-2  divide-gray-200 ">
            <TableHeader className="bg-gray-50">
              <TableRow>
                {HeaderOptions.map((option, index) => (
                  <TableHead
                    key={index}
                    scope="col"
                    className=" whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {option.heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {pricing.priceList.map((price, index) => (
                <React.Fragment key={index}>
                  {price.conditionsList.map((condition, subIndex) => (
                    <TableRow key={`${index}-${subIndex}`}>
                      <TableCell className="text-left whitespace-nowrap text-xs font-medium text-gray-500  tracking-wider">
                        {price.paperSize}
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap text-sm capitalize text-gray-500  tracking-wider">
                        {price.printingSides.split("_").join(" ")}
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap text-sm capitalize  text-gray-500  tracking-wider">
                        {price.printType.split("_").join(" ")}
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap text-sm  text-gray-500  tracking-wider">
                        ₹{price.basePrice}
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap text-sm  text-gray-500  tracking-wider">
                        {condition.conditionValue}
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap text-sm  text-gray-500  tracking-wider">
                        ₹{condition.conditionPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}

        {/* ------black and white----- */}
      </div>
    </div>
  );
};

export default PricingTable;
