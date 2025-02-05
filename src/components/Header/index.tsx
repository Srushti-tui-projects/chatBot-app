import { View, Button, Flex, Image } from "@aws-amplify/ui-react";

type HeaderProps = {
  onLogout: () => void;
  onToggleTheme: () => void;
};

export const Header = ({ onLogout, onToggleTheme }: HeaderProps) => {
  return (
    <View
      backgroundColor="var(--amplify-colors-background-secondary)"
      padding="medium"
      width="100%"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View>
          <h1>Chat Application</h1>
        </View>
        <Flex gap="medium">
          <Button onClick={onToggleTheme} variation="primary">
            Toggle Theme
          </Button>
          <Button onClick={onLogout} variation="warning">
            Logout
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};
