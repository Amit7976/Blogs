"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Accelerate() {


  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <>
      <section className="w-full">
        <div className="flex justify-between gap-10 items-start px-10">
          <div className="w-80 h-40 object-center">
            <Image
              src="/images/Random/speedUp.svg"
              alt="Accelerate Your Business"
              width={250}
              height={250}
              className="aspect-square w-80 h-80"
              data-aos="fade-up-right"
              data-aos-offset="300"
              data-aos-delay="0"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-mirror="false"
              data-aos-once="true"
            />
          </div>
          <div className="flex flex-col px-10 py-14">
            <h1 className="text-4xl font-bold">Supercharge your job hunt</h1>
            <p className="text-base font-semibold mt-4 mb-3 text-gray-700">
              We'll help you get a job faster by preparing your CV, getting a
              recruiter's attention, finding the right job and more!
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <Button className="px-10 py-3 mt-5 h-auto text-base font-semibold text-white bg-[#FE4A03] hover:bg-orange-700 rounded-full">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Accelerate;
