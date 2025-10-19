import { useEffect, type ReactElement } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/store/session";

export default function SplashScreen(): ReactElement {
  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [router, user]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}
