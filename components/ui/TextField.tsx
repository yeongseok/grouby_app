import { useEffect, useState, type ReactElement } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextFieldProps
  extends Pick<
      TextInputProps,
      | "value"
      | "onChangeText"
      | "onBlur"
      | "placeholder"
      | "keyboardType"
      | "autoCapitalize"
      | "autoComplete"
      | "autoCorrect"
      | "editable"
      | "secureTextEntry"
      | "textContentType"
      | "returnKeyType"
    >,
    Pick<PressableProps, "testID"> {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  secureTextEntry,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType = "default",
  autoCapitalize = "none",
  autoComplete,
  autoCorrect = false,
  editable = true,
  textContentType,
  returnKeyType,
  testID,
}: TextFieldProps): ReactElement {
  const [isSecure, setIsSecure] = useState<boolean>(Boolean(secureTextEntry));

  useEffect(() => {
    setIsSecure(Boolean(secureTextEntry));
  }, [secureTextEntry]);

  const showToggle = Boolean(secureTextEntry);

  return (
    <View>
      <Text className="mb-1 text-sm text-white/80">{label}</Text>
      <View className="flex-row items-center rounded-xl bg-secondary px-4">
        <TextInput
          className="flex-1 py-3 text-base text-white"
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          editable={editable}
          secureTextEntry={showToggle ? isSecure : false}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          accessibilityLabel={label}
          testID={testID}
        />
        {showToggle ? (
          <Pressable
            onPress={() => setIsSecure((prev) => !prev)}
            accessibilityRole="button"
            accessibilityLabel={isSecure ? "Show password" : "Hide password"}
            className="ml-2 min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <Text className="text-sm font-semibold text-accent">
              {isSecure ? "Show" : "Hide"}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="mt-1 text-xs text-red-400">{error}</Text> : null}
    </View>
  );
}
