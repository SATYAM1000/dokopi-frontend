import Image from "next/image";
import React from "react";
import { IoMdStar } from "react-icons/io";

const Review = () => {
  return (
    <article className="border-b-2 border-gray-300/[0.5] pb-4">
      <div className="flex items-center mb-4">
        <Image
          className="w-10 h-10 me-4 rounded-full"
          src="/main/user-placeholder.jpg"
          alt=""
          width={40}
          height={40}
          priority
        />
        <div className="font-medium dark:text-white">
          <p>
            Jese Leos{" "}
            <time
              datetime="2014-08-16 19:00"
              className="block text-sm text-gray-500"
            >
              Reviewed on August 2014
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <IoMdStar className="w-5 h-5 text-yellow-300" aria-hidden="true" />
        <IoMdStar className="w-5 h-5 text-yellow-300" aria-hidden="true" />

        <IoMdStar className="w-5 h-5 text-yellow-300" aria-hidden="true" />

        <IoMdStar className="w-5 h-5 text-yellow-300" aria-hidden="true" />
        <IoMdStar className="w-5 h-5 text-yellow-300" aria-hidden="true" />
      </div>

      <p className="mb-2 text-gray-600">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time.
      </p>
    </article>
  );
};

export default Review;
