/* import Image from 'next/image';
import React from 'react';

const Brands = () => {
  return (
    <div className="relative ">
      <div className="flex justify-center">
        <Image 
          src="/Rectangle 3.png" 
          alt="Background Image" 
          className="w-full h-auto max-h-[122px] object-cover "
          width={1400}
          height={122}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="flex flex-wrap gap-10 justify-center items-center">
          <Image 
            src="/versace.png" 
            alt="Versace Logo" 
            className="w-[70px] sm:w-[166.48px] h-auto"
            width={166}
            height={33}
          />
          <Image
            src="/zara-logo-1 1.png" 
            alt="Zara Logo" 
            className="w-[70px] sm:w-[91px] h-auto"
            width={91}
            height={38}
          />
          <Image
            src="/gucci-logo-1 1.png" 
            alt="Gucci Logo" 
            className="w-[70px] sm:w-[156px] h-auto"
            width={156}
            height={36}
          />
          <Image
            src="/prada-logo-1 1.png" 
            alt="Prada Logo" 
            className="w-[70px] sm:w-[194px] h-auto"
            width={194}
            height={32}
          />
          <Image
            src="/Group (1).png" 
            alt="Group Logo" 
            className="w-[70px] sm:w-[206.79px] h-auto"
            width={206}
            height={33}
          />
        </div>
      </div>
    </div>
  );
};

export default Brands;
 */


import Image from 'next/image';
import React from 'react';

const Brands = () => {
  return (
    <div className="relative w-full overflow-hidden"> {/* Constrain logos within the background */}
      {/* Background Image */}
      <div className="flex justify-center">
        <Image
          src="/Rectangle 3.png"
          alt="Background Image"
          className="w-full h-[122px] sm:h-[150px] md:h-[100px] object-cover"
          width={1400}
          height={200} // Adjust height as needed
        />
      </div>

      {/* Logos Container */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center items-center px-4 sm:px-6">
          {/* Versace Logo */}
          <Image
            src="/versace.png"
            alt="Versace Logo"
            className="w-[50px] sm:w-[80px] md:w-[100px] lg:w-[120px] h-auto"
            width={120}
            height={24}
          />

          {/* Zara Logo */}
          <Image
            src="/zara-logo-1 1.png"
            alt="Zara Logo"
            className="w-[50px] sm:w-[70px] md:w-[80px] lg:w-[90px] h-auto"
            width={90}
            height={38}
          />

          {/* Gucci Logo */}
          <Image
            src="/gucci-logo-1 1.png"
            alt="Gucci Logo"
            className="w-[50px] sm:w-[90px] md:w-[110px] lg:w-[130px] h-auto"
            width={130}
            height={30}
          />

          {/* Prada Logo */}
          <Image
            src="/prada-logo-1 1.png"
            alt="Prada Logo"
            className="w-[50px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-auto"
            width={140}
            height={23}
          />

          {/* Group Logo */}
          <Image
            src="/Group (1).png"
            alt="Group Logo"
            className="w-[50px] sm:w-[110px] md:w-[130px] lg:w-[150px] h-auto"
            width={150}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Brands;