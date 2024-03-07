"use client";

import { ProjectCard } from "@/components";
import { Typography } from "@material-tailwind/react";

const PROJECTS = [
  {
    img: "/image/to-dos.webp",
    title: "To-Do App - Next.js",
    desc: "To-do App made using Next.js. Auth and data storage on Firestore, deployed on Vercel.  ",
    github: "https://github.com/devd-99/todo-next.git",
    live: "https://todo-next-blue.vercel.app"
  },
];

export function Projects() {
  return (
    <section className="py-28 px-8" id="projects" >
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          My Projects
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.map((props, idx) => (
          <ProjectCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
