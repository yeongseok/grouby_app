import { useState, type ReactElement } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { FormMessage } from "@/components/ui/FormMessage";
import { useSession } from "@/store/session";
import { isValidEmail, minLen, required } from "@/lib/validators";
import { SignInError } from "@/lib/api";

const emailValidator = (value: string): string | null => {
  if (!required(value)) {
    return "Email is required.";
  }
  if (!isValidEmail(value)) {
    return "Enter a valid email address.";
  }
  return null;
};

const passwordValidator = (value: string): string | null => {
  if (!required(value)) {
    return "Password is required.";
  }
  if (!minLen(6)(value)) {
    return "Password must be at least 6 characters.";
  }
  return null;
};

export default function LoginScreen(): ReactElement {
  const router = useRouter();
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleBlur = (field: "email" | "password") => {
    setErrors((prev) => {
      const next = { ...prev };
      const value = field === "email" ? email : password;
      const message = field === "email" ? emailValidator(value) : passwordValidator(value);
      next[field] = message ?? undefined;
      return next;
    });
  };

  const handleSubmit = async () => {
    const nextErrors: { email?: string; password?: string } = {
      email: emailValidator(email) ?? undefined,
      password: passwordValidator(password) ?? undefined,
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      await signIn(email.trim(), password);
      router.replace("/(tabs)");
    } catch (error) {
      if (error instanceof SignInError) {
        setFormError(error.message);
      } else {
        setFormError("Couldn't sign you in. Check your credentials and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-primary"
    >
      <View className="flex-1 px-6 py-10">
        <View className="items-center">
          <Image source={images.highlight} className="h-20 w-20" resizeMode="contain" accessibilityRole="image" />
          <Text className="mt-6 text-2xl font-semibold text-white">Welcome to Grouby</Text>
        </View>

        <View className="mt-10 gap-4">
          <TextField
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            editable={!submitting}
            testID="login-email"
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onBlur={() => handleBlur("password")}
            error={errors.password}
            editable={!submitting}
            testID="login-password"
          />
        </View>

        {formError ? <FormMessage tone="error" message={formError} /> : null}

        <Button
          label="Sign In"
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting}
          className="mt-6"
          testID="login-submit"
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Forgot password?"
          testID="login-forgot"
          onPress={() => {}}
          className="mt-4 min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <Text className="text-center text-sm font-semibold text-accent">Forgot password?</Text>
        </Pressable>

        <View className="mt-auto flex-row items-center justify-center">
          <Text className="text-sm text-white/80">Don’t have an account?</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign up"
            onPress={() => {}}
            testID="login-signup"
            className="ml-2 min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <Text className="text-sm font-semibold text-accent">Sign up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
