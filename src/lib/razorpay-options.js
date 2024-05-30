import { API_DOMAIN } from "./constants";
export const razorpayOptions = (key, order, amount, currentUser, dispatch, ) => {
  return {
    key: key, // Enter the Key ID generated from the Dashboard
    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Dokopi",
    description: "Print with ease. Anywhere. Anytime.",
    image: "https://avatars.githubusercontent.com/u/104556262?v=4",
    order_id: order.id,
    callback_url: `${API_DOMAIN}/api/v1/user/payment/verify`,
    prefill: {
      name: currentUser?.name,
      email: currentUser?.email,
    },

    theme: {
      color: "#3399cc",
    },
    handler: function (response) {
      dispatch(clearCart());
      toast.success("Payment successful!");
      redirect("/payment/success?reference=" + response.razorpay_payment_id);
    },
  };
};
