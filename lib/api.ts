export type SignInParams = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: SessionUser;
};

export type SignInErrorCode = "INVALID_EMAIL_DOMAIN" | "INVALID_PASSWORD";

export class SignInError extends Error {
  code: SignInErrorCode;

  constructor(code: SignInErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "SignInError";
  }
}

export async function signIn(params: SignInParams): Promise<SignInResponse> {
  const { email, password } = params;

  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!email.endsWith("@example.com")) {
    throw new SignInError("INVALID_EMAIL_DOMAIN", "Couldn't sign you in. Check your credentials and try again.");
  }

  if (password.length < 6) {
    throw new SignInError("INVALID_PASSWORD", "Couldn't sign you in. Check your credentials and try again.");
  }

  return {
    token: `token-${Date.now()}`,
    user: {
      id: `user-${Math.random().toString(36).slice(2, 8)}`,
      displayName: email.split("@")[0] ?? "Grouby Fan",
      email,
    },
  };
}
