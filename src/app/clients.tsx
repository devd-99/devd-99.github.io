"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

const CLIENTS = [
  "NBCUniversal",
  "Trashnet",
  "Dell Technologies",
  "Larsen  and Toubro Infotech",
];

export function Clients() {
  return (
    <section className="px-8 py-28">
      <div className="container mx-auto text-center">
        <Typography variant="h3" color="blue-gray" className="mb-8">
          My previous companies
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {CLIENTS.map((logo, key) => (
            <Image
              key={key}
              alt={logo}
              width={768}
              height={768}
              className="w-40"
              src={`/image/${logo}.png`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
