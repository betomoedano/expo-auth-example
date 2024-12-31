import { createContext, useContext, useEffect, useState } from "react";

export enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

export type User = {
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // fetch user
    checkUser();
  }, []);

  async function checkUser() {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setUser({ name: "Beto", email: "beto@beto.io", role: UserRole.User });
    } catch (e) {
      alert("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Please wrap the component with Auth Provider");
  }

  return context;
}
