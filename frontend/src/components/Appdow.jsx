import React from "react";
import { assets } from "../assets/assets";

export default function Appdow() {
  return (
    <div className="bg-gray-100 p-10 rounded-lg shadow-md text-center">
      <p className="text-lg font-semibold mb-4 text-gray-800">
        For Better Experience Download <br /> FoodMood App
      </p>
      <div className="flex justify-center gap-4">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="w-32 h-auto hover:scale-105 transition-transform"
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="w-32 h-auto hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
}
