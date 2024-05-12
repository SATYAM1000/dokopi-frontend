"use client";
import Wrapper from "@/components/user/Wrapper";
import { Trash } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromCart,
  increaseQuantity,
} from "@/providers/redux/reducers/cart-slice";
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
    imageSrc: "/test/product.webp",
  },
];

const cartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items);
  console.log("cart items", cartItems);

  const handleDeleteFromCart = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  return (
    <section className="w-full">
      <Wrapper className={"w-full"}>
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl py-4 lg:max-w-7xl">
            <h1 className="text-[24px] font-medium  tracking-tight text-gray-900 sm:text-2xl">
              Document Upload Summary{" "}
            </h1>
            <form className="mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems?.map((item) => (
                    <li key={item?.id} className="flex py-6 sm:py-6 ">
                      {/* Your existing JSX code for displaying cart items */}
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button
                            type="button"
                            className="h-7 w-7"
                            onClick={() => handleDeleteFromCart(item?.id)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-1 h-7 w-9 rounded-md border text-center"
                            defaultValue={item?.quantity}
                          />
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => handleIncreaseQuantity(item?.id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                            onClick={() => handleDeleteFromCart(item?.id)}
                          >
                            <Trash size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </li>
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
                  Price Summary
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between font-medium">
                      <dt className="text-sm text-gray-800">Price (3 item)</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ 52.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center font-medium text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        - ₹ 5.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ 47.00
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-600">
                    You will save ₹ 5.00 on this order
                  </div>
                  <div className="px-2 pb-4">
                    <button
                      type="submit"
                      className="w-full bg-primary font-medium text-white button-text flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 px-8 py-3 text-xs sm:text-sm"
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
