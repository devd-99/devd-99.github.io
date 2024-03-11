"use client";

import { ProjectCard } from "@/components";
import { Typography } from "@material-tailwind/react";

const TAGLIST = {
  "web":"Web Development",
  "apple": "Apple",
  "graphics": "Graphics"

  }

const PROJECTS = [
  {
    img: "/image/to-dos.webp",
    title: "To-Do App - Next.js",
    desc: "To-do App made using Next.js. Auth and data storage on Firestore, deployed on Vercel.  ",
    github: "https://github.com/devd-99/todo-next.git",
    live: "https://todo-next-blue.vercel.app",
    tags: ["web"]
    
  },
  {
    img: "/image/weather.webp",
    title: "Weather App - Swift",
    desc: "Live weather app made using Swift. Dynamic icons based on the time of day and weather conditions.",
    github: "https://github.com/devd-99/weather-swift.git",
    live: "",
    tags: ["apple"]
  },
  {
    img: "/image/pagerank.webp",
    title: "PageRank using MapReduce",
    desc: "PageRank implemented using Hadoop's MapReduce architecture. Written in Java.",
    github: "https://github.com/devd-99/PageRank.git",
    live: "",
    tags: ["algorithms", "big data"]
  },
  {
    img: "/image/pbr.png",
    title: "Physics-Based Rendering - C++",
    desc: "Implemented Verlet, Euler, Euler Cromer methods of PBR on a cube defined manually using GLEW and GLUT libraries of the OpenGL framework.",
    github: "https://github.com/devd-99/pbr.git",
    live: "",
    tags: ["algorithms", "graphics"]
  },
  {
    img: "/image/niivue.png",
    title: "3-D Objects to Niivue",
    desc: "Modified the @niivue npm library to support addition of 3-D regions of interest on the Canvas",
    github: "https://github.com/devd-99/niivue-react.git",
    live: "",
    tags: ["web","graphics"]
  },
  {
    img: "/image/gstr.webp",
    title: "GSTR",
    desc: "Uses a 63-point facial feature detection model to control the cursor on a Windows PC through various semantic gestures. Also has Google's StT integrated for common commands.",
    github: "https://github.com/devd-99/gstr.git",
    live: "",
    tags: ["graphics"]
  },
  {
    img: "/image/trashnet.webp",
    title: "Trashnet",
    desc: "UI Made in React for Trashnet, a waste management startup. Meant for creating Energy Credits.",
    github: "https://github.com/devd-99/trashnet-poc.git",
    live: "",
    tags:["web, blockchain"]
  },
  {
    img: "/image/elementARy.png",
    title: "ElementARy",
    desc: "Shows different layers of a laptop in an interactive AR application using Unity and Vuforia",
    github: "https://github.com/devd-99/ElementARy.git",
    live: "https://youtu.be/8IAHTaOn0-4",
    tags:["graphics"]
  },
  {
    img: "/image/nasa.png",
    title: "Nasa SpaceApps challenge",
    desc: "AR HUD application created for the NASA SpaceApps challenge.",
    github: "https://github.com/devd-99/NasaSpaceAppsChallenge-AR-App.git",
    live: "https://youtu.be/7PMTEKEfG8c",
    tags:["graphics"]
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
