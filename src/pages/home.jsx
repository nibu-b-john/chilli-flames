import React from 'react';
import { Link } from 'react-router-dom';
import background from "./../assets/images/background.png";
import logo from "./../assets/images/logo.png";

const Home = () => {
  return (
    <div 
      className="p-4 sm:p-6 md:p-10 flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img 
        className='w-auto h-16 sm:h-20 md:h-28' 
        src={logo} 
        alt="Restaurant Logo" 
      />
      <div className='space-y-3 mt-auto mb-auto text-white flex flex-col items-center text-center'>
        <p className='uppercase text-base sm:text-lg font-semibold'>Thai and Indian Cuisine</p>
        <p className='uppercase text-5xl sm:text-6xl md:text-8xl font-semibold tracking-widest'>
          Enjoyable
        </p>
        <p className='max-w-xl sm:max-w-2xl md:max-w-3xl tracking-wide leading-relaxed text-sm sm:text-base'>
          A restaurant sometimes known as a diner is a place where cooked food is sold to the
          public, and where people sit down to eat it. It is also a place where people go to
          enjoy the time and to eat a meal.
        </p>
        <div className='pt-4 sm:pt-6 w-full space-y-4'>
          <p className='uppercase text-xs sm:text-sm font-semibold tracking-widest'>
            Tap to view menu
          </p>
          <div className='w-full flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3'>
            <Link to="/platter" className='w-full sm:w-auto border-2 border-white bg-transparent text-white tracking-widest uppercase text-xs sm:text-sm font-semibold px-4 py-2 hover:bg-white hover:text-black text-center'>
              Chinese Platter
            </Link>
            <Link to="/platter" className='w-full sm:w-auto border-2 border-white bg-transparent text-white tracking-widest uppercase text-xs sm:text-sm font-semibold px-4 py-2 hover:bg-white hover:text-black text-center'>
              Thai Platter
            </Link>
            <Link to="/platter" className='w-full sm:w-auto border-2 border-white bg-transparent text-white tracking-widest uppercase text-xs sm:text-sm font-semibold px-4 py-2 hover:bg-white hover:text-black text-center'>
              Indian Platter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;