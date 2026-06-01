"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import Image from "next/image";
import { IoMailOutline, IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

// Register ScrollTrigger for the background parallax
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const [showEmailCard, setShowEmailCard] = useState(false);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    // 1. Entrance Animations Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".animate-profile", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      delay: 0.2
    })
    .from(".animate-text", {
      y: 40,
      opacity: 0,
      duration: 1,
    }, "-=0.8") // Starts 0.8s before the profile animation finishes
    .from(".animate-actions", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.6");

    // 2. Performance-Optimized Background Parallax
    gsap.to("#home", {
      backgroundPositionY: "100px", // Adjust value to change intensity
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true // Syncs animation precisely with the scrollbar scroll position
      }
    });

  }, { scope: container });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("msayeem223@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "Github",
      href: "https://github.com/Msayeem",
      icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sayem-dev",
      icon: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMS0xMC5wbmc.png",
    },
  ];

  return (
    <section
      ref={container}
      className="pt-32 pb-20 radial-gradient-bg min-h-screen flex flex-col items-center justify-center text-center px-gutter relative"
      id="home"
    >
      {/* Profile Image Wrapper */}
      <div className="animate-profile relative mb-8 opacity-100">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/20 p-1 relative mx-auto">
          <Image
            alt="Sayem Profile"
            className="w-full h-full rounded-full object-cover"
            src="/sayem2.png"
            width={160}
            height={160}
            priority
          />
        </div>
      </div>
      
      {/* Main Headline Heading */}
      <h1 className="animate-text font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl max-w-4xl mb-8 leading-tight opacity-100">
        Building <span className="text-primary">modern web applications</span>{" "}
        with a focus on aesthetics, functionality and accessibility.
      </h1>

      <div className="flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
        <div className="animate-actions flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto px-4 sm:px-0 opacity-100">
          
          {/* Main Contact Trigger Button */}
          <button 
            onClick={() => setShowEmailCard(!showEmailCard)}
            className="w-full sm:w-auto bg-white text-on-primary-fixed px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all duration-300 cursor-pointer shadow-md"
          >
            <IoMailOutline className="text-xl" />
            Contact me
          </button>

          {/* Social Media Anchors */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:text-secondary transition-colors"
                href={social.href}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt={social.name}
                  className="w-6 h-6 invert"
                  src={social.icon}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Email Action Drawer */}
        {showEmailCard && (
          <div className="mt-4 w-full bg-neutral-900 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl animate-fade-in mx-4 sm:mx-0">
            <div className="text-left w-full sm:w-auto">
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Direct Email</p>
              <p className="text-sm font-mono text-white selection:bg-primary/30">msayeem223@gmail.com</p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors text-white"
                title="Copy Address"
              >
                {copied ? (
                  <>
                    <IoCheckmarkCircleOutline className="text-emerald-400 text-base" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <IoCopyOutline className="text-base" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold bg-primary text-white rounded-md hover:opacity-90 transition-opacity text-center"
              >
                Open App
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}