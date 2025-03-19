import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="2xl:px-20 mx-auto my-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white py-16 text-center mx-2 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Find Your <span className="text-yellow-400">Dream Job</span> Today
        </h2>
        <p className="mb-6 max-w-xl mx-auto text-sm font-light px-5">
          Over <span className="font-semibold">10,000+</span> jobs available! Your next big career move starts here. Explore top opportunities now!
        </p>

        {/* 🔹 SEARCH UI (Unchanged, Styled Slightly for Better Look) */}
        <div className="flex justify-between items-center bg-white text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto rounded-lg shadow-lg">
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.search_icon} />
            <input
              type="text"
              placeholder="Search for a job"
              ref={titleRef}
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.location_icon} />
            <input
              type="text"
              placeholder="Location"
              ref={locationRef}
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <button onClick={onSearch} className="bg-blue-600 py-2 px-6 m-1 rounded text-white hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex flex-col md:flex-row items-center gap-4">
        <p className="font-medium text-gray-700">Trusted by</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
          <img className="h-6 opacity-80 hover:opacity-100 transition" src={assets.microsoft_logo} />
          <img className="h-6 opacity-80 hover:opacity-100 transition" src={assets.walmart_logo} />
          <img className="h-6 opacity-80 hover:opacity-100 transition" src={assets.samsung_logo} />
          <img className="h-6 opacity-80 hover:opacity-100 transition" src={assets.adobe_logo} />
          <img className="h-6 opacity-80 hover:opacity-100 transition" src={assets.amazon_logo} />
          <img className="h-6 opacity-80 hover:opacity-100 transition" src={assets.accenture_logo} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
