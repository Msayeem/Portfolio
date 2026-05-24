"use client";

import { useState, useEffect } from "react";
// Added FaBars (for menu) and FaTimes (for close)
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "About", href: "#about", id: "about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClass = (id) => {
    const isActive = activeSection === id;
    const base = "nav-link transition-colors font-body-md text-body-md pb-1";
    if (isActive) {
      return `${base} text-primary font-bold border-b-2 border-primary`;
    }
    return `${base} text-on-surface-variant hover:text-on-surface`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-gutter">
        <div className="flex justify-between items-center h-16">

          <div className="font-headline-md text-headline-md font-bold text-primary">
            {`{Sayem}`}
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                className={getLinkClass(link.id)}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Social Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-5 text-primary">
              <a 
                href="https://github.com/Msayeem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-all duration-300 scale-100 hover:scale-110"
                title="GitHub Profile"
              >
                <FaGithub size={20} />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/sayem-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-all duration-300 scale-100 hover:scale-110"
                title="LinkedIn Profile"
              >
                <FaLinkedin size={20} />
              </a>
              
              <a 
                href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry"
                className="hover:text-secondary transition-all duration-300 scale-100 hover:scale-110"
                title="Send an Email"
              >
                <FaEnvelope size={19} />
              </a>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden text-primary cursor-pointer p-1 hover:text-secondary transition-colors"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {/* Conditionally render FontAwesome icons with a clear, standard sizing */}
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5">
            <div className="flex flex-col py-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  className={`nav-link font-body-md text-body-md ${
                    activeSection === link.id
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="flex gap-5 pt-3 mt-1 border-t border-white/5 text-primary">
                <a 
                  href="https://github.com/Msayeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <FaGithub size={20} />
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/sayem-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <FaLinkedin size={20} />
                </a>
                
                <a 
                  href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry"
                  onClick={() => setIsOpen(false)}
                >
                  <FaEnvelope size={19} />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}