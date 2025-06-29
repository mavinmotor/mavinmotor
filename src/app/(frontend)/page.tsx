import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/utils'
import Image from 'next/image'
import * as React from 'react'

export default async function HomePage() {

  return (
    <div className='flex flex-col gap-5 mx-auto w-full'>
      <section
        className='fixed top-0 w-full flex flex-col mx-auto items-center justify-center h-screen gap-5 overflow-hidden'
      >
        <div className='flex flex-col items-center justify-center z-35 gap-3 md:max-w-xl text-center'>
          <h2 className={cn('block text-lg md:text-3xl font-black uppercase')}>Quality and <span className='text-green-500 underline decoration-wavy rotate-[-130deg]'>Affordable</span> Agro Processing and Construction Machinery</h2>
          <p className='text-sm font-light'>Over the years, Oduyah has grown from producing small scale milling equipment to being one of the region’s leading manufacturers and suppliers of agro-processing and  machinery.</p>

          <div className='flex w-fit items-center gap-3 mt-10'>
            <Button variant={'secondary'} className='h-20 w-45 rounded-full'>Read More</Button>
            <Button className='h-20 w-45 rounded-full'>Contact us</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
