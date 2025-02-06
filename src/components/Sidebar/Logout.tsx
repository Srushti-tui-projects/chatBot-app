"use client";

import { Button } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";

export const LogoutButton = () => {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
      size="small"
      color="hsl(220, 100%, 15%)"
      margin={0}

    >
      Logout
    </Button>
  );
};
