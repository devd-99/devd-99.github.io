"use client";

import { Typography, Button } from "@material-tailwind/react";
import {
  ChartBarIcon,
  PuzzlePieceIcon,
  CursorArrowRaysIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { ResumeItem } from "@/components";

const RESUME_ITEMS = [
  {
    icon: ChartBarIcon,
    children: "Master of Science in Information Systems - New York University, Courant Institute of Mathematical Sciences",
  },
  {
    icon: PuzzlePieceIcon,
    children: "Bachelor of Technology in Computer Science - Shiv Nadar University",
  },
  {
    icon: CursorArrowRaysIcon,
    children: "2.5 years of professional work experience in cross-functional Agile teams",
  },
];

export function Resume() {
  return (
    <section className="px-8 py-24" id ="cv">
      <div className="container mx-auto grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="col-span-1">
          <Typography variant="h2" color="blue-gray">
            My Resume
          </Typography>
          <Typography className="mb-4 mt-3 w-9/12 font-normal !text-gray-00">
            Highly skilled Software Developer with 5+ years of
            experience in creating robust
            websites and applications.
          </Typography>
          <a href="https://cvbucket-dnp9357.s3.amazonaws.com/Devansh_Purohit_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Button
            variant="text"
            className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            view resume
            <ArrowRightIcon
              strokeWidth={3}
              className="h-3.5 w-3.5 text-gray-900"
            />
          </Button>
          </a>
        </div>
        <div className="col-span-1 grid gap-y-6 lg:ml-auto pr-0 lg:pr-12 xl:pr-32">
          {RESUME_ITEMS.map((props, idx) => (
            <ResumeItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resume;
