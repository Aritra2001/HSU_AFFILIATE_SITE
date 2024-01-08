import React, { useState, useEffect } from 'react';

const RemainingDaysCounter = ({ targetDate }) => {
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    const calculateRemainingDays = () => {
      const currentDate = new Date();
      const targetDateTime = new Date(targetDate).getTime();
      const currentDateTime = currentDate.getTime();

      const timeDifference = targetDateTime - currentDateTime;
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      setRemainingDays(daysDifference);
    };

    calculateRemainingDays();

    // Update the remaining days every day (or as needed)
    const intervalId = setInterval(calculateRemainingDays, 24 * 60 * 60 * 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="text-white text-xs font-medium font-['Poppins']">
      <p>{remainingDays} Days</p>
    </div>
  );
};

export default RemainingDaysCounter;
