import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import background from "./../assets/images/background.png";
import logo from "./../assets/images/logo.png";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [background, background, background]; // Replace with your actual images

  const autoplay = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(autoplay, 6000);
    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      {/* Carousel Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative">
            <div className="absolute inset-0 bg-black bg-opacity-25" />
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center p-4 sm:p-6 md:p-10">
        <img
          className="w-auto h-16 sm:h-20 md:h-28 mb-auto mt-5"
          src={logo}
          alt="Restaurant Logo"
        />

        <div className="space-y-3 text-white flex flex-col items-center text-center mb-auto -mt-20">
          <p className="uppercase text-base sm:text-lg font-semibold tracking-[0.3em]">
            Thai and Indian Cuisine
          </p>
          <p className="uppercase text-5xl sm:text-6xl md:text-8xl font-semibold tracking-[0.2em]">
            Enjoyable
          </p>
          <p className="max-w-xl sm:max-w-2xl md:max-w-3xl tracking-wide leading-relaxed text-sm sm:text-base text-white/70">
            A restaurant sometimes known as a diner is a place where cooked food
            is sold to the public, and where people sit down to eat it. It is
            also a place where people go to enjoy the time and to eat a meal.
          </p>

          <div className="pt-4 sm:pt-6 w-[700px] space-y-4">
            <p className="uppercase text-xs sm:text-sm font-semibold tracking-widest">
              Tap to view menu
            </p>

            <div className="w-full flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
              <Link
                to="/platter"
                className="font-semibold bg-white text-black px-5 py-2 tracking-wider border-2 border-white cursor-pointer hover:bg-transparent hover:text-white text-sm sm:text-base uppercase"
              >
                Chinese Platter
              </Link>
              <Link
                to="/platter"
                className="font-semibold bg-white text-black px-5 py-2 tracking-wider border-2 border-white cursor-pointer hover:bg-transparent hover:text-white text-sm sm:text-base uppercase"
              >
                Thai Platter
              </Link>
              <Link
                to="/platter"
                className="font-semibold bg-white text-black px-5 py-2 tracking-wider border-2 border-white cursor-pointer hover:bg-transparent hover:text-white text-sm sm:text-base uppercase"
              >
                Indian Platter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
