"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pl-4 pt-8 pb-7 flex items-center gap-x-3">
          <Image src="/icon.svg" height={48} width={48} alt="logo" />
          <h1 className="tracking-wide font-extrabold text-[#58cc02] text-2xl">
            Curio
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton
              signUpFallbackRedirectUrl="/learn"
              fallbackRedirectUrl="/learn"
              mode="modal"
            >
              <Button size="lg" variant="ghost">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
