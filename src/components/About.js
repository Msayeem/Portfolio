"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { IoMailOutline, IoLogoLinkedin, IoDocumentTextOutline } from "react-icons/io5";
import useCursorFollower from "../../hooks/useCursorFollower";
import useMagnetic from "../../hooks/useMagnetic";
import useParallax from "../../hooks/useParallax";
import useScrollReveal from "../../hooks/useScrollReveal";

function Magnetic({ children, strength = 0.25 }) {
  const ref = useMagnetic(strength);
  return <div ref={ref} className="inline-block w-full sm:w-auto">{children}</div>;
}

export default function About() {
  const containerRef = useRef(null);
  const { setPointer, setDefault } = useCursorFollower();

  // Scroll reveals for headers
  const aboutHeaderRef = useScrollReveal({ y: 30, opacity: 0 });
  const contactHeaderRef = useScrollReveal({ y: 40, opacity: 0 });

  // Mouse-based parallax for circular bio image
  const profileParallaxRef = useParallax(0.12, "mouse");

  useGSAP(() => {
    // Gentle floating avatar motion in about section
    gsap.to(".floating-avatar-about", {
      y: -10,
      x: 4,
      rotation: -1.5,
      duration: 6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Slow rotation for dashed backdrop ring
    gsap.to(".rotating-dashed-ring-about", {
      rotation: -360,
      duration: 50,
      ease: "none",
      repeat: -1
    });
  }, { scope: containerRef });

  return (
    <main 
      ref={containerRef}
      className="bg-black text-gray-300 relative overflow-hidden"
    >
      {/* Background ambient particle anchors */}
      <div className="absolute top-[15%] right-[5%] w-2 h-2 rounded-full bg-primary/20 animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-[35%] left-[5%] w-1.5 h-1.5 rounded-full bg-secondary/20 animate-pulse pointer-events-none z-0" />

      {/* --- ABOUT ME SECTION --- */}
      <section 
        id="about" 
        className="py-32 max-w-[1300px] mx-auto px-gutter relative z-10"
        aria-label="About Me"
      >
        {/* Section Header */}
        <div ref={aboutHeaderRef} className="flex items-center gap-3 mb-16 opacity-0 select-none justify-center lg:justify-start">
          <span className="material-symbols-outlined text-headline-lg text-primary"></span>
          <h2 className="text-2xl sm:text-headline-lg font-headline-lg text-white tracking-tight">
            About Me
          </h2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          
          {/* Bio Text */}
          <div className="flex-1 space-y-8 text-base sm:text-lg leading-relaxed text-gray-400">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              I&apos;m Muhammed Sayem. A{" "}
              <span className="text-white font-bold underline decoration-primary decoration-2 underline-offset-4">Web Developer</span>{" "}
              With A Passion For{" "}
              <span className="text-white font-bold underline decoration-secondary decoration-2 underline-offset-4">
                Transforming Ideas, Interactive Web Experiences.
              </span>{" "}
              While Early In My Career, I Bring Fresh Perspectives And A Dedication
              To Creating Intuitive, Polished{" "}
              <span className="text-white font-bold">
                Applications That Truly Connect With Users.
              </span>{" "}
              Every Line Of Code Is A Step Toward Mastering My Craft, and I&apos;m
              Excited To Deliver Projects That Are Both Beautiful And Functional.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Beyond My{" "}
              <span className="text-white font-bold">Front-End Focus</span>
              , I Also Draw On{" "}
              <span className="text-white font-bold underline decoration-primary decoration-2 underline-offset-4">
                Experience With Back-End And Full-Stack Projects
              </span>
              , Allowing Me To Approach Challenges From Different Angles And
              Provide Well-Rounded Solutions. My Goal Is Not Just To Meet
              Expectations But To Exceed Them,{" "}
              <span className="text-white font-bold">
                Delivering High-Quality, Impactful Work That Clients Can Rely On.
              </span>
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black text-xl tracking-tight"
            >
              Let&apos;s Build Something Unforgettable! 🚀
            </motion.p>
          </div>

          {/* Profile Image Wrapper */}
          <div ref={profileParallaxRef} className="flex-shrink-0 relative transform-gpu select-none">
            {/* Backing Ambient Pulsating Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-3xl scale-110 animate-pulse -z-10" />
            <div className="rotating-dashed-ring-about absolute inset-[-25px] rounded-full border border-dashed border-white/5 -z-10" />

            <div className="floating-avatar-about relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl p-1 bg-gradient-to-br from-white/10 to-white/0">
              <Image
                alt="Angel Garcia Profile Picture"
                src="/sayem2.png"
                fill
                priority
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Horizontal Divider with central glowing point */}
      <div className="section-divider relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/30 blur-sm" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
      </div>

      {/* --- GET IN TOUCH SECTION --- */}
      <section 
        className="py-36 max-w-[1300px] mx-auto px-gutter text-center space-y-12 relative z-10" 
        id="contact"
      >
        {/* Background glow for finale */}
        <div className="absolute w-[450px] h-[450px] rounded-full glow-orb-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />

        <div ref={contactHeaderRef} className="space-y-6 px-4 opacity-0 select-none">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            Get In Touch
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto" />
          <div className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto space-y-2 leading-relaxed">
            <p>
              Focused On{" "}
              <span className="text-gradient-cyan-emerald font-bold">
                Full-stack Development.
              </span>
            </p>
            <p className="font-medium">Let&apos;s Connect And Bring Your Project To Life!</p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-6 px-4 max-w-4xl mx-auto pt-6">
          
          {/* Email Button */}
          <Magnetic strength={0.2}>
            <Link
              onMouseEnter={setPointer}
              onMouseLeave={setDefault}
              className="flex items-center justify-center gap-3 bg-white hover:bg-primary text-black px-8 py-4.5 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 w-full sm:w-auto text-sm"
              href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry%20-%20Full%20Stack%20Developer"
            >
              <IoMailOutline className="text-lg" />
              <span>Email me</span>
            </Link>
          </Magnetic>

          {/* LinkedIn Button */}
          <Magnetic strength={0.2}>
            <Link
              onMouseEnter={setPointer}
              onMouseLeave={setDefault}
              className="flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/30 border border-white/5 text-white px-8 py-4.5 rounded-xl font-bold transition-all duration-500 shadow-lg active:scale-95 w-full sm:w-auto text-sm"
              href="https://www.linkedin.com/in/sayem-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoLinkedin className="text-lg text-[#0a66c2]" />
              <span>LinkedIn</span>
            </Link>
          </Magnetic>

          {/* Resume Button */}
          <Magnetic strength={0.2}>
            <Link
              onMouseEnter={setPointer}
              onMouseLeave={setDefault}
              className="flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/30 border border-white/5 text-white px-8 py-4.5 rounded-xl font-bold transition-all duration-500 shadow-lg active:scale-95 w-full sm:w-auto text-sm"
              href="https://drive.google.com/file/d/13AlZGiG2AZeDG0GGcoDYEdiOqlYuhNRs/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoDocumentTextOutline className="text-lg text-secondary" />
              <span>View Resume</span>
            </Link>
          </Magnetic>

        </div>
      </section>
    </main>
  );
}