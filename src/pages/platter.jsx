import React from 'react';
import logo from "./../assets/images/logo-black.png";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlatterCard from '../components/platter/card';

const Platter = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='bg-[#FFF0D8] flex flex-col items-center px-4 sm:px-6 md:px-10 py-6 gap-3'>
            {/* Logo */}
            <div>
                <img
                    className='w-auto h-16 sm:h-20'
                    src={logo}
                    alt="Restaurant Logo"
                />
            </div>

            {/* Back Button and Heading */}
            <div className='relative w-full flex items-start'>
                <div 
                    className='hidden absolute md:flex items-center space-x-2 hover:cursor-pointer' 
                    onClick={handleGoBack}
                >
                    <ArrowLeft />
                    <p className='text-lg sm:text-xl'>Back</p>
                </div>
                <h2 className='ml-auto mr-auto text-xl sm:text-2xl md:text-3xl uppercase font-semibold'>
                    Chinese Platter
                </h2>
            </div>

            {/* Description */}
            <p className='max-w-xl text-center text-sm sm:text-base text-black/40'>
                A restaurant sometimes known as a diner is a place where cooked food is sold to the
                public, and where people sit down to eat it. It is also a place where people go to
                enjoy the time and to eat a meal.
            </p>

            {/* Platter Cards Grid */}
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 '>
                <PlatterCard />
                <PlatterCard />
                <PlatterCard />
                <PlatterCard />
                <PlatterCard />
                <PlatterCard />
            </div>
        </div>
    );
};

export default Platter;