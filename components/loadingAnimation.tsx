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
      className="relative h-screen flex justify-center items-center bg-cover"
      style={{
        backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1682001801592-7be1661d6ef7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="absolute text-center text-black">
        <h1 className="text-7xl font-bold text-zoom text-orange-300  mb-8">
          Welcome to this website
        </h1>
        <p
          className="mt-4 text-lg bg-gray-200 border border-black w-1/4 mx-auto p-4"
          ref={textRef}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repellat
          voluptatum consequuntur ad. Atque officiis, fuga explicabo ducimus ea illo
          quibusdam obcaecati tenetur repudiandae molestiae. Repudiandae fugiat error
          quisquam labore.
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
