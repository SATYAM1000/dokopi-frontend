import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "XeroxStore",
      required: true,
    },
    cartItems: [
      {
        fileId: { type: String, required: true, unique: true },
        fileKey: { type: String, required: true },
        fileName: { type: String, required: true },
        fileSize: { type: String, required: true },
        fileExtension: { type: String, required: true },
        pageCount: { type: Number, required: true },
        iconPath: { type: String, default: "/files-icon/other.svg" },
        copiesCount: { type: Number, default: 1 },
        xeroxStoreMessage: { type: String },
        paperSize: {
          type: String,
          enum: ["A4", "A3", "A2", "A1", "A0"],
          default: "A4",
        },
        printType: {
          type: String,
          enum: ["black_and_white", "simple_color", "digital_color", "mixed"],
        },
        printSides: { type: String, enum: ["single_sided", "double_sided"] },
        colorPages: { type: Array },
        mixedPrintType: {
          type: String,
          enum: ["simple_color", "digital_color"],
        },
      },
    ],
    phonePeMerchantUserId: {
      type: String,
      required: true,
    },
    phonePeTransactionId: {
      type: String,
      unqiue: true,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    platformFee: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: [
        "incomplete",
        "pending",
        "processing",
        "printed",
        "delivered",
        "rejected",
      ],
      default: "incomplete",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    isOrderActive: {
      type: Boolean,
      default: false,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    isOrderViewedByMerchant: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);
