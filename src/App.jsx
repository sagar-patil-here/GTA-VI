/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
function App() {
let [showContent, setShowContent] = useState(false);
useGSAP(()=>{
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
        rotate : 10,
        duration : 2,
        ease : "Power4.easeInOut",
        transformOrigin : "50% 50%",
    }
    ).to(".vi-mask-group", {
        scale : 10,
        duration : 2,
        delay : -1.8,
        ease : "Expo.easeInOut",
        transformOrigin : "50% 50%",
        opacity : 0,
        onUpdate : () => {
            if(tl.progress() >= 0.9){
                document.querySelector(".svg").remove();
                setShowContent(true);
                tl.kill();

            }
        }
    });
});

useGSAP(()=>{
  const main = document.querySelector('.main');

  main?.addEventListener('mousemove', function(e){
    const xMove = (e.clientX / window.innerWidth - 0.5) * 30;
      gsap.to(".hero-image .gta-text", {
        x: `${-50 + xMove * 0.5}%`,
        ease: "power2.out",
        duration: 0.5
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

 



  return (
    <>
     <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className='main w-full'>
            <div className='landing w-full h-screen bg-black'>
              <div className="nav absolute top-0 left-0 w-full z-[100] py-10 px-10">
                    <div className="logo-element flex gap-[7px]">
                      <div className="lines flex flex-col gap-[5px]  ">
                        <div className="line bg-white w-12 h-1 "></div>
                        <div className="line bg-white w-8 h-1 "></div>
                        <div className="line bg-white w-5 h-1"></div>
                      </div>
                      <div className="logo text-white text-3xl -mt-[10px]"><h1>Rockstar</h1></div>
                    </div>
              </div>
                <div className='hero-image relative h-screen w-full overflow-hidden'  >
                <img src='./sky.png' className='sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' />    

                <img src='./bg.png' className='bg  scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' />    
                <div className="gta-text absolute  flex flex-col gap-3 text-white top-10 left-1/2 -translate-x-1/3 ">
                <h1  className='text-[8rem] leading-none -ml-20'>grand</h1>
                <h1 className='text-[8rem] leading-none ml-15'>theft</h1>
                <h1 className='text-[8rem] leading-none -ml-20'>auto</h1></div>
                <img src="./girlbg.png" className='girl absolute -bottom-[50%] left-1/2 -translate-x-1/2 scale-90' />
                
                </div>
                <div className="btmbar flex items-center text-white absolute w-full px-10 py-15 bg-gradient-to-t from-black to-transparent bottom-0 left-0">
              
                  <div className='flex gap-4 items-center'>  <i class="text-2xl ri-arrow-down-line"></i>
                    <h2 className='text-xl-100 font-[sans-serif]'>
                      Scroll Down
                      </h2></div>
                      <img className='h-11 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' src="./ps5.png" alt="" />
                </div>
            </div>

            <div className="page2 h-screen w-full bg-black">
              
            </div>

        </div>
      )}
    </>
  )
}

export default App