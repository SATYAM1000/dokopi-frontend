"use client";
import Wrapper from "@/components/user/global/Wrapper";
import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <Wrapper>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Return and Refund Policy</h1>
        <p className="mb-2">
          <strong>Last updated: 2 JUNE 2024</strong>
        </p>

        <p className="mb-4">
          Welcome to DoKopi. We are committed to providing you with a seamless
          printing experience. Please read our return and refund policy
          carefully to understand your rights and obligations.
        </p>

        <h2 className="text-xl font-bold mb-2">
          Cancellation and Refund Policy
        </h2>
        <ol className="list-decimal ml-6 mb-4">
          <li className="mb-2">
            <strong>Order Cancellation:</strong>
            <ul className="list-disc ml-6">
              <li>
                Users can cancel their order within 1 minute of placing it.
              </li>
              <li>
                Orders cancelled within this time frame will be fully
                refundable.
              </li>
              <li>
                Orders cannot be cancelled after the documents have been
                printed.
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Refund Policy:</strong>
            <ul className="list-disc ml-6">
              <li>
                If an order is cancelled within the 1-minute window, the full
                amount will be refunded.
              </li>
              <li>
                Refunds will be credited back to the original payment method
                within 48 hours.
              </li>
              <li>
                If documents are printed before a refund request is made, the
                amount will be non-refundable.
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="text-xl font-bold mb-2">Shipping and Delivery Policy</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>We do not provide shipping and delivery services.</li>
          <li>
            Users must visit the selected Xerox store to receive their printed
            documents.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Important Information</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Accuracy of Information:</strong> Users are responsible for
            ensuring that the uploaded documents and print specifications are
            accurate. DoKopi is not responsible for any errors in the provided
            files or instructions.
          </li>
          <li>
            <strong>Print Quality:</strong> We strive to ensure high-quality
            printing. If there are any issues with the print quality due to our
            fault, please contact the store directly for assistance.
          </li>
          <li>
            <strong>Contact for Support:</strong> For any issues or concerns
            regarding orders, please contact us promptly.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="mb-2">
          If you have any questions about our Return and Refund Policy or
          require support, please contact us:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:dokopi.business@gmail.com"
              className="text-blue-500"
            >
              dokopi.business@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> +91-8789373766
          </li>
        </ul>

        <p>
          Thank you for choosing DoKopi. We appreciate your business and are
          here to ensure your satisfaction.
        </p>
      </div>
    </Wrapper>
  );
};

export default ReturnRefundPolicy;
