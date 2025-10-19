import { Stack } from "expo-router";
import { type ReactElement } from "react";

export default function TabsLayout(): ReactElement {
  return <Stack screenOptions={{ headerShown: false }} />;
}
