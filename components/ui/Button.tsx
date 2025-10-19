import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";
import { useMemo, type ReactElement } from "react";

interface ButtonProps extends Pick<PressableProps, "onPress" | "accessibilityLabel" | "testID"> {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  label,
  loading = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  className = "",
  testID,
}: ButtonProps): ReactElement {
  const isDisabled = disabled || loading;
  const containerClassName = useMemo(() => {
    const base = "min-h-[48px] flex-row items-center justify-center rounded-xl bg-foreground px-4 py-3";
    const disabledClasses = isDisabled ? " opacity-60" : "";
    return `${base}${disabledClasses}${className ? ` ${className}` : ""}`;
  }, [className, isDisabled]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={isDisabled}
      onPress={onPress}
      className={containerClassName}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-base font-semibold text-background">{label}</Text>
      )}
    </Pressable>
  );
}
