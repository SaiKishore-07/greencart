import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden object-cover"
      />
      <div className="absolute inset-0 flex flex-col  items-center md:items-end md:justify-center pt-15 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-8 md:mb-10">
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-row  items-center gap-3 md:gap-4 mt-2"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="md:w-13 w-12"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-sm md:text-[1.10rem] mb-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
