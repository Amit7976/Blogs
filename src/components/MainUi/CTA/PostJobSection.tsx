import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { FaChevronRight } from 'react-icons/fa';

function PostJobSection() {
  return (
    <>
      <section className=" w-full shadow-xl border-2 rounded-3xl relative max-w-7xl mx-auto bg-white overflow-hidden p-2">
          <div className="gap-10 items-center px-10 grid grid-cols-3">
            <div className="w-full h-72 col-span-1">
              <Image
                src="/images/Random/weAreHiring.svg"
                alt="Accelerate Your Business"
                width={800}
                height={800}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col px-10 py-8 gap-2 col-span-2">
              <h1 className="text-3xl font-bold text-[#2b2b2b]">
                Need Office/Working Staff?
              </h1>
              <p className="text-base font-medium my-2 text-gray-400">
                Save your valuable time and find the most suitable candidate for
                your company. Jobboost makes that it is possible to find the
                correct personnel for your team.
              </p>
              <div className="flex gap-2 items-center flex-wrap">
                <Button className="px-4 py-2 mt-5 text-sm font-semibold text-white bg-[#FE4A03] hover:bg-orange-700 rounded-full flex items-center gap-2">
                  Post a Job Role <FaChevronRight />
                </Button>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}

export default PostJobSection