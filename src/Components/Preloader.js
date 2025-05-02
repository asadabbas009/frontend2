import React, { useEffect } from "react";
import logo from "../Assest/logo193.png"; 

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 z-50">
      
      
      <img src={logo} alt="Logo" className="w-24 md:w-32 animate-spin-scale" />
      
      
      <p className="mt-4 text-lg md:text-2xl font-semibold text-gray-700 animate-fade-in-bounce">
        Transforming Healthcare Landscape
      </p>
    </div>
  );
};

export default Preloader;
