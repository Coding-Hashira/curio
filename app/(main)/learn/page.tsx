import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./Header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Mathematics", imageSrc: "/maths.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Mathematics" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
