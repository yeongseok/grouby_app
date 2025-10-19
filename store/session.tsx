import {
  createContext,
  createElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { signIn as apiSignIn } from "@/lib/api";

const sessionState: { user: SessionUser | null; token: string | null } = {
  user: null,
  token: null,
};

const SessionContext = createContext<SessionStore | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<SessionUser | null>(sessionState.user);
  const [token, setToken] = useState<string | null>(sessionState.token);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await apiSignIn({ email, password });
    sessionState.user = result.user;
    sessionState.token = result.token;
    setUser(result.user);
    setToken(result.token);
  }, []);

  const signOut = useCallback(() => {
    sessionState.user = null;
    sessionState.token = null;
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo<SessionStore>(() => ({ user, token, signIn, signOut }), [signIn, signOut, token, user]);

  return createElement(SessionContext.Provider, { value }, children);
}

export function useSession(): SessionStore {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
