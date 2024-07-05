import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full p-2 border-l-stone-200 border-t-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="px-2">
          <Image
            src="/maths.svg"
            className="mr-4"
            alt="Mathematics"
            height={32}
            width={32}
          />
          Maths
        </Button>
        <Button size="lg" variant="ghost" className="px-2">
          <Image
            src="/chemistry.svg"
            className="mr-4"
            alt="Mathematics"
            height={32}
            width={32}
          />
          Chemistry
        </Button>
        <Button size="lg" variant="ghost" className="px-2">
          <Image
            src="/physics.svg"
            className="mr-4"
            alt="Mathematics"
            height={32}
            width={32}
          />
          Physics
        </Button>
        <Button size="lg" variant="ghost" className="px-2">
          <Image
            src="/programming.svg"
            className="mr-4"
            alt="Mathematics"
            height={32}
            width={32}
          />
          Programming
        </Button>
      </div>
    </footer>
  );
};
