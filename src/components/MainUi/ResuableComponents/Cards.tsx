import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface CardProps {
  imgSrc: string;
  altText: string;
  title: string;
}

import { AspectRatio } from "@/components/ui/aspect-ratio";

function Cards({ imgSrc, altText, title }: CardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <AspectRatio ratio={10 / 9}>
            <Image
              src={imgSrc}
              alt={altText}
              title={title}
              width={800}
              height={800}
              className="object-cover object-center rounded-lg h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              priority={true} // Optional: To prioritize image loading
            />
          </AspectRatio>
        </CardHeader>

        <CardContent>
          <CardTitle>
            <span className="break-word transition-all duration-300 text-3xl font-medium">
              {title}
            </span>
          </CardTitle>
        </CardContent>
      </Card>
    </>
  );
}

export default Cards;
