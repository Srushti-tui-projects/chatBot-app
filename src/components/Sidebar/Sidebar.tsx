"use client";
import * as React from "react";
import { Flex, ScrollView, Divider,View } from "@aws-amplify/ui-react";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import { ConversationItem } from "./ConversationItem";
import PreferenceChart from './PreferenceChart';
import { PreferenceCategory, PreferenceValue } from '@/types/preferences';


export const Sidebar = ({ children }: React.PropsWithChildren) => {
  const { conversations } = React.useContext(ConversationsContext);

  const handlePreferenceChange = (
    category: PreferenceCategory,
    value: PreferenceValue
  ) => {
    console.log(`${category} changed to ${value}`);
  };

  return (
    <Flex direction="column" width="500px" height="100%">
      <ScrollView flex="1">
        <Flex direction="column" padding="medium">
          <Flex direction="row" padding="medium">
            <PreferenceChart onValueChange={handlePreferenceChange} />
          </Flex>
          <Divider orientation="horizontal" />
          <Flex direction="column" padding="medium">
          <View backgroundColor="background.secondary" padding="medium" borderRadius="medium" color="font.primary">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            ))}
            </View>
          </Flex>
        </Flex>
      </ScrollView>
      <Flex direction="row" padding="large">
        {children}
      </Flex>
    </Flex>
  );
};
