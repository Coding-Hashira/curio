import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "h-full lg:fixed left-0 top-0  lg:w-[256px] flex px-4 border-r-2 flex-col",
        className
      )}
    >
      <div className="pl-4 pt-6 pb-8 flex items-center gap-x-3">
        <Link href="/learn">
          <Image src="/icon.svg" height={48} width={48} alt="logo" />
        </Link>
        <Link href="/learn">
          <h1 className="tracking-wide font-extrabold text-[#58cc02] text-2xl">
            Curio
          </h1>
        </Link>
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem iconSrc="/learn.svg" label="Learn" href="/learn" />
        <SidebarItem
          iconSrc="/leaderboard.svg"
          label="Leaderboard"
          href="/leaderboard"
        />
        <SidebarItem iconSrc="/quests.svg" label="Quests" href="/quests" />
        <SidebarItem iconSrc="/shop.svg" label="Shop" href="/shop" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="animate-spin h-5 w-5 text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
