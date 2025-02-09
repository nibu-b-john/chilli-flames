import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState(null);

  const autoplay = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % homeData?.slides?.length);
  }, [homeData?.slides?.length]);

  useEffect(() => {
    const interval = setInterval(autoplay, 6000);
    return () => clearInterval(interval);
  }, [autoplay]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setHomeData(data.home);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden w-full h-screen">
      {/* Carousel Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {homeData.slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative">
            <div className="absolute inset-0 bg-black bg-opacity-25" />
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              // className="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center p-4 sm:p-6 md:p-10">
        <img
          className="w-auto h-16 sm:h-20 md:h-28 mb-auto mt-5"
          src={homeData.logo}
          alt="Restaurant Logo"
        />

        <div className="space-y-3 text-white flex flex-col items-center text-center mb-auto -mt-20">
          <p className="uppercase text-base sm:text-lg font-semibold tracking-[0.3em]">
            {homeData.slides[currentSlide].overlayText.cuisineType}
          </p>
          <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold tracking-[0.2em]">
            {homeData.slides[currentSlide].overlayText.mainText}
          </p>
          <p className="max-w-xl sm:max-w-2xl md:max-w-3xl tracking-wide leading-relaxed text-sm sm:text-base text-white/70">
            {homeData.slides[currentSlide].overlayText.description}
          </p>

          {/* Platter Category Links */}
          <div className="pt-4 sm:pt-6 w-full max-w-3xl space-y-4">
            <p className="uppercase text-xs sm:text-sm font-semibold tracking-widest">
              Tap to view menu
            </p>

            <div className=" w-full flex flex-col sm:flex-row justify-center  sm:space-x-10 space-y-3 sm:space-y-0">
              {homeData.platterCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.route}
                  className=" font-semibold text-white px-4 py-2 sm:px-5 sm:py-2 tracking-wider border-2 border-white cursor-pointer hover:text-black hover:bg-white text-sm sm:text-base uppercase"
                >
                  {category.name} Platter
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
