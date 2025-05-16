import { Button } from '@/components/ui/button'
import React from 'react'

function LoginRecommendation() {
  return (
    <>
      <section className="mt-1">
        <div className="bg-gray-600 p-10 text-white w-full max-w-7xl mx-auto rounded-2xl">
          <h3 className="text-3xl font-semibold">Find Your Dream Job Today!</h3>
          <p className="text-lg font-normal mt-2">
            Explore thousands of opportunities, Connect with top employers, and
            freelancers, and Apply with ease. 🚀 Start Your Job Search Now!
          </p>

          <Button variant={"default"} className="bg-[#FA4D02] rounded-full mt-8 py-3 px-7 h-auto">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}

export default LoginRecommendation