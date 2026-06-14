"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useCursorFollower from "../../hooks/useCursorFollower";
import useMagnetic from "../../hooks/useMagnetic";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "About", href: "#about", id: "about" },
];

function Magnetic({ children, strength = 0.3 }) {
  const ref = useMagnetic(strength);
  return <div ref={ref} className="inline-block">{children}</div>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { setPointer, setDefault } = useCursorFollower();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Scroll aware hide/show navbar and scrolled background trigger
  useEffect(() => {
    const handleScrollNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setShowNavbar(false); // Hide on scroll down
        } else {
          setShowNavbar(true); // Show on scroll up
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScrollNavbar, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollNavbar);
  }, [lastScrollY]);

  // Active section spy
  useEffect(() => {
    const handleScrollSpy = () => {
      let current = "home";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const getLinkClass = (id) => {
    const isActive = activeSection === id;
    const base = "nav-link font-mono text-xs uppercase tracking-wider px-4 py-2 relative transition-all duration-300 z-10 font-bold";
    if (isActive) {
      return `${base} text-black`;
    }
    return `${base} text-gray-400 hover:text-white`;
  };

  return (
    <motion.nav 
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-3 lg:py-4" 
          : "py-5 lg:py-6"
      }`}
    >
      {/* Floating Island Container */}
      <div 
        className={`max-w-[1200px] mx-auto px-6 transition-all duration-500 ${
          isScrolled 
            ? "max-w-[950px]" 
            : "max-w-[1200px]"
        }`}
      >
        <div 
          className={`flex justify-between items-center px-6 sm:px-8 h-14 sm:h-16 transition-all duration-500 rounded-2xl ${
            isScrolled 
              ? "bg-[#050505]/75 border border-white/10 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]" 
              : "bg-transparent border border-transparent"
          }`}
        >

          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-base sm:text-lg font-bold text-white cursor-pointer select-none hover:text-primary transition-colors duration-300 drop-shadow-[0_0_15px_rgba(103,232,249,0)] hover:drop-shadow-[0_0_15px_rgba(103,232,249,0.3)]"
            onMouseEnter={setPointer}
            onMouseLeave={setDefault}
            onClick={() => {
              const el = document.getElementById("home");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {`{Sayem}`}
          </motion.div>

          {/* Desktop Nav Links */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center gap-1.5"
          >
            {navLinks.map((link) => (
              <a 
                key={link.href}
                className={getLinkClass(link.id)}
                href={link.href}
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
              >
                {link.label}
                {/* Active Capsule Backdrop Pill */}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-white rounded-lg -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </motion.div>

          {/* Desktop Social Icons & Hamburger */}
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:flex items-center gap-5 text-gray-400"
            >
              <Magnetic strength={0.35}>
                <a 
                  href="https://github.com/Msayeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white block p-1 transition-colors duration-300"
                  title="GitHub Profile"
                  onMouseEnter={setPointer}
                  onMouseLeave={setDefault}
                >
                  <FaGithub size={18} />
                </a>
              </Magnetic>
              
              <Magnetic strength={0.35}>
                <a 
                  href="https://www.linkedin.com/in/sayem-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white block p-1 transition-colors duration-300"
                  title="LinkedIn Profile"
                  onMouseEnter={setPointer}
                  onMouseLeave={setDefault}
                >
                  <FaLinkedin size={18} />
                </a>
              </Magnetic>
              
              <Magnetic strength={0.35}>
                <a 
                  href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry"
                  className="hover:text-white block p-1 transition-colors duration-300"
                  title="Send an Email"
                  onMouseEnter={setPointer}
                  onMouseLeave={setDefault}
                >
                  <FaEnvelope size={17} />
                </a>
              </Magnetic>
            </motion.div>

            {/* Mobile Toggle Button */}
            <Magnetic strength={0.25}>
              <button
                className="md:hidden text-white cursor-pointer p-2 hover:text-primary transition-colors"
                onClick={toggleMenu}
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border border-white/10 rounded-2xl bg-[#050505]/90 backdrop-blur-2xl mt-2 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.href}
                    className={`nav-link font-mono text-xs uppercase tracking-wider transition-colors duration-200 py-1.5 ${
                      activeSection === link.id
                        ? "text-primary font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

                <div className="flex gap-6 pt-4 mt-2 border-t border-white/5 text-gray-400">
                  <a 
                    href="https://github.com/Msayeem"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    <FaGithub size={18} />
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/sayem-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  
                  <a 
                    href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    <FaEnvelope size={17} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  );
}