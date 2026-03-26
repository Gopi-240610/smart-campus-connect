import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "motivation" | "info";
  read: boolean;
  timestamp: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return JSON.parse(localStorage.getItem("attendai_notifications") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("attendai_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (n: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newN: Notification = {
      ...n,
      id: crypto.randomUUID(),
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newN, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, markAllAsRead, unreadCount: notifications.filter((n) => !n.read).length }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
