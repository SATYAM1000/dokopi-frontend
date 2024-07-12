export function getStoreStatus(storeTiming) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();
  
    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentDayIndex + i) % 7;
      const currentDay = daysOfWeek[dayIndex];
      const todayTiming = storeTiming[currentDay];
  
      if (!todayTiming || !todayTiming.isOpen) {
        continue;
      }
  
      const openTimeParts = todayTiming.open.split(":");
      const closeTimeParts = todayTiming.close.split(":");
  
      const openTime =
        parseInt(openTimeParts[0], 10) * 60 + parseInt(openTimeParts[1], 10);
      const closeTime =
        parseInt(closeTimeParts[0], 10) * 60 + parseInt(closeTimeParts[1], 10);
  
      if (i === 0 && currentTime >= openTime && currentTime <= closeTime) {
        // Store is currently open
        return {
          isOpen: true,
          nextOpenTime: null,
          nextCloseTime: todayTiming.close,
        };
      } else if (i === 0 && currentTime < openTime) {
        // Store is currently closed but will open later today
        return {
          isOpen: false,
          nextOpenTime: todayTiming.open,
          nextCloseTime: null,
        };
      } else if (i > 0) {
        // Store is closed and will open on a future day
        return {
          isOpen: false,
          nextOpenTime: `${daysOfWeek[dayIndex]} at ${todayTiming.open}`,
          nextCloseTime: null,
        };
      }
    }
  
    // If no opening times are found, return closed status
    return {
      isOpen: false,
      nextOpenTime: null,
      nextCloseTime: null,
    };
  }
  