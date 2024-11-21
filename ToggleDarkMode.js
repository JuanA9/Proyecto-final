import React from "react";
import { HStack, Text, Switch, useColorMode, Box } from "native-base";

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={colorMode === "light" ? "light.background.50" : "dark.background.900"} p={3}>
      <HStack space={2} alignItems="center">
        <Text text={colorMode === "light" ? "light.text.50" : "dark.text.50"}>Dark</Text>
        <Switch
          isChecked={colorMode === "light"}
          onToggle={toggleColorMode}
          aria-label={
            colorMode === "light" ? "switch to dark mode" : "switch to light mode"
          }
        />
        <Text text={colorMode === "light" ? "light.text.50" : "dark.text.50"}>Light</Text>
      </HStack>
    </Box>
  );
}

export default ToggleDarkMode;
