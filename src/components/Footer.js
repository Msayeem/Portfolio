import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-12 md:py-20 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-gutter gap-8">
        <div className="font-headline-md text-headline-md text-primary font-bold">
          {`{Sayem}`}
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant text-center order-3 md:order-2">
          © {currentYear} Muhammed Sayem. Built with precision.
        </div>
        <div className="flex gap-6 order-2 md:order-3">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm opacity-80 hover:opacity-100"
            href="https://www.linkedin.com/in/sayem-dev"
          >
            <FaGithub className="text-2xl"></FaGithub>
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm opacity-80 hover:opacity-100"
            href="https://github.com/Msayeem"
          >
        <FaLinkedin className="text-2xl"></FaLinkedin>
          </a>
   
        </div>
      </div>
    </footer>
  );
}
