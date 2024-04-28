import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const LoadingAnimation = () => {
  useEffect(() => {
    const heading = document.querySelector('.text-zoom');
    if (heading) {
      heading.classList.add('animate-zoom');
    }
  }, []);

  const mainRef = useRef(null);
  const textRef = useRef(null);
  const container = useRef(null);

  useGSAP(() => {
    const mainElement = mainRef.current;
    const textElement = textRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainElement,
        start: 'top top',
        end: '+=5000',
        scrub: true,
        markers: true,
        pin: mainElement,
      },
    });
    tl.fromTo(
      textElement,
      { opacity: 1 },
      {
        opacity: 0,
        ease: 'none',
        smoothOrigin: true,
      }
    );
  }, { scope: container });

  return (
    <div
      ref={mainRef}
      className="relative h-screen flex justify-center items-center bg-cover font-sans"
      style={{
        backgroundImage: 'url(https://c1.wallpaperflare.com/preview/197/856/926/earth-world-lighting-night.jpg)',
      }}
    >
      <div className="absolute text-center text-black">
        <h1 className="text-7xl font-bold text-zoom text-white  mb-8 ">
          Welcome to this website
        </h1>
        <p
        className="text-lg text-[#EDE8F5] sm:w-2/4 w-full mx-auto p-4 sm:p-2"
        ref={textRef}
        >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repellat
        voluptatum consequuntur ad. Atque officiis, fuga explicabo ducimus ea illo
        quibusdam obcaecati tenetur repudiandae molestiae. Repudiandae fugiat error
        quisquam labore.
      </p>
        <h2 className="mt-12  bg-gray-100 border border-black text-[#8697c4] w-fit px-2 mx-auto text-lg animate-bounce font-semibold">
          Explore Annual Population Statistics Below 
          <svg className="animate-bounce w-6 h-6 ml-[40%] mt-1" fill="#8697c4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        </h2>
      </div>
    </div>
  );
};

export default LoadingAnimation;
