export const calculateTotalPrice = (cartItems, storePrices) => {
  console.log("storePrices", storePrices);
  console.log("cartItems", cartItems);

  if (!storePrices) return { totalCharge: 0, platformCharge: 0 };
  if (!cartItems) return { totalCharge: 0, platformCharge: 0 };

  let platformCharge = 0;

  // Create a dynamic totalPages structure
  let totalPages = {};

  cartItems.forEach((item) => {
    if (!totalPages[item.paperSize]) {
      totalPages[item.paperSize] = {};
    }
    if (
      item.printType === "mixed" &&
      item.colorPages &&
      item.colorPages.length > 0
    ) {
      if (!totalPages[item.paperSize][item.mixedPrintType]) {
        totalPages[item.paperSize][item.mixedPrintType] = {
          single_sided: 0,
          double_sided: 0,
        };
      }
      item.colorPages.forEach((page) => {
        const pageCount = item.copiesCount;
        totalPages[item.paperSize][item.mixedPrintType][item.printSides] +=
          pageCount;
        if (!totalPages[item.paperSize]["black_and_white"]) {
          totalPages[item.paperSize]["black_and_white"] = {
            single_sided: 0,
            double_sided: 0,
          };
        }
        totalPages[item.paperSize]["black_and_white"][item.printSides] +=
          (item.pageCount - item.colorPages.length) * item.copiesCount;
      });
    } else {
      if (!totalPages[item.paperSize][item.printType]) {
        totalPages[item.paperSize][item.printType] = {
          single_sided: 0,
          double_sided: 0,
        };
      }
      totalPages[item.paperSize][item.printType][item.printSides] +=
        item.pageCount * item.copiesCount;
    }
  });

  let totalCharge = 0;

  const calculateCharge = (paperSize, printType, printSides, pageCount) => {
    const relevantStorePrices = storePrices.filter(
      (item) =>
        item.paperSize === paperSize &&
        item.printType === printType &&
        item.printingSides === printSides
    );

    relevantStorePrices.forEach((item) => {
      item.conditionsList.sort((a, b) => a.conditionValue - b.conditionValue);
      let appliedPrice = item.basePrice;

      for (let i = 0; i < item.conditionsList.length; i++) {
        if (pageCount >= item.conditionsList[i].conditionValue) {
          appliedPrice = item.conditionsList[i].conditionPrice;
        } else {
          break;
        }
      }

      totalCharge += pageCount * appliedPrice;
    });
  };

  Object.keys(totalPages).forEach((paperSize) => {
    Object.keys(totalPages[paperSize]).forEach((printType) => {
      Object.keys(totalPages[paperSize][printType]).forEach((printSides) => {
        const pageCount = totalPages[paperSize][printType][printSides];
        if (pageCount > 0) {
          calculateCharge(paperSize, printType, printSides, pageCount);
        }
      });
    });
  });

  totalCharge += platformCharge;

  console.log("totalCharge is ", totalCharge);

  return {
    totalCharge: Math.ceil(totalCharge),
    platformCharge: platformCharge,
  };
};
