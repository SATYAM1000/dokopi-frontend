// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { toast } from "sonner";

// const DoKopiStoreShop = () => {
//   const [loading, setLoading] = useState(false);
//   const onClickHandler = () => {
//     toast.info("This functionality is not available yet");
//   };

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 200);
//   }, []);
//   return (
//     <section className="w-full mt-6 min-h-[calc(100vh-250px)]">
//       <div
//         className={`${
//           loading
//             ? "grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-8"
//             : "w-full h-auto flex items-center justify-center"
//         }`}
//       >
//         {loading ? (
//           Array(10)
//             .fill(0)
//             .map((_, index) => (
//               <div
//                 key={index}
//                 className="w-full h-[250px] bg-gray-300 rounded-xl animate-pulse"
//               />
//             ))
//         ) : (
//           <div className="w-[100%] h-auto flex items-center justify-center">
//             <div className="flex flex-col items-center justify-center w-full h-auto mt-12 ">
//               <Image
//                 src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
//                 width={200}
//                 height={200}
//                 alt="No orders"
//               />
//               <p className="mt-8 text-[#6B7280] text-center">
//                 This store hasn't added any products yet. Check back soon!
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default DoKopiStoreShop;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const DoKopiStoreShop = () => {
  const [loading, setLoading] = useState(false);
  const onClickHandler = () => {
    toast.info("This functionality is not available yet");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <section className="w-full mt-6 min-h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
        {loading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[250px] bg-gray-300 rounded-xl animate-pulse"
                />
              ))
          : Array(2)
              .fill(0)
              .map((_, index) => (
                <section
                  key={index}
                  className="transition-all duration-100 border border-indigo-200 rounded-xl hover:border-gray-300"
                >
                  <div className="relative flex flex-col justify-between px-2 py-2 overflow-hidden ">
                    <div className="overflow-hidden h-[140px] border-b border-indigo-200 hover:border-indigo-300">
                      <Image
                        src={
                          index === 0
                            ? "/main/files.jpg"
                            : "/main/notebooks.jpg"
                        }
                        alt="store"
                        width={350}
                        height={350}
                        className="object-cover object-center w-full h-full transition duration-700 rounded-lg animate-blurred-fade-in hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between w-full">
                        <h5 className="text-[15px] font-medium mt-3 text-gray-700 ">
                          {index === 0 ? "Project Files" : "Notebooks"}
                        </h5>
                      </div>

                      <div className="flex flex-col w-full ">
                        <p className="text-[13px] font-medium mt-1">
                          <del className="text-[13px] font-medium text-gray-400">
                            ₹ 1,000
                          </del>
                          <span className="text-[13px] font-medium ml-2 text-gray-700">
                            ₹ {index === 0 ? "25.00" : "40.00"}
                          </span>
                        </p>
                        <button
                          onClick={onClickHandler}
                          className={` w-full mt-2 font-medium py-0.5 px-3 rounded-sm bg-indigo-500 hover:bg-indigo-600 text-white  border border-gray-200 flex items-center justify-center gap-2.5`}
                        >
                          <p>Add</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
      </div>
    </section>
  );
};

export default DoKopiStoreShop;
