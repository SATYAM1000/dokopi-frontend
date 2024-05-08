import Wrapper from "@/components/user/Wrapper";
import { Heart, Trash } from "lucide-react";
import React from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "DSBDA Mini project.pdf",
    href: "#",
    price: "₹44.00",
    originalPrice: "₹50.00",
    discount: "5% Off",
    color: "Color Print",
    size: "30 Pages",
    imageSrc: "/file-icons/pdf.svg",
  },
  {
    id: 2,
    name: "DSBDA Mini project.pdf",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "Black & White",
    leadTime: "3-4 weeks",
    size: "10 Pages",
    imageSrc: "/file-icons/pdf.svg",
  },
  {
    id: 3,
    name: "SCOE INdex Page",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    imageSrc:
    "/test/product.webp",
  },
];

const cartPage = () => {
  return (
    <section className="w-full">
      <Wrapper className={"w-full"}>
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product, productIdx) => (
                    <div key={product.id} className="">
                      <li className="flex py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <Image
                            width={400}
                            height={400}
                            src={product.imageSrc}
                            alt={product.name}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={product.href}
                                    className="font-semibold text-black"
                                  >
                                    {product.name}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-sm text-gray-500">
                                  {product.color}
                                </p>
                                {product.size ? (
                                  <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null}
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-xs font-medium text-gray-500 line-through">
                                  {product.originalPrice}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  &nbsp;&nbsp;{product.price}
                                </p>
                                &nbsp;&nbsp;
                                <p className="text-sm font-medium text-green-500">
                                  {product.discount}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button type="button" className="h-7 w-7">
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-1 h-7 w-9 rounded-md border text-center"
                            defaultValue={1}
                          />
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                          >
                            <Trash size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Price (3 item)</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ 52,398
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        - ₹ 3,431
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ 48,967
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    You will save ₹ 3,431 on this order
                  </div>
                  <div className="px-2 pb-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white button-text flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 px-8 py-3 text-xs sm:text-sm"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default cartPage;
