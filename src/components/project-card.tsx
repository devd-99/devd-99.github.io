import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface ProjectCardProps {
  img: string;
  title: string;
  desc: string;
  github: string;
  live: string;
  tags: string[];
}

export function ProjectCard({ img, title, desc, github, live, tags }: ProjectCardProps) {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader floated={false} className="mx-0 mt-0 mb-6 h-48">
        <Image
          src={img}
          alt={title}
          width={768}
          height={768}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-0">
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-800"
        >
          <Typography variant="h5" className="mb-2">
            {title}
          </Typography>
        </a>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button color="gray" size="sm"  onClick={() => window.open(github, '_blank')}>
          Github
        </Button> 
        {live!="" ?(
          <Button color="blue" size="sm"  onClick={() => window.open(live, '_blank')}>
          Live
        </Button>
        ) :<></>
           

        }
       
        </div>
        
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
