import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import ClerkProviderWrapper from "./ClerkProviderWrapper";

export default function ClerkAuth() {
  return (
    <ClerkProviderWrapper>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button variant='outline' size='sm'>
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode='modal'>
          <Button variant='outline' size='sm'>
            Register
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonAvatarBox: "w-8 h-8",
            },
          }}
        />
      </SignedIn>
    </ClerkProviderWrapper>
  );
}
