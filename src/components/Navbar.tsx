import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Brain, Moon, Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNotifications } from "@/contexts/NotificationContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2 font-display font-bold text-xl">
          <Brain className="h-7 w-7 text-primary" />
          <span className="gradient-text">AttendAI</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}

          <Button variant="ghost" size="icon" onClick={toggle}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <Button size="sm" className="gradient-bg border-0 text-primary-foreground hover:opacity-90" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => navigate("/login")}>Login</Button>
              <Button size="sm" className="gradient-bg border-0 text-primary-foreground hover:opacity-90" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggle}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-card border-t border-border/30 px-4 pb-4 space-y-2">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          {isAuthenticated ? (
            <Button size="sm" className="w-full gradient-bg border-0 text-primary-foreground" onClick={() => { setOpen(false); navigate("/dashboard"); }}>Dashboard</Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => { setOpen(false); navigate("/login"); }}>Login</Button>
              <Button size="sm" className="flex-1 gradient-bg border-0 text-primary-foreground" onClick={() => { setOpen(false); navigate("/signup"); }}>Sign Up</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
