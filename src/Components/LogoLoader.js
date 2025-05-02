import React, { useState } from 'react';

const LogoLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-[500px] h-[500px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/videos/loader-video.mp4" type="video/mp4" />
        </video>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoLoader;