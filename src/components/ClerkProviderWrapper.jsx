import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function ClerkProviderWrapper({ children }) {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
