import { Stack } from "expo-router";
import { type ReactElement } from "react";

export default function AuthLayout(): ReactElement {
  return (
    <Stack initialRouteName="splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
