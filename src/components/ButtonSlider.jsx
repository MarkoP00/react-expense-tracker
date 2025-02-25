import React, { useRef, useState } from "react";

const TabSlider = ({ onChangeSelectedMonth }) => {
  const tabSliderRef = useRef(null);

  const [pageTabs, setTabs] = useState([
    {
      title: "January",
      active: true,
    },
    {
      title: "February",
      active: false,
    },
    {
      title: "March",
      active: false,
    },
    {
      title: "April",
      active: false,
    },
    {
      title: "May",
      active: false,
    },
    {
      title: "June",
      active: false,
    },
    {
      title: "July",
      active: false,
    },
    {
      title: "August",
      active: false,
    },
    {
      title: "September",
      active: false,
    },
    {
      title: "October",
      active: false,
    },
    {
      title: "November",
      active: false,
    },
    {
      title: "December",
      active: false,
    },
  ]);

  const scrollLeft = () => {
    const scrollAmount = 300;
    if (tabSliderRef.current) {
      tabSliderRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    const scrollAmount = 300;
    if (tabSliderRef.current) {
      tabSliderRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleMonth = (tabTitle) => {
    onChangeSelectedMonth(tabTitle.toLowerCase());
    toggleActiveButton(tabTitle);
  };

  const toggleActiveButton = (tabTitle) => {
    setTabs((prevState) =>
      prevState.map((item) =>
        item.title === tabTitle
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  };

  return (
    <div className="flex w-full items-center justify-center px-2 ">
      <i
        className="fa-solid fa-chevron-left cursor-pointer"
        onClick={scrollLeft}></i>
      <div
        className="flex gap-5 w-[600px] overflow-x-auto overflow-y-hidden scroll-smooth items-center p-6 rounded-lg hiddenScrollbar"
        ref={tabSliderRef}>
        {pageTabs.map((tab) => (
          <div
            key={tab.title}
            className={`tab  ${
              tab.active ? "bg-blue-500 text-white" : "bg-white"
            }  p-3 shadow-md rounded-full cursor-pointer text-center transition-all transform 
            }`}
            onClick={() => handleMonth(tab.title)}>
            <button>{tab.title}</button>
          </div>
        ))}
      </div>
      <i
        className="fa-solid fa-chevron-right cursor-pointer"
        onClick={scrollRight}></i>
    </div>
  );
};

{
}
export default TabSlider;
