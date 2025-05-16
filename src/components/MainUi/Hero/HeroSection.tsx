"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <>
      <div className="flex justify-between items-center p-10 h-screen mt-10 relative mb-[350px]">
        <div className="w-[50%] ">
          <h1 className="text-7xl font-medium py-10">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl font-medium py-10 opacity-70">
            We connect you to the right opportunities. Our team in JOBBOOST is
            dedicated to finding the perfect match for your skills.
          </p>
          <Button
            variant={"outline"}
            size={"lg"}
            className="px-10 py-8 my-5 text-xl rounded-2xl border-gray-500 border-2"
          >
            Get Started
          </Button>
        </div>
        <div className="w-[50%] h-screen pointer-events-auto -z-10 pl-20">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/images/image/77.jpg"
                  alt="Jobboost Logo"
                  className="w-full h-[700px] object-cover ml-auto rounded-[2.5rem]"
                  width={800}
                  height={800}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/images/image/4684.jpg"
                  alt="Jobboost Logo"
                  className="w-full h-[700px] object-cover ml-auto rounded-[2.5rem]"
                  width={800}
                  height={800}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/images/image/13367.jpg"
                  alt="Jobboost Logo"
                  className="w-full h-[700px] object-cover ml-auto rounded-[2.5rem]"
                  width={800}
                  height={800}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/images/image/photo-1573496130407-57329f01f769.jpeg"
                  alt="Jobboost Logo"
                  className="w-full h-[700px] object-cover ml-auto rounded-[2.5rem]"
                  width={800}
                  height={800}
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        <div className="absolute -bottom-36 -z-50 left-0 h-96 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none"
            viewBox="0 0 1440 560"
          >
            <g mask='url("#SvgjsMask1021")' fill="none">
              <path
                d="M1488 560L0 560 L0 298.17Q61.08 287.25, 72 348.34Q125.28 281.62, 192 334.89Q240.49 263.38, 312 311.86Q336.64 264.5, 384 289.14Q461.21 246.35, 504 323.55Q574.38 273.94, 624 344.32Q636.09 284.41, 696 296.51Q725.48 253.99, 768 283.47Q820.88 264.36, 840 317.24Q927.95 285.19, 960 373.14Q977.7 318.84, 1032 336.54Q1067.26 251.81, 1152 287.07Q1222.49 237.56, 1272 308.04Q1330.05 294.09, 1344 352.13Q1365.64 301.77, 1416 323.41Q1431.04 266.45, 1488 281.48z"
                fill="rgba(245, 245, 245, 1)"
              ></path>
              <path
                d="M1512 560L0 560 L0 396.63Q44.62 369.25, 72 413.86Q77.94 347.8, 144 353.74Q211.06 300.8, 264 367.86Q343.88 327.75, 384 407.63Q408.28 359.91, 456 384.19Q500.81 309, 576 353.81Q620.13 325.94, 648 370.06Q741.78 343.84, 768 437.62Q775.9 373.52, 840 381.43Q905.78 327.21, 960 392.99Q1011.64 372.63, 1032 424.27Q1060.08 380.35, 1104 408.42Q1133.84 366.26, 1176 396.1Q1224.1 372.2, 1248 420.3Q1253.96 354.26, 1320 360.22Q1389.4 357.63, 1392 427.03Q1426.79 341.82, 1512 376.61z"
                fill="#D4DCE840"
              ></path>
              <path
                d="M1488 560L0 560 L0 467.53Q39.75 387.28, 120 427.04Q166.73 401.77, 192 448.5Q249.84 434.34, 264 492.18Q293.56 449.75, 336 479.31Q345.69 417, 408 426.68Q462.44 409.12, 480 463.55Q550.67 414.22, 600 484.89Q647.82 460.71, 672 508.53Q687.86 404.38, 792 420.24Q857.31 365.55, 912 430.86Q963.83 410.69, 984 462.51Q1056.99 415.5, 1104 488.49Q1117.26 429.75, 1176 443Q1229.55 376.55, 1296 430.1Q1356.72 418.83, 1368 479.55Q1417.76 409.31, 1488 459.07z"
                fill="#D4DCE850"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
