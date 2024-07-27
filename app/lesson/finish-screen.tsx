import { challengeOptions, challenges } from "@/db/schema";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { Footer } from "./footer";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize, useAudio } from "react-use";

type Props = {
  challenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  hearts: number;
  lessonId: number;
};

export const FinishScreen = ({ challenges, hearts, lessonId }: Props) => {
  const router = useRouter();

  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        recycle={false}
        width={width}
        height={height}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
        <Image
          src="/finish.svg"
          alt="Finish"
          height={100}
          width={100}
          className="hidden lg:block"
        />
        <Image
          src="/finish.svg"
          alt="Finish"
          height={50}
          width={50}
          className="block lg:hidden"
        />
        <h1 className="text-xl font-bold text-neutral-700 lg:text-3xl">
          Great job! <br /> You&apos;ve completed the lesson.
        </h1>
        <div className="flex w-full items-center gap-x-4">
          <ResultCard variant="points" value={challenges.length * 10} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
      </div>
      <Footer
        lessonId={lessonId}
        status="completed"
        onCheck={() => router.push("/learn")}
      />
    </>
  );
};
