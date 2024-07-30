import { Separator } from "@/components/ui/separator";
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
    <article>
      <div className="flex items-center mb-4 justify-between pr-5">
        <div className="flex">
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
                dateTime="2014-08-16 19:00"
                className="block text-sm text-gray-500"
              >
                Reviewed on  {Month} {Year}
              </time>
            </p>
          </div>
        </div>
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
          {
            rating && rating > 0 && Array.from({ length: rating }).map((_, index) => (<IoMdStar className="w-6 h-6 text-yellow-400" aria-hidden="true" key={`ColoredStar${index}`} />))
          }
          {
            rating && rating > 0 && Array.from({ length: 5 - rating }).map((_, index) => (<IoMdStar className="w-6 h-6 text-black/[0.25]" aria-hidden="true" key={`UnColoredStar${index}`} />))
          }
        </div>
      </div>


      <p className="text-gray-600 text-sm">
        {comment && comment}
      </p>
      <Separator className="mt-3" />
    </article>
  );
};

export default Review;
