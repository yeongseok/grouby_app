import { Stack } from "expo-router";
import { type ReactElement } from "react";
import { useSession, SessionProvider } from "@/store/session";
import "./globals.css";

function RootNavigator(): ReactElement {
  const { user } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout(): ReactElement {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}
