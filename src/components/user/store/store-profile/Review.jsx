import { KnownMonth } from "@/lib/constants";
import Image from "next/image";
import React from "react";
import { IoMdStar } from "react-icons/io";

const Review = ({ OneReview }) => {
  const { rating, createdAt, comment, userId } = OneReview
  
  const { image, name } = userId
  const Month = KnownMonth[new Date(createdAt).getMonth()]
  const Year = new Date(createdAt).getFullYear()
  return (
    <article className="border-b-2 border-gray-300/[0.5] pb-4 ">
      <div className="flex items-center mb-4">
        <Image
          className="w-10 h-10 me-4 rounded-full"
          src={image}
          alt=""
          width={40}
          height={40}
          priority
        />
        <div className="font-medium dark:text-white">
          <p>
            {name}
            <time
              datetime="2014-08-16 19:00"
              className="block text-sm text-gray-500"
            >
              Reviewed on  {Month} {Year}
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        {
          rating && rating > 0 && Array.from({ length: rating }).map((_, index) => (<IoMdStar className="w-5 h-5 text-yellow-300" aria-hidden="true" key={index} />))
        }
      </div>

      <p className="mb-2 text-gray-600">
        {comment && comment}
      </p>
    </article>
  );
};

export default Review;
