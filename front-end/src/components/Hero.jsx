import React from "react";
import { assets } from "../assets/assets";
function Hero() {
  return (
    //outer border
    <div className="flex flex-col sm:flex-row border border-gray-400">
      
      {/* left side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
        {/* text 1 */}
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base">Our BestSeller</p>
        </div>

        {/* text 2 */}
        <h1 className="prata-regular text-[#414141] text-3xl sm:py-3 lg:text-5xl leading-relaxed">
          Latest Arrivals
        </h1>

        {/* text 3 */}
        <div className="text-[#414141] flex items-center gap-2">
          <p className="font-semibold text-sm md:text-base">Shop Now</p>
          <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
        </div>
      </div>

      <img className="w-full sm:w-1/2" src={assets.hero_img} />
    </div>
  );
}

export default Hero;
