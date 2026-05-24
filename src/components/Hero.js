"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMailOutline, IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Hero() {
  const [showEmailCard, setShowEmailCard] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = document.getElementById("home");
      if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.1) + "px";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("msayeem223@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "Github",
      href: "https://github.com/Msayeem",
      icon: "https://e7.pngegg.com/pngimages/646/324/png-clipart-github-computer-icons-github-logo-monochrome-thumbnail.png",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sayem-dev",
      icon: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMS0xMC5wbmc.png",
    },
  ];

  return (
    <section
      className="pt-32 pb-20 radial-gradient-bg min-h-screen flex flex-col items-center justify-center text-center px-gutter relative"
      id="home"
    >
      <div className="relative mb-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/20 p-1 relative mx-auto">
          <Image
            alt="Sayem Profile"
            className="w-full h-full rounded-full object-cover"
            src="/sayem.jpg"
            width={160}
            height={160}
            priority
          />
        </div>
      </div>
      
      <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl max-w-4xl mb-8 leading-tight">
        Building <span className="text-primary">modern web applications</span>{" "}
        with a focus on aesthetics, functionality and accessibility.
      </h1>

      <div className="flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto px-4 sm:px-0">
          
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
              {/* Copy Action */}
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

              {/* Native Mail Client Action */}
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