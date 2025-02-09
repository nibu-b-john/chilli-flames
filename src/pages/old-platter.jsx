import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PlatterCard from "../components/platter/card";

const Platter = () => {
  const navigate = useNavigate();
  const { platterType } = useParams();
  const [platterData, setPlatterData] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setPlatterData(data[platterType]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [platterType]);

  if (!platterData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src="/images/home/background.png"
          alt="Restaurant Background"
        />
        {/* Logo */}
        <img
          className="w-auto h-16 sm:h-20 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="/images/logo.png"
          alt="Restaurant Logo"
        />

        {/* Back Button and Heading */}
        <div
          className="hidden font-semibold absolute top-10 left-10 md:flex items-center space-x-2 hover:cursor-pointer"
          onClick={handleGoBack}
        >
          <ArrowLeft className="text-white" />
          <p className="text-lg sm:text-xl text-white">Back</p>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="relative w-full flex items-start">
            <h2 className="ml-auto mr-auto text-xl sm:text-2xl md:text-3xl uppercase font-semibold">
              {platterData.heading}
            </h2>
          </div>

          {/* Description */}
          <p className="max-w-xl text-center text-sm sm:text-base text-white">
            {platterData.description}
          </p>
        </div>
      </div>
      <div className="bg-[#FFF0D8] min-h-screen flex flex-col items-center px-4 sm:px-6 xl:px-64 py-6 gap-3">
        <h3 className="ml-auto mr-auto text-xl sm:text-2xl md:text-3xl uppercase font-semibold tracking-widest">
          Regular Menu
        </h3>
        {/* Dish Types */}
        {platterData.dishTypes &&
          platterData.dishTypes.map((dishType, index) => (
            <div key={index}>
              {/* heading */}
              {/* Type */}
              <p className="mr-auto mt-10 text-xl sm:text-2xl md:text-3xl uppercase font-medium">
                {dishType.title}
              </p>
              <p className="mr-auto mt-1 text-lg font-light ">
                {dishType.description}
              </p>
              {/* Platter Cards Grid */}
              <div className="w-full mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {dishType.dishes &&
                  dishType.dishes.map((dish) => (
                    <PlatterCard key={dish.id} dish={dish} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Platter;
