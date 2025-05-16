import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { GiWorld } from 'react-icons/gi'

function BlogSubFooter() {
  return (
      <>
          <section className="p-20 py-5 select-none">
              <div className="grid-cols-5 grid items-center gap-5 h-auto">
                  <div className="col-span-2 rounded-2xl grid grid-flow-row grid-rows-2 gap-5">
                      <Link href={'/'} className="col-span-1 rounded-2xl border-2 p-10 bg-[url('/images/Random/150798.jpg')] object-cover bg-fixed relative overflow-hidden h-72 bg-repeat-y">
                          <div className="absolute left-0 bottom-0 h-full w-full z-0 bg-[#00000094]">
                          </div>
                          <div className="z-10 absolute space-y-4 bottom-8">
                              <p className="bg-[#aaaaaa73] rounded-lg p-2 w-fit">
                                  <GiWorld className="text-2xl text-white" />
                              </p>
                              <p className="me-2 inline-block text-2xl text-white">
                                  Accelerate Your Business
                              </p>
                              <p className="group-hover:underline decoration-2 inline-flex justify-center items-center gap-x-2 font-semibold text-orange-600 text-3xl dark:text-orange-500 underline-offset-4">
                                  Need Office/Working Staff?
                              </p>
                              <Button variant={'outline'} className="border-2 font-semibold bg-transparent text-white h-auto py-2.5 px-6">Post a Job role</Button>
                          </div>
                      </Link>
                      <Link href={'/articles'} className="col-span-1 rounded-2xl border-2 p-10 bg-[url('/images/Random/52.jpg')] bg-cover bg-top relative overflow-hidden h-72 bg-no-repeat flex items-center justify-center bg-blend-[currentcolor]">
                          <div className="absolute left-0 bottom-0 h-full w-full z-0 bg-[#00000094]">
                          </div>
                          <div className="z-10 relative space-y-4">
                              <p className="text-5xl font-bold text-white drop-shadow-xl p-5 rounded-3xl">Reed Articles</p>
                          </div>
                      </Link>
                  </div>
                  <Link href={'/'} className="col-span-3 rounded-2xl border-2 p-10 h-full bg-[url('/images/Random/101882.jpg')] object-cover bg-center relative flex items-center justify-center flex-col gap-5">
                      <p className="me-2 inline-block text-4xl text-white text-center leading-[55px]">
                          Unlock countless new opportunities with <b className="text-5xl">JobBoost</b>
                      </p>
                      <p className="group-hover:underline decoration-2 inline-flex justify-center items-center gap-x-2 font-semibold text-orange-600 text-3xl dark:text-orange-400">
                          Start building your future today!
                      </p>
                  </Link>
              </div>
          </section>
      </>
  )
}

export default BlogSubFooter