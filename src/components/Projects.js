import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "Sport-Nest",
      description:
        "Sport-Nest is a full-stack sports facility booking platform where users can discover, book, and manage sports venues — and facility owners can list and manage their own facilities.",
      image: "/sportnest.png",
      tags: [
        { label: "Next.js", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
        { label: "React", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", dot: "bg-cyan-400" },
        { label: "Node.js", bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", dot: "bg-green-400" },
        { label: "Express.js", bg: "bg-neutral-500/10", text: "text-neutral-300", border: "border-neutral-500/20", dot: "bg-neutral-400" },
        { label: "MongoDB", bg: "bg-green-600/10", text: "text-green-500", border: "border-green-600/20", dot: "bg-green-500" },
        { label: "Tailwind CSS", bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/Sport-Nest",
      link: "https://sport-nest-blue.vercel.app"
    },
    {
      title: "Mango Books",
      description:
        "A modern book borrowing platform with smart discovery and secure authentication.",
      image: "/mango.png",
      tags: [
        { label: "Next.js", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
        { label: "React", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", dot: "bg-cyan-400" },
        { label: "Tailwind CSS", bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/mango",
      link: "https://mango-swart-five.vercel.app"
    },
    {
      title: "Keen-keeper",
      description:
        "A personal connection tracker for staying in touch with the people that matter.",
      image: "/keenkeeper.png",
      tags: [
          { label: "Next.js", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
        { label: "React", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", dot: "bg-cyan-400" },
        { label: "Tailwind CSS", bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/Keen-keeper",
      link: "https://msayeem.github.io/Keen-keeper"
    },
    {
      title: "Digi-Tools",
      description:
        "A sleek marketplace connecting users with digital professionals.",
      image: "/digitools.png",
      tags: [
        { label: "React", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", dot: "bg-cyan-400" },
        { label: "Tailwind CSS", bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/Digi-Tools",
      link: "https://msayeem.github.io/Digi-Tools"
    },
  ];

  return (
    <section className="py-20 max-w-[1200px] mx-auto px-gutter" id="projects">
      <div className="flex items-center gap-3 mb-12">
        <span className="material-symbols-outlined text-headline-lg text-primary">
          
        </span>
        <h2 className="font-headline-lg text-headline-lg text-white">Projects</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="glass-card rounded-xl overflow-hidden group border border-white/5 bg-white/[0.02] backdrop-blur-md"
          >
            {/* Project Image Wrapper */}
            <div className="h-48 overflow-hidden relative">
              <Image
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={project.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Content Details */}
            <div className="p-6">
              <h4 className="font-headline-md text-headline-md mb-3 text-white font-semibold">
                {project.title}
              </h4>

              {/* Cleaned Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${tag.bg} ${tag.text} ${tag.border} flex items-center gap-1.5`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`}></span>
                    {tag.label}
                  </span>
                ))}
              </div>

              <p className="font-body-md text-body-md text-slate-400 line-clamp-3 mb-6">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-auto">
                <Link
                  href={project.github}
                  className="bg-white hover:bg-slate-200 transition-colors px-5 py-2 text-black font-medium text-sm rounded flex items-center gap-2"
                >
                  <FaGithub className="text-[18px]" />
                  Github
                </Link>
                <Link
                  className="border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors text-cyan-400 font-medium text-sm px-5 py-2 rounded"
                  href={project.link}
                >
                  Demo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}