"use client";
import * as React from "react";
import { Flex, ScrollView, Divider } from "@aws-amplify/ui-react";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import { ConversationItem } from "./ConversationItem";
import PreferenceChart from './PreferenceChart';

export const Sidebar = ({ children }: React.PropsWithChildren) => {
  const { conversations } = React.useContext(ConversationsContext);

  const handlePreferenceChange = (
    category: 'Formality' | 'Accuracy' | 'Speed' | 'Humour' | 'Memory',
    value: 0 | 1 | 2
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
          <Divider
    orientation="horizontal" />
          <Flex direction="column" padding="medium">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          </Flex>
        </Flex>
      </ScrollView>
      <Flex direction="row" padding="large">
        {children}
      </Flex>
    </Flex>
  );
};
