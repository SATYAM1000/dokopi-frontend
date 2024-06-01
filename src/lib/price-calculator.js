export const calculateTotalPrice = (cartItems, storePrices) => {
    let totalPrice = 0;
    console.log("cartItems ", cartItems);
    console.log("storePrices ", storePrices);
  
    cartItems.forEach(item => {
      const pageCount = item.filePageCount;
      const copiesCount = item.fileCopiesCount;
      const colorType = item.fileColorType;
      const printMode = item.filePrintMode;
  
      let pricePerPage = 0;
  
      if (colorType === "black and white") {
        pricePerPage = (printMode === "simplex") 
          ? storePrices.simplexBlackAndWhite 
          : storePrices.duplexBlackAndWhite;
      } else if (colorType === "color") {
        pricePerPage = (printMode === "simplex") 
          ? storePrices.simplexColor 
          : storePrices.duplexColor;
      } else if (colorType === "mixed") {
        const colorPages = item.fileColorPagesToPrint.length;
        const bwPages = pageCount - colorPages;
  
        const simplexBWPrice = bwPages * storePrices.simplexBlackAndWhite;
        const simplexColorPrice = colorPages * storePrices.simplexColor;
        const duplexBWPrice = bwPages * storePrices.duplexBlackAndWhite;
        const duplexColorPrice = colorPages * storePrices.duplexColor;
  
        pricePerPage = (printMode === "simplex")
          ? simplexBWPrice + simplexColorPrice
          : duplexBWPrice + duplexColorPrice;
      }
  
      const documentPrice = pricePerPage * pageCount * copiesCount;
      totalPrice += documentPrice;
  
      const platformCharges = Math.ceil(pageCount * copiesCount / 5) * 1;
      totalPrice += platformCharges;
  
      if (item.additionalServices) {
        const services = item.additionalServices.split(',').map(service => service.trim());
        services.forEach(service => {
          if (storePrices[service]) {
            totalPrice += storePrices[service];
          }
        });
      }
    });
  
    return totalPrice;
  };
  