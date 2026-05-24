import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-300 selection:bg-green-500 selection:text-black p-6 sm:p-12 md:p-16 lg:p-24">
      <div className="max-w-5xl w-full space-y-16 md:space-y-24">
        
        {/* --- ABOUT ME SECTION --- */}
        <section id="about" aria-label="About Me">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              About Me
            </h2>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-12 lg:gap-20">
            {/* Bio Text */}
            <div className="flex-1 space-y-6 text-base sm:text-lg leading-relaxed text-gray-400">
              <p>
                I'm Muhammed Sayem. A{" "}
                <span className="text-cyan-500 font-medium">Web Developer</span>{" "}
                With A Passion For{" "}
                <span className="text-cyan-500 font-medium">
                  Transforming Ideas, Interactive Web Experiences.
                </span>{" "}
                While Early In My Career, I Bring Fresh Perspectives And A Dedication
                To Creating Intuitive, Polished{" "}
                <span className="text-cyan-500 font-medium">
                  Applications That Truly Connect With Users.
                </span>{" "}
                Every Line Of Code Is A Step Toward Mastering My Craft, And I'm
                Excited To Deliver Projects That Are Both Beautiful And Functional.
              </p>
              <p>
                Beyond My{" "}
                <span className="text-cyan-500 font-medium">Front-End Focus</span>
                , I Also Draw On{" "}
                <span className="text-cyan-500 font-medium">
                  Experience With Back-End And Full-Stack Projects
                </span>
                , Allowing Me To Approach Challenges From Different Angles And
                Provide Well-Rounded Solutions. My Goal Is Not Just To Meet
                Expectations But To Exceed Them,{" "}
                <span className="text-cyan-500 font-medium">
                  Delivering High-Quality, Impactful Work That Clients Can Rely On.
                </span>
              </p>
              <p className="text-white font-medium">
                Let's Build Something Unforgettable! 🚀
              </p>
            </div>

            {/* Profile Image Wrapper */}
            <div className="flex-shrink-0">
              <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl">
                <Image
                  alt="Angel Garcia Profile Picture"
                  src="/sayem.jpg" // Change this safely to your local image inside your public/ directory
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- GET IN TOUCH SECTION --- */}
        <section className="text-center space-y-8 py-12" id="contact">
          <div className="space-y-4 px-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono tracking-tight">
              Get In Touch
            </h2>
            <div className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              <p>
                Focused On{" "}
                <span className="text-cyan-500 font-medium">
                  Full-stack Development.
                </span>
              </p>
              <p>Let's Connect And Bring Your Project To Life!</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-4 px-4">
            {/* Email Button */}
            <Link
  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
  href="mailto:msayeem223@gmail.com?subject=Opportunity%20Inquiry%20-%20Full%20Stack%20Developer"
  target="_blank"
>
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
  <span>Email</span>
</Link>


            {/* LinkedIn Button */}
            <Link
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
              href="https://www.linkedin.com/in/sayem-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Linkedin</span>
            </Link>

            {/* Resume Button */}
            <Link
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  fillRule="evenodd"
                />
              </svg>
              <span>Resume</span>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}