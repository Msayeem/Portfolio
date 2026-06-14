"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import useScrollReveal from "../../hooks/useScrollReveal";
import useCursorFollower from "../../hooks/useCursorFollower";
import useMagnetic from "../../hooks/useMagnetic";

function Magnetic({ children, strength = 0.3 }) {
  const ref = useMagnetic(strength);
  return <div ref={ref} className="inline-block">{children}</div>;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { setPointer, setDefault } = useCursorFollower();

  // Scroll reveal entrance transition
  const footerRef = useScrollReveal({ y: 30, opacity: 0 });

  return (
    <footer 
      ref={footerRef}
      className="bg-black border-t border-white/5 w-full py-16 md:py-24 mt-20 opacity-0 select-none"
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1300px] mx-auto px-gutter gap-8">
        
        {/* Logo */}
        <Magnetic strength={0.3}>
          <div 
            className="font-mono text-base sm:text-lg text-white font-bold cursor-pointer hover:text-primary transition-colors duration-300"
            onMouseEnter={setPointer}
            onMouseLeave={setDefault}
            onClick={() => {
              const el = document.getElementById("home");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {`{Sayem}`}
          </div>
        </Magnetic>

        {/* Copyright notice */}
        <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 text-center order-3 md:order-2">
          © {currentYear} Muhammed Sayem. Built with precision.
        </div>

        {/* Social Anchors (Link preservation rule adhered to exactly) */}
        <div className="flex gap-6 order-2 md:order-3">
          <Magnetic strength={0.4}>
            <a
              className="text-gray-400 hover:text-primary transition-colors block p-1"
              href="https://www.linkedin.com/in/sayem-dev"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={setPointer}
              onMouseLeave={setDefault}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </Magnetic>
          
          <Magnetic strength={0.4}>
            <a
              className="text-gray-400 hover:text-primary transition-colors block p-1"
              href="https://github.com/Msayeem"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={setPointer}
              onMouseLeave={setDefault}
              aria-label="GitHub Profile"
            >
              <FaGithub className="text-xl" />
            </a>
          </Magnetic>
        </div>

      </div>
    </footer>
  );
}
