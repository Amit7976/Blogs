import Image from "next/image";
import React from "react";

function HomeContent1() {
  return (
    <>
      <div
        className="relative flex justify-center items-center my-20"
        style={{
          clipPath:
            "polygon(33% 0, 68% 10%, 100% 0, 100% 87%, 67% 99%, 31% 91%, 0 100%, 0 12%)",
        }}
      >
        <Image
          src="/images/image/photo-1698047681820-f26b00b6c639.webp"
          alt="Find New Job"
          width={800}
          height={100}
          className="w-[100%] h-[800px] object-cover"
        />

        <div className="flex w-full gap-10 lg:gap-20 transition-all duration-300 flex-col lg:flex-row justify-center absolute top-0 left-0 h-full items-center bg-[#dadcdfa1]">
          <div className="flex-1 flex flex-col w-full max-w-3xl items-center text-center mx-auto gap-4">
            <h2 className="mb-6 break-word transition-all duration-300 text-center text-7xl font-normal">
              Find Your Next Role
            </h2>
            <p className="transition-all duration-300 text-2xl font-medium text-gray-800">
              We help you find the perfect job. Start your journey with us and
              make your next career move.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeContent1;
