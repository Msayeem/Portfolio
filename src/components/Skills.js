export default function Skills() {
  // 1. Replace icon strings with image URLs
  const frontendSkills = [
    { name: "HTML5", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "NextJS", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind Css", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "JavaScript", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "ReactJS", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  ];

  const backendSkills = [
    { name: "NodeJS", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "ExpressJS", level: "Expert", iconUrl: "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png" },
    { name: "MongoDB", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];

  const SkillCard = ({ title, skills }) => (
    <div className="glass-card p-6 md:p-8 rounded-xl">
      <h3 className="font-headline-md text-headline-md text-center mb-10 text-white">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-start gap-3">
            {/* 2. Swapped out the span icon for a styled image tag */}
            <img 
              src={skill.iconUrl} 
              alt={`${skill.name} icon`}
              className="w-6 h-6 object-contain mt-1" 
            />
            <div>
              <p className="font-body-md text-body-md font-bold text-white">{skill.name}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {skill.level}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 max-w-[1200px] mx-auto px-gutter" id="skills">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg mb-2 text-white">Skills</h2>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          My Technical Level
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkillCard title="Frontend Developer" skills={frontendSkills} />
        <SkillCard title="Backend Developer" skills={backendSkills} />
      </div>
    </section>
  );
}