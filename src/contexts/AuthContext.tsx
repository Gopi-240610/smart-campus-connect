import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("attendai_current_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const getUsers = (): StoredUser[] => {
    return JSON.parse(localStorage.getItem("attendai_users") || "[]");
  };

  const signup = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }
    const newUser: StoredUser = { id: crypto.randomUUID(), name, email, password };
    localStorage.setItem("attendai_users", JSON.stringify([...users, newUser]));

    // Initialize attendance data
    localStorage.setItem(`attendai_attendance_${newUser.id}`, JSON.stringify({
      totalClasses: 20,
      attendedClasses: 16,
      history: Array.from({ length: 20 }, (_, i) => ({
        id: crypto.randomUUID(),
        date: new Date(Date.now() - (19 - i) * 86400000).toISOString().split("T")[0],
        status: i < 16 ? "present" : "absent",
        subject: ["Mathematics", "Physics", "Computer Science", "English", "Electronics"][i % 5],
      })),
    }));

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem("attendai_current_user", JSON.stringify(safeUser));
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password" };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem("attendai_current_user", JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("attendai_current_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
