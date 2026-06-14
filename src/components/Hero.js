"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { IoMailOutline, IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import useCursorFollower from "../../hooks/useCursorFollower";
import useMagnetic from "../../hooks/useMagnetic";
import useParallax from "../../hooks/useParallax";

gsap.registerPlugin(ScrollTrigger);

// Magnetic wrapper component
function Magnetic({ children, strength = 0.3 }) {
  const ref = useMagnetic(strength);
  return <div ref={ref} className="inline-block w-full sm:w-auto">{children}</div>;
}

export default function Hero() {
  const container = useRef(null);
  const [showEmailCard, setShowEmailCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const { setPointer, setDefault } = useCursorFollower();

  // Apply mouse-based parallax to various depth layers
  const bgGridRef = useParallax(0.05, "mouse");
  const textParallaxRef = useParallax(0.08, "mouse");
  const profileParallaxRef = useParallax(0.15, "mouse");
  
  // Floating elements parallax
  const floatTag1Ref = useParallax(0.25, "mouse");
  const floatTag2Ref = useParallax(0.2, "mouse");
  const floatTag3Ref = useParallax(0.3, "mouse");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    // Animate the words in the headline
    tl.fromTo(".word-reveal", 
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.2
      }
    )
    // Scale in profile picture and rings
    .fromTo(".animate-profile-wrapper", {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: "elastic.out(1, 0.75)"
    }, "-=0.9")
    // Slide in the floating glassmorphic tags
    .fromTo(".floating-tag", {
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.0,
      stagger: 0.12,
      ease: "back.out(1.7)"
    }, "-=1.0")
    // Fade up CTA buttons & socials
    .fromTo(".animate-actions", {
      y: 25,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08
    }, "-=0.7");

    // Continuous smooth floating motion for the profile avatar frame
    gsap.to(".floating-avatar-container", {
      y: -12,
      x: 6,
      rotation: 1.5,
      duration: 5.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Slow rotation for dashed background rings
    gsap.to(".rotating-dashed-ring", {
      rotation: 360,
      duration: 40,
      ease: "none",
      repeat: -1
    });

    // Layered Scroll Parallax
    gsap.to(".scroll-parallax-bg", {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".scroll-parallax-content", {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".scroll-parallax-visual", {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
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
      icon: <FaGithub size={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sayem-dev",
      icon: <FaLinkedin size={20} />,
    },
  ];

  // Headline words breakdown for word-by-word stagger
  const headlineWords = [
    { text: "Building", gradient: false },
    { text: "modern", gradient: true },
    { text: "web", gradient: true },
    { text: "applications", gradient: true },
    { text: "with", gradient: false },
    { text: "a", gradient: false },
    { text: "focus", gradient: false },
    { text: "on", gradient: false },
    { text: "aesthetics,", gradient: false },
    { text: "functionality", gradient: false },
    { text: "and", gradient: false },
    { text: "accessibility.", gradient: false }
  ];

  return (
    <section
      ref={container}
      className="min-h-screen pt-32 pb-16 flex items-center justify-center relative overflow-hidden radial-gradient-bg px-6 lg:px-16"
      id="home"
    >
      {/* Premium Grid Overlay with Mouse Parallax */}
      <div 
        ref={bgGridRef} 
        className="scroll-parallax-bg absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-40 z-0" 
      />

      {/* Floating Ambient Glowing Blobs */}
      <div className="absolute w-[50vw] h-[50vw] rounded-full glow-orb-cyan top-[10%] left-[-10%] pointer-events-none z-0" />
      <div className="absolute w-[40vw] h-[40vw] rounded-full glow-orb-emerald bottom-[5%] right-[-10%] pointer-events-none z-0" />

      {/* Hero Content Wrapper */}
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Display Typography & CTAs */}
        <div 
          ref={textParallaxRef} 
          className="scroll-parallax-content lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Visual Badge Indicator */}
          <div className="animate-actions opacity-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-on-surface-variant uppercase font-bold">
              Available for Opportunities
            </span>
          </div>

          {/* Headline Text */}
          <h1 className="text-4xl sm:text-5xl lg:text-headline-xl font-headline-xl leading-tight mb-6 select-text tracking-tight font-black">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="heading-mask mr-2 sm:mr-3 inline-block">
                <span className={`word-reveal inline-block ${word.gradient ? "text-gradient-cyan-emerald" : "text-white"}`}>
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="animate-actions opacity-0 text-base sm:text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed font-medium">
            Crafting elegant, accessible interfaces and reliable full-stack applications. Focusing on modern architectures that perform flawlessly.
          </p>

          {/* Action Row */}
          <div className="animate-actions opacity-0 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            {/* Magnetic Contact Button */}
            <Magnetic strength={0.2}>
              <button 
                onClick={() => setShowEmailCard(!showEmailCard)}
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
                className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-lg font-bold flex items-center justify-center gap-2.5 hover:bg-primary hover:text-black transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(103,232,249,0.35)] active:scale-95 text-sm"
              >
                <IoMailOutline className="text-lg" />
                Contact me
              </button>
            </Magnetic>

            {/* Social Media Anchors */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <Magnetic key={social.name} strength={0.35}>
                  <a
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.03] hover:text-primary hover:bg-white/[0.08] hover:border-primary/25 transition-all duration-300 shadow-md border border-white/5"
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={setPointer}
                    onMouseLeave={setDefault}
                  >
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Email Copy Card Drawer */}
          {showEmailCard && (
            <div className="mt-6 w-full max-w-md bg-neutral-950/80 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] animate-fade-in backdrop-blur-xl">
              <div className="text-left w-full sm:w-auto">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider font-mono">Direct Email</p>
                <p className="text-sm font-mono text-white select-all">msayeem223@gmail.com</p>
              </div>
              
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={setPointer}
                  onMouseLeave={setDefault}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors text-white cursor-pointer active:scale-95"
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
                  onMouseEnter={setPointer}
                  onMouseLeave={setDefault}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-primary text-black rounded-md hover:opacity-90 transition-all text-center active:scale-95 shadow-[0_4px_12px_rgba(103,232,249,0.2)] font-mono"
                >
                  Open App
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Immersive Profile Image & Floating Tags */}
        <div 
          ref={profileParallaxRef} 
          className="scroll-parallax-visual lg:col-span-5 flex items-center justify-center relative select-none"
        >
          <div className="animate-profile-wrapper opacity-0 relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[360px] lg:h-[360px] flex items-center justify-center">
            
            {/* Background layered glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 blur-2xl -z-10 scale-105" />
            <div className="absolute inset-[-10px] rounded-full border border-white/5 -z-10" />
            <div className="rotating-dashed-ring absolute inset-[-30px] rounded-full border border-dashed border-white/5 -z-10" />

            {/* Profile Avatar Frame */}
            <div className="floating-avatar-container w-full h-full rounded-2xl p-1.5 bg-gradient-to-br from-white/10 to-white/0 border border-white/15 shadow-[0_0_60px_-15px_rgba(103,232,249,0.25)] relative overflow-hidden group">
              {/* Overlay glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 to-secondary/5 group-hover:opacity-100 opacity-0 transition-opacity duration-700 -z-10" />
              
              <Image
                alt="Sayem Profile"
                className="w-full h-full rounded-xl object-cover bg-neutral-950 scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                src="/sayem2.png"
                width={360}
                height={360}
                priority
              />
            </div>

            {/* Layered Floating Tech Pills around Avatar */}
            <div 
              ref={floatTag1Ref} 
              className="floating-tag absolute top-[-5px] left-[-30px] z-20"
            >
              <div className="tech-pill px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#61dafb] shadow-[0_0_8px_#61dafb]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">React</span>
              </div>
            </div>

            <div 
              ref={floatTag2Ref} 
              className="floating-tag absolute bottom-[30px] left-[-40px] z-20"
            >
              <div className="tech-pill px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ed64] shadow-[0_0_8px_#00ed64]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">MongoDB</span>
              </div>
            </div>

            <div 
              ref={floatTag3Ref} 
              className="floating-tag absolute top-[60px] right-[-45px] z-20"
            >
              <div className="tech-pill px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Next.js</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Premium Scrolling Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-secondary"
            animate={{ y: ["0%", "200%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.2, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>
    </section>
  );
}