"use client";
import * as React from "react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { View } from "@aws-amplify/ui-react";
import { client, useAIConversation } from "@/client";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import ReactMarkdown from "react-markdown";

export const Chat = ({ id }: { id: string }) => {
  const { updateConversation } = React.useContext(ConversationsContext);
  const [
    {
      data: { messages, conversation },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", { id });

  return (
    <View padding="large" flex="1">
      <AIConversation
        messages={messages}
        handleSendMessage={(message) => {
          sendMessage(message);
          // only run this on the first message...
          if (!conversation?.name) {
            client.generations
              .chatNamer({
                content: message.content.map((c) => c.text ?? "").join(""),
              })
              .then((res) => {
                updateConversation({
                  id,
                  name: res.data?.name ?? "",
                });
              });
          }
        }}
        isLoading={isLoading}
        messageRenderer={{
          text: ({ text }) => <View backgroundColor="background.secondary" padding="medium" borderRadius="medium" color="font.primary"><ReactMarkdown>{text}</ReactMarkdown> </View>,
        }}
      />
    </View>
  );
};
