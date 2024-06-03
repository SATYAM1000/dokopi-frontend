export const calculateTotalPrice = (cartItems, storePrices) => {
  let totalPrice = 0;
  if (!cartItems || !storePrices) return 0;

  console.log("store prices are ", storePrices);
  console.log("cart items are ", cartItems);

  cartItems.forEach((item) => {
    const pageCount = item.filePageCount;
    console.log("doc page count is ", pageCount);
    const copiesCount = item.fileCopiesCount;
    console.log("copies count is ", copiesCount);
    const colorType = item.fileColorType;
    console.log("file color type is ", colorType);
    const printMode = item.filePrintMode;
    console.log("file print mode is ", printMode);

    let pricePerPage = 0;
    if (colorType === "black and white") {
      pricePerPage =
        printMode === "simplex"
          ? storePrices.simplexBlackAndWhite
          : storePrices.duplexBlackAndWhite;
      console.log("price per page is ", pricePerPage);
    } else if (colorType === "color") {
      pricePerPage =
        printMode === "simplex"
          ? storePrices.simplexColor
          : storePrices.duplexColor;
    } else if (colorType === "mixed") {
      console.log("file color pages to print are ", item.fileColorPagesToPrint);
      console.log("page count is ", pageCount);
      const colorPages = item.fileColorPagesToPrint.length;
      const bwPages = pageCount - colorPages;

      console.log("color pages to print ", colorPages);
      console.log("bw pages to print ", bwPages);

      const simplexBWPrice = bwPages * storePrices.simplexBlackAndWhite;
      console.log("simplex bw price is ", simplexBWPrice);
      const simplexColorPrice = colorPages * storePrices.simplexColor;
      console.log("simplex color price is ", simplexColorPrice);
      const duplexBWPrice = bwPages * storePrices.duplexBlackAndWhite;
      console.log("duplex bw price is ", duplexBWPrice);
      const duplexColorPrice = colorPages * storePrices.duplexColor;
      console.log("duplex color price is ", duplexColorPrice);

      pricePerPage =
        printMode === "simplex"
          ? simplexBWPrice + simplexColorPrice
          : duplexBWPrice + duplexColorPrice;

      console.log("price per page is ", pricePerPage);
    }

    const documentPrice = pricePerPage * pageCount * copiesCount;
    console.log("document price is ", documentPrice);
    totalPrice += documentPrice;
    console.log("total price is ", totalPrice);

    // Add platform charges

    const platformCharges = Math.ceil(documentPrice / 5) * 1.5;
    console.log("platform charges are ", platformCharges);
    totalPrice += platformCharges;
    console.log("total price is ", totalPrice);

    if (item.additionalServices) {
      const services = item.additionalServices
        .split(",")
        .map((service) => service.trim());
      services.forEach((service) => {
        if (storePrices[service]) {
          totalPrice += storePrices[service];
        }
      });
    }
  });

  return Math.round(totalPrice);
};
