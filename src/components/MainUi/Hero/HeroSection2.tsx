"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRegThumbsUp } from "react-icons/fa";
import Image from "next/image";
import MainBigSearchBar from "../SearchBar/MainBigSearchBar";
function HeroSection2() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* <!-- Hero --> */}
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/images/Random/polygon-bg.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 h- min-h-screen pb-40">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-10">
          {/* <!-- Announcement Banner --> */}
          <div className="flex justify-center">
            <p className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#FA4D02] text-sm text-[#FA4D02] font-medium p-1 ps-3 rounded-full transition dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
              <FaRegThumbsUp />
              #Fastest Growing on Job Hunt
            </p>
          </div>
          {/* <!-- End Announcement Banner --> */}
          <div className="px-8 py-4 mx-auto md:px-12 lg:px-32 max-w-5xl z-10 relative">
            <div className="text-center">
              <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl text-balance flex flex-col mt-2">
                {" "}
                Supporting Job Seekers{" "}
                <span className="text-gray-600 scale-90 mt-1">
                  Every Step of the Way
                </span>
              </h1>
              <p className="w-full text-center mt-2 py-4 text-base font-medium text-gray-500">
                Unlock your true potential and discover a world of opportunities
                that align with your skills, interests and aspirations
              </p>
            </div>
          </div>

          <div
            data-aos="fade-down"
            data-aos-offset="0"
            data-aos-delay="0"
            data-aos-duration="800"
            data-aos-easing="ease"
            className="z-10 my-2"
          >
            <MainBigSearchBar />
          </div>

          <div
            data-aos="zoom-out"
            data-aos-offset="0"
            data-aos-delay="0"
            data-aos-duration="800"
            data-aos-easing="ease"
            className="bg-transparent w-full h-full absolute top-16 left-0 pointer-events-none select-none"
          >
            <Image
              src="/images/Random/hero/hero (1).png"
              alt="Hero 1"
              width={800}
              height={800}
              className="w-36 h-auto shadow-xl border- rounded-3xl absolute left-[6%] top-[20%]"
            />
            <Image
              src="/images/Random/hero/hero (2).png"
              alt="Hero 2"
              width={800}
              height={800}
              className="w-36 h-auto shadow-xl border- rounded-3xl absolute left-[6%] top-[70%] -z-10"
            />
            <Image
              src="/images/Random/hero/hero (3).png"
              alt="Hero 3"
              width={800}
              height={800}
              className="w-36 h-auto shadow-xl border- rounded-3xl absolute right-[12%] top-[10%]"
            />
            <Image
              src="/images/Random/hero/hero (4).png"
              alt="Hero 4"
              width={800}
              height={800}
              className="w-36 h-auto shadow-xl border- rounded-3xl absolute right-[6%] top-[60%] -z-10"
            />
          </div>
        </div>
      </div>
      {/* <!-- End Hero --> */}
    </>
  );
}

export default HeroSection2;
