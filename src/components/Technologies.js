import Image from "next/image";

export default function Technologies() {
  const techs = [
    {
      name: "JavaScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/250px-Unofficial_JavaScript_logo_2.svg.png?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
    },
    {
      name: "React",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png",
    },
    {
      name: "Next.js",
      icon: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
      invert: true,
    },
    {
      name: "Node.js",
      icon: "https://images.icon-icons.com/2415/PNG/512/nodejs_original_logo_icon_146411.png",
    },
    {
      name: "Express",
      icon: "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png",
      invert: true,
    },
    {
      name: "MongoDB",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITHn_TgjDyhdWvePNw0mveDrTUr00GLfv_Q&s",
    },
 
    {
      name: "Tailwind CSS",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s",
    },
    {
      name: "Git",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToe0l-0KLyx6JieGAzMvk4agH-sjPkWtNs9A&s",
    },

  ];

  return (
    <section className="py-20 max-w-[1200px] mx-auto px-gutter">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg mb-2 text-white">Technologies</h2>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          My Tech Stack
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-10 gap-x-4 place-items-center">
        {techs.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center gap-3">
            <div className="tech-icon-container">
              <Image
                alt={tech.name}
                className={`w-8 h-8 ${tech.invert ? "invert" : ""}`}
                src={tech.icon}
                width={32}
                height={32}
              />
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
