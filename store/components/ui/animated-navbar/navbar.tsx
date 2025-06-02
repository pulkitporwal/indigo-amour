"use client"

import React, { useRef, useEffect, useState } from 'react'
import Menu from './menu';
import localFont from "next/font/local"

const landslide = localFont({
  src: "../../../fonts/LandslideSample.ttf",
  variable: "--font-landslide",
  className: "font-landslide",
});


const AnimatedNavbar = () => {
  return (
    <div className='fixed top-0 left-0 flex w-full items-center justify-between px-5 lg:px-16 py-4 z-[1000]'>
      <div className='flex items-center justify-center gap-3'>
        <img src="/icons/logo-icon.png" alt="INDIGO AMOUR" className='w-12' />
        <h3 className={`${landslide.className} text-white`}>Indigo<br /> Amour</h3>
      </div>
      <Menu />
    </div>
  )
}

export default AnimatedNavbar