"use client";
import React from "react";

const PageNumberSelector = ({ pageCount, colorPages = 0 }) => {
  if (!pageCount || pageCount < 1 || colorPages===null || colorPages === 0) return null;
  return (
    <section className="w-full flex items-center justify-start gap-4 mt-2 overflow-x-scroll pb-2 ">
      {[...Array(pageCount).keys()].map((pageNumber) => (
        <button
          key={pageNumber}
          className={`w-10 h-10 shrink-0 rounded-sm text-sm font-medium ${
            colorPages.includes(pageNumber + 1)
              ? "bg-blue-200 text-blue-500 border border-blue-500"
              : "bg-gray-200 text-black border border-black"
          } hover:bg-blue-200 hover:text-blue-500 hover:border-blue-500 transition-all duration-100 text-black `}
        >
          {pageNumber + 1}
        </button>
      ))}
    </section>
  );
};

export default PageNumberSelector;
