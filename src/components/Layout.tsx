"use client";
import * as React from "react";
import { Authenticator, Flex, useAuthenticator, View, Text, Image } from "@aws-amplify/ui-react";
import { ConversationsProvider } from "@/providers/ConversationsProvider";
import { LogoutButton } from "./Sidebar/Logout";


function Header() {
  const { user } = useAuthenticator();
  return (
    <View padding="0.75rem" backgroundColor="#7DD6E8">
      <Flex direction="row" justifyContent="space-between" alignItems="center">

        <Text fontSize="1.4rem" fontWeight="bold">
          <Image
            src="/images/TUI_Logo.png"
            alt="Logo"
            height={30}
            paddingRight="10px"
            paddingLeft="10px"
          /> 
          ChatBot

        </Text>
        <Flex direction="row" margin={0}>

          {user && (
            <> <Text>
              {user?.signInDetails?.loginId}
            </Text>
              <LogoutButton /> </>

          )}

        </Flex>

      </Flex>
    </View>
  );
}

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <Authenticator components={{ Header }}>
      {({ }) => (
        <Flex
          direction="column"
          width="100vw"
          height="100vh"
          overflow="hidden"
        >
          <Header />
          <ConversationsProvider>
            <Flex direction="row" width="100vw" height="100vh" overflow="hidden">
              {children}
            </Flex>
          </ConversationsProvider>
        </Flex>)}
    </Authenticator>
  );
};
