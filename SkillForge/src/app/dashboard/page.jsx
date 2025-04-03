"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Link from 'next/link';


function Page() {
  const [img, setImg] = useState(null);
  const router = useRouter();
  const finBuddyRef = useRef(null);

  useEffect(() => {
    const storedImg = localStorage.getItem("photo");
    setImg(storedImg);
    
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    } 

    // Ensure GSAP animation runs after the component has mounted
    gsap.from(".header-letter", {
      y: 100,
      scale: 0.6,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      repeat:-1,
      yoyo:true,
      stagger: 0.2,
    });


  }, []); // Runs only once on mount

  return (
    <div className='h-screen w-full bg-white text-blue-500'>
        <nav className="fixed top-0 h-20 w-full flex items-center justify-between px-10 gap-10 bg-white z-10">
        <div>
          <h1 className="text-3xl">FinBubby</h1>
        </div>
        <div className="flex gap-10 items-center justify-center">
          <Link href="/dashboard">
            <h1 className="cursor-pointer">Home</h1>
          </Link>  
          <Link href="/spending">
            <h1>Spendings</h1>
          </Link>
          <Link href="/forecast">
            <h1>Forecast</h1>
          </Link>
          <Link href="/prediction">
            <h1>Predition </h1>
          </Link>
          <div className="h-10 w-10 rounded-3xl overflow-hidden">
            <img src={img || ""} alt="User" />
          </div>
        </div>
      </nav>
      <div id='dashboard' className='h-full w-full flex flex-col items-center justify-center relative'>
      <div>
        <img src="https://i.pinimg.com/originals/5b/ba/39/5bba3962f78bac3777d220c570d5b178.gif" alt="" />
      </div>
  


        <h1 className='text-[80px]'>
          Welcome to <span  className="inline-block">
          {"FinBubby".split("").map((letter, index) => (
                  <span key={index} className="header-letter">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
            </span>
        </h1>
        <h4 className='text-sm'>FinBuddy where Smarter spending, richer living.</h4>
      </div>
    </div> 
  );
}

export default Page;
