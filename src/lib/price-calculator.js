export const calculateTotalPrice = (cartItems, storePrices) => {
  let totalCharge = 0;
  let platformChargeForThisOrder = 0;

  if (!cartItems || !storePrices) return { totalCharge: 0, platformChargeForThisOrder: 0 };

  cartItems.forEach((item) => {
    const pageCount = item.filePageCount; // document pages count
    const copiesCount = item.fileCopiesCount; // number of prints
    const colorType = item.fileColorType; // print type
    const printMode = item.filePrintMode; // print side: single sided or double sided

    let pricePerPage = 0;

    if (colorType === "black and white") {
      pricePerPage = printMode === "simplex" ? storePrices.simplexBlackAndWhite : storePrices.duplexBlackAndWhite;
    } else if (colorType === "color") {
      pricePerPage = printMode === "simplex" ? storePrices.simplexColor : storePrices.duplexColor;
    } else if (colorType === "mixed") {
      const colorPages = item.fileColorPagesToPrint ? item.fileColorPagesToPrint.length : 0;
      const bwPages = pageCount - colorPages;

      const simplexBWPrice = bwPages * storePrices.simplexBlackAndWhite;
      const simplexColorPrice = colorPages * storePrices.simplexColor;
      const duplexBWPrice = bwPages * storePrices.duplexBlackAndWhite;
      const duplexColorPrice = colorPages * storePrices.duplexColor;

      const mixedTotalPrice = printMode === "simplex" ? simplexBWPrice + simplexColorPrice : duplexBWPrice + duplexColorPrice;

      totalCharge += mixedTotalPrice;

      const platformChargesForMixed = Math.ceil(mixedTotalPrice / 5) * 0.75;
      platformChargeForThisOrder += platformChargesForMixed;
    }

    const documentPrice = pricePerPage * pageCount * copiesCount;
    totalCharge += documentPrice;

    const platformCharges = Math.ceil(documentPrice / 5) * 0.75;
    platformChargeForThisOrder += platformCharges;

    if (item.additionalServices) {
      const services = item.additionalServices.split(",").map((service) => service.trim());
      services.forEach((service) => {
        if (storePrices[service]) {
          totalCharge += storePrices[service];
        }
      });
    }
  });

  return {
    totalCharge: Math.ceil(totalCharge),
    platformChargeForThisOrder: Math.ceil(platformChargeForThisOrder)
  };
};
