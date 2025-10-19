import { Text, View } from "react-native";
import { type ReactElement } from "react";

interface FormMessageProps {
  message: string;
  tone?: "error" | "info";
}

export function FormMessage({ message, tone = "info" }: FormMessageProps): ReactElement {
  const toneClasses =
    tone === "error"
      ? "bg-red-500/10 text-red-400"
      : "bg-blue-500/10 text-blue-400";

  return (
    <View className={`mt-4 rounded-lg px-3 py-2 ${toneClasses}`}>
      <Text className="text-sm">{message}</Text>
    </View>
  );
}
