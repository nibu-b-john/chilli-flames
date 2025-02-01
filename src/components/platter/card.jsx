import React, { useState } from 'react';
import dummyDish from "./../../assets/images/dummy-dish.png";

const PlatterCard = () => {
    const [count, setCount] = useState(0);

    return (
        <div className='border-2 border-yellow-300 px-2 py-4 rounded-lg flex flex-col w-full sm:w-56 md:w-64 gap-2'>
            {/* Dish Image */}
            <div>
                <img
                    className='w-full h-40 object-cover rounded-lg'
                    src={dummyDish}
                    alt="Dish"
                />
            </div>

            {/* Dish Name and Counter */}
            <div className='flex justify-between items-center'>
                <p className='font-medium text-base sm:text-lg'>Sushi</p>
                <div className='flex justify-between items-center w-24 sm:w-28 bg-yellow-300 px-3 sm:px-4 py-1 rounded-lg'>
                    <p 
                        onClick={count > 0 ? () => setCount(prevCount => prevCount - 1) : () => {}} 
                        className='font-semibold text-xl hover:cursor-pointer'
                    >
                        -
                    </p>
                    <p className=''>{count}</p>
                    <p 
                        onClick={() => setCount(prevCount => prevCount + 1)} 
                        className='font-semibold text-xl hover:cursor-pointer'
                    >
                        +
                    </p>
                </div>
            </div>

            {/* Dish Description */}
            <p className='text-black/50 text-xs sm:text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad itaque earum aliquid iste ea id dolor quisquam iure doloribus ducimus
            </p>

            {/* Price and Buy Now Button */}
            <div className='flex justify-between items-center'>
                <p className='text-green-500 font-semibold text-lg sm:text-xl'>$25</p>
                <button className='bg-blue-950 w-28 px-3 sm:px-4 py-2 rounded-lg text-white text-sm sm:text-base'>
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default PlatterCard;