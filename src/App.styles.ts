const AppStyles = {
  carouselContainer: "flex gap-[30px] min-h-[500px] flex-row  justify-start lg:max-w-[1266px] m-auto relative flex-nowrap lg:flex-wrap pb-2",
  root: "my-10 lg:my-[70px] px-[30px] lg:px-24 overflow-hidden",
  prevCarouselItem: "opacity-0 pointer-events-none",
  lastCarouselItem: "min-w-full",
  navButtonsContainer: "mt-[20px] pb-1",
  carouselNavButton: "!bg-black p-2 mr-[17px] rounded transition-all duration-500",
  rotateTransform: "rotate-180",
  disabledNavButton: "!bg-gray",
  imageContainer: "relative min-h-[174px] max-h-[255px] bg-[#213547]",
  image: "object-contain rounded-[25px]",
  itemTitle: "font-semibold text-[18px]/[30px] md:text-[22px]/[34px] text-white",
  itemDesc: "text-sm/[24px] md:text-base/[25px] text-white",
  carouselItem: `rounded-[35px] bg-white p-[20px] md:p-[20px] w-fullborder border-solid border-[1px]
 border-lightGray gap-[20px] flex flex-col min-w-[300px] flex-1 md:w-[290px] md:max-w-[402px] h-auto flex-1 relative 
 transition-all duration-1000`,
  mainContainer: "p-5 overflow-hidden",
  textWhite: "text-white"
};

export default AppStyles;