/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { Helmet } from 'react-helmet'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function App() {
  useEffect(() => {
    document.title = "Grand Theft Auto VI - Rockstar Games";
    // Add favicon
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = 'image/png';
      newLink.href = '/rklogo.png';
      document.head.appendChild(newLink);
    }
  }, []);

  let [showContent, setShowContent] = useState(false);
  let [isMuted, setIsMuted] = useState(true);
  let [player, setPlayer] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize SoundCloud Widget API
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const iframe = document.getElementById('soundcloud-player');
      // @ts-ignore
      const widget = window.SC.Widget(iframe);
      setPlayer(widget);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.play();
        setIsMuted(false);
      } else {
        player.pause();
        setIsMuted(true);
      }
    }
  };

  useGSAP(()=>{
    const tl = gsap.timeline();
    // Initial reveal animation with left-to-right tilt
    tl.fromTo(
      ".svg",
      { scale: 0, opacity: 0, rotateZ: -5 },
      { scale: 1, opacity: 1, rotateZ: -5, duration: 1, ease: "Power4.easeOut" }
    )
    .to(
      ".vi-mask-group",
      { scale: 1.2, rotateZ: 3, duration: 1.5, ease: "Power2.easeInOut", transformOrigin: "50% 50%" }
    )
    .to(
      ".vi-mask-group",
      { scale: 0, opacity: 0, rotateZ: 15, duration: 1, ease: "Power4.easeIn",
        onComplete: () => {
          // Completely remove the SVG from the DOM
          const svgElement = document.querySelector(".svg");
          if (svgElement) svgElement.remove();
          setShowContent(true);
        }
      }
    );
  }, []);

  // Add a separate effect for main content animation
  useEffect(() => {
    if (showContent) {
      // Animated main content when it appears
      gsap.to(".main", {
        opacity: 1,
        duration: 0.8,
        ease: "Power2.easeOut",
        delay: 0.1
      });
    }
  }, [showContent]);

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

  useEffect(() => {
    if (!showContent) return;
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });
    return () => scroll && scroll.destroy();
  }, [showContent]);

  return (
    <>
      <Helmet>
        <title>ROCKSTAR GAMES - GRAND THEFT AUTO VI</title>
      </Helmet>
      <div className="fixed bottom-5 right-5 z-[999]">
        <iframe 
          id="soundcloud-player"
          width="0" 
          height="0" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/126780725&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
          className="hidden"
        ></iframe>
        
        <button 
          onClick={toggleMute}
          className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
        >
          {isMuted ? (
            <i className="ri-volume-mute-fill text-2xl"></i>
          ) : (
            <i className="ri-volume-up-fill text-2xl"></i>
          )}
        </button>
      </div>

      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="viGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#7b2ff2" />
              <stop offset="50%" stop-color="#f357a8" />
              <stop offset="100%" stop-color="#ffdb70" />
            </linearGradient>
            <linearGradient id="viStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a259f7" />
              <stop offset="100%" stop-color="#f357a8" />
            </linearGradient>
          </defs>
          <g className="vi-mask-group">
            <text
              x="50%"
              y="50%"
              fontSize="250"
              textAnchor="middle"
              fill="url(#viGradient)"
              stroke="url(#viStroke)"
              strokeWidth="10"
              dominantBaseline="middle"
              fontFamily="Arial Black, Bebas Neue, sans-serif"
              style={{ paintOrder: 'stroke fill' }}
            >
              VI
            </text>
          </g>
        </svg>
      </div>
      {showContent && (
        <div data-scroll-container ref={scrollRef} className='main w-full absolute top-0 left-0 z-[101] opacity-0'>
            <div className='landing w-full h-screen bg-black'>
              <div className="nav absolute top-0 left-0 w-full z-[100] py-10 px-10">
                    <div className="logo-element flex gap-[7px]">
                      <div className="lines flex flex-col gap-[5px]">
                        <div className="line bg-white w-12 h-1"></div>
                        <div className="line bg-white w-8 h-1"></div>
                        <div className="line bg-white w-5 h-1"></div>
                      </div>
                      <div className="logo text-white text-3xl -mt-[10px]"><h1>Rockstar</h1></div>
                    </div>
              </div>
                <div className='hero-image relative h-screen w-full overflow-hidden'>
                <img src='./sky.png' className='sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' />    
                <img src='./bg.png' className='bg scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' />    
                <div className="gta-text absolute flex flex-col gap-3 text-white top-10 left-1/2 -translate-x-1/3">
                <h1 className='text-[8rem] leading-none -ml-20'>grand</h1>
                <h1 className='text-[8rem] leading-none ml-15'>theft</h1>
                <h1 className='text-[8rem] leading-none -ml-20'>auto</h1></div>
                <img src="./girlbg.png" className='girl absolute -bottom-[50%] left-1/2 -translate-x-1/2 scale-90' />
                <div className="btmbar flex items-center text-white absolute w-full px-10 py-5 bg-gradient-to-t from-black to-transparent bottom-0 left-0 z-10">
                  <div className='flex gap-4 items-center'>
                    <i className="text-2xl ri-arrow-down-line"></i>
                    <h2 className='text-xl font-[sans-serif]'>
                      Scroll Down
                    </h2>
                  </div>
                  <img className='h-11 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src="./ps5.png" alt="" />
                </div>
                </div>
            </div>

            <div className="video-section w-[calc(100%-80px)] h-150 bg-black relative overflow-hidden mx-10 my-15 rounded-3xl">
              <iframe 
                className="absolute top-0 left-0 w-full h-full scale-150"
                src="https://www.youtube.com/embed/VQRLujxTm3c?autoplay=1&mute=1&loop=1&playlist=VQRLujxTm3c&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&start=3"
                title="GTA VI Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
            </div>

            <div className="page2 h-screen w-full bg-black p-10">
              <div className="cntnr h-full w-full  flex itmes-center p-10" >
                        <div className="left h-full w-1/2  flex itmes-center ">
                        <img src="./imag.png" alt="" className='scale-[1.2]'/></div>
                        <div className="right h-full w-1/2  flex flex-col  pt-20 text-white">
                          <h1 className='text-5xl my-10 font-["Bebas Neue"] tracking-wider'>WELCOME TO VICE CITY</h1>
                          <p className='font-["Helvetica"] text-xl leading-relaxed tracking-wide text-gray-200 font-light'>
                            Experience the neon-lit streets of Vice City in the most ambitious Grand Theft Auto ever. Navigate through a world of crime, luxury, and chaos as you rise through the ranks of the criminal underworld. With stunning visuals, immersive gameplay, and a gripping narrative, GTA VI sets a new standard for open-world gaming.
                          </p>
                          <a href="https://www.rockstargames.com/VI" rel="noopener noreferrer">
                            <button className='cursor-pointer mt-10 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-md hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-yellow-500/30'>
                              DOWNLOAD NOW
                            </button>
                          </a>
                        </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="features-section w-full bg-black py-20">
              <div className="container mx-auto px-10">
                <h2 className="text-5xl font-['Bebas Neue'] tracking-wider text-white mb-16 text-center">EXPERIENCE VICE CITY</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="feature-card bg-black/50 p-8 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
                    <div className="icon mb-6">
                      <i className="ri-map-pin-line text-4xl text-yellow-500"></i>
                    </div>
                    <h3 className="text-2xl font-['Bebas Neue'] text-white mb-4">EXPANSIVE WORLD</h3>
                    <p className="text-gray-300 font-['Helvetica']">Explore the vast, neon-lit streets of Vice City, from pristine beaches to the criminal underworld.</p>
                  </div>
                  <div className="feature-card bg-black/50 p-8 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
                    <div className="icon mb-6">
                      <i className="ri-user-heart-line text-4xl text-yellow-500"></i>
                    </div>
                    <h3 className="text-2xl font-['Bebas Neue'] text-white mb-4">DYNAMIC CHARACTERS</h3>
                    <p className="text-gray-300 font-['Helvetica']">Meet a cast of unforgettable characters in a story of crime, passion, and betrayal.</p>
                  </div>
                  <div className="feature-card bg-black/50 p-8 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
                    <div className="icon mb-6">
                      <i className="ri-game-line text-4xl text-yellow-500"></i>
                    </div>
                    <h3 className="text-2xl font-['Bebas Neue'] text-white mb-4">REVOLUTIONARY GAMEPLAY</h3>
                    <p className="text-gray-300 font-['Helvetica']">Experience the most advanced and immersive gameplay mechanics in the series.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Characters Section */}
            <div className="characters-section w-full bg-black py-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
              <div className="container mx-auto px-10 relative z-10">
                <h2 className="text-5xl font-['Bebas Neue'] tracking-wider text-white mb-16 text-center">MEET THE CHARACTERS</h2>
                
                {/* IGN Character Showcase */}
                <div className="character-showcase mb-20 relative group">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="https://sm.ign.com/t/ign_in/feature/e/every-note/every-noteworthy-character-in-gta-6_1pmv.2560.jpg" 
                      alt="GTA VI Characters" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-4xl font-['Bebas Neue'] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      THE CAST OF VICE CITY
                    </h3>
                    <p className="text-gray-300 font-['Helvetica'] max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Meet the diverse cast of characters that bring the streets of Vice City to life. From street hustlers to crime bosses, each character has their own story to tell.
                    </p>
                  </div>
                </div>

                
              </div>
            </div>

            {/* Pre-order Section */}
            <div className="preorder-section w-full bg-black py-20">
              <div className="container mx-auto px-10">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-6xl font-['Bebas Neue'] tracking-wider text-white mb-8">PRE-ORDER NOW</h2>
                  <p className="text-xl text-gray-300 font-['Helvetica'] mb-12">Get exclusive bonuses and be among the first to experience the next chapter in the Grand Theft Auto saga.</p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <a href="https://www.rockstargames.com/VI" rel="noopener noreferrer" className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-md hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-yellow-500/30">
                      STANDARD EDITION
                    </a>
                    <a href="https://www.rockstargames.com/VI" rel="noopener noreferrer" className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold rounded-md hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-yellow-500/30">
                      COLLECTOR'S EDITION
                    </a>
                  </div>
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bonus-item">
                      <i className="ri-car-line text-4xl text-yellow-500 mb-4"></i>
                      <h4 className="text-xl font-['Bebas Neue'] text-white mb-2">EXCLUSIVE VEHICLE</h4>
                      <p className="text-gray-400 font-['Helvetica']">Get a unique vehicle only available to pre-order customers</p>
                    </div>
                    <div className="bonus-item">
                      <i className="ri-money-dollar-circle-line text-4xl text-yellow-500 mb-4"></i>
                      <h4 className="text-xl font-['Bebas Neue'] text-white mb-2">STARTING CASH</h4>
                      <p className="text-gray-400 font-['Helvetica']">Begin your journey with a significant cash bonus</p>
                    </div>
                    <div className="bonus-item">
                      <i className="ri-shirt-line text-4xl text-yellow-500 mb-4"></i>
                      <h4 className="text-xl font-['Bebas Neue'] text-white mb-2">EXCLUSIVE OUTFITS</h4>
                      <p className="text-gray-400 font-['Helvetica']">Unlock special character outfits from day one</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-black py-5 border-t border-yellow-500/20">
              <div className="container mx-auto px-10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0">
                    <img src="./rklogo.png" alt="Rockstar Games" className="h-8" />
                  </div>
                  <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <i className="ri-facebook-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <i className="ri-twitter-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <i className="ri-instagram-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <i className="ri-youtube-fill text-2xl"></i>
                    </a>
                  </div>
                </div>
                <div className="-mt-8 text-center text-gray-500 text-sm">
                  <p>© 2024 Rockstar Games. All rights reserved.</p>
                </div>
              </div>
            </footer>
        </div>
      )}
    </>
  )
}

export default App