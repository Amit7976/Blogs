import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Accelerate2() {
  return (
    <>
      <section className="w-full border-2 rounded-2xl relative max-w-7xl mx-auto overflow-hidden my-10">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Supercharge your job hunt</h1>
          <p className="text-base font-medium my-3 text-gray-700">
            We'll help you get a job faster by preparing your CV, getting a
            recruiter's attention, finding the right job and more!
          </p>
          <div className="flex gap-2 items-center flex-wrap">
            <Button className="px-10 py-2 mt-3 h-auto text-base font-semibold text-[#F94B05] bg-[#ffcab5] hover:bg-gray-300 rounded-full">
              Learn more
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Accelerate2;
