import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, LogOut, CheckCircle2, XCircle, TrendingUp, Users, AlertTriangle,
  MessageSquareHeart, BarChart3, Bell, Moon, Sun, Sparkles, BookOpen,
  CalendarDays, ChevronDown, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid
} from "recharts";

interface AttendanceRecord {
  id: string;
  date: string;
  status: "present" | "absent";
  subject: string;
}

interface AttendanceData {
  totalClasses: number;
  attendedClasses: number;
  history: AttendanceRecord[];
}

const SUBJECTS = ["Mathematics", "Physics", "Computer Science", "English", "Electronics"];
const MOTIVATIONAL_MESSAGES = [
  "🌟 Excellent! Keep maintaining your consistency!",
  "🔥 You're on fire! 100% attendance is a superpower!",
  "💪 Discipline is the bridge between goals and accomplishment!",
  "🎯 Perfect attendance shows dedication. You're a role model!",
  "🚀 Your consistency today builds your success tomorrow!",
  "⭐ Outstanding commitment! Teachers and peers admire you!",
  "🏆 Champions show up every day. You're a true champion!",
  "✨ Your perfect record speaks volumes about your character!",
];

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { notifications, addNotification, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [motivationMsg, setMotivationMsg] = useState("");

  const [data, setData] = useState<AttendanceData>(() => {
    if (!user) return { totalClasses: 0, attendedClasses: 0, history: [] };
    const saved = localStorage.getItem(`attendai_attendance_${user.id}`);
    return saved ? JSON.parse(saved) : { totalClasses: 20, attendedClasses: 16, history: [] };
  });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
  }, [user, navigate]);

  useEffect(() => {
    if (user) localStorage.setItem(`attendai_attendance_${user.id}`, JSON.stringify(data));
  }, [data, user]);

  const percentage = data.totalClasses > 0 ? Math.round((data.attendedClasses / data.totalClasses) * 100) : 0;

  // Check alerts on percentage change
  useEffect(() => {
    if (percentage > 0 && percentage < 70) {
      setShowAlert(true);
      addNotification({
        title: "⚠️ Low Attendance Alert",
        message: `Your attendance is ${percentage}% — below the 70% minimum requirement.`,
        type: "alert",
      });
    }
    if (percentage === 100) {
      const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
      setMotivationMsg(msg);
      addNotification({ title: "🎉 Perfect Attendance!", message: msg, type: "motivation" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  const markAttendance = (status: "present" | "absent") => {
    const subject = SUBJECTS[data.totalClasses % SUBJECTS.length];
    const record: AttendanceRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      status,
      subject,
    };
    setData((prev) => ({
      totalClasses: prev.totalClasses + 1,
      attendedClasses: prev.attendedClasses + (status === "present" ? 1 : 0),
      history: [...prev.history, record],
    }));
    toast.success(`Marked as ${status} for ${subject}`);
    addNotification({
      title: status === "present" ? "✅ Attendance Recorded" : "❌ Absence Recorded",
      message: `${subject} — ${new Date().toLocaleDateString()}`,
      type: "info",
    });
  };

  const getNewMotivation = () => {
    const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    setMotivationMsg(msg);
    toast.success(msg);
  };

  // Chart data
  const weeklyData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return days.map((day, i) => {
      const dayRecords = data.history.filter((r) => new Date(r.date).getDay() === i + 1);
      const present = dayRecords.filter((r) => r.status === "present").length;
      const total = dayRecords.length || 1;
      return { day, attendance: Math.round((present / total) * 100) };
    });
  }, [data.history]);

  const subjectData = useMemo(() => {
    return SUBJECTS.map((sub) => {
      const records = data.history.filter((r) => r.subject === sub);
      const present = records.filter((r) => r.status === "present").length;
      return { subject: sub.slice(0, 4), present, absent: records.length - present, pct: records.length ? Math.round((present / records.length) * 100) : 0 };
    });
  }, [data.history]);

  const pieData = [
    { name: "Present", value: data.attendedClasses },
    { name: "Absent", value: data.totalClasses - data.attendedClasses },
  ];
  const PIE_COLORS = ["hsl(246, 80%, 60%)", "hsl(0, 84%, 60%)"];

  const trendData = useMemo(() => {
    const recent = data.history.slice(-10);
    let running = 0;
    return recent.map((r, i) => {
      if (r.status === "present") running++;
      return { class: i + 1, pct: Math.round((running / (i + 1)) * 100) };
    });
  }, [data.history]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <Brain className="h-7 w-7 text-primary" />
            <span className="gradient-text">AttendAI</span>
          </a>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} className="relative">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notification bell */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full gradient-bg text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 glass-card rounded-xl border border-border shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <span className="font-display font-semibold text-sm">Notifications</span>
                    <button onClick={markAllAsRead} className="text-xs text-primary hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-muted-foreground text-center">No notifications</p>
                    ) : (
                      notifications.slice(0, 10).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`w-full text-left p-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                        >
                          <div className="font-semibold text-xs">{n.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{n.message}</div>
                          <div className="text-[10px] text-muted-foreground/60 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-2 ml-2 text-sm">
              <span className="text-muted-foreground">Hi,</span>
              <span className="font-semibold">{user.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { logout(); navigate("/"); }} title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Low attendance alert popup */}
        {showAlert && percentage < 70 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-4">
            <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center relative">
              <button onClick={() => setShowAlert(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-2">Warning!</h3>
              <p className="text-muted-foreground mb-4">Your attendance is <span className="text-destructive font-bold">{percentage}%</span> — below the 70% minimum requirement.</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => { setShowAlert(false); setShowReport(true); }} className="gradient-bg border-0 text-primary-foreground">
                  View Details
                </Button>
                <Button variant="outline" onClick={() => setShowAlert(false)}>Dismiss</Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Motivation banner */}
        {percentage === 100 && motivationMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="gradient-bg rounded-xl p-5 text-primary-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 shrink-0" />
              <div>
                <h3 className="font-display font-bold">Perfect Attendance!</h3>
                <p className="text-sm text-primary-foreground/80">{motivationMsg}</p>
              </div>
            </div>
            <Button onClick={getNewMotivation} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 shrink-0">
              <MessageSquareHeart className="mr-2 h-4 w-4" /> Get Motivation
            </Button>
          </motion.div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Total Classes", value: data.totalClasses, color: "text-primary" },
            { icon: CheckCircle2, label: "Attended", value: data.attendedClasses, color: "text-secondary" },
            { icon: XCircle, label: "Absent", value: data.totalClasses - data.attendedClasses, color: "text-destructive" },
            { icon: TrendingUp, label: "Attendance %", value: `${percentage}%`, color: percentage >= 70 ? "text-secondary" : "text-destructive" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
              <s.icon className={`h-6 w-6 mb-3 ${s.color}`} />
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Attendance progress bar */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold">Overall Attendance</h3>
            <span className={`font-bold text-lg ${percentage >= 70 ? "text-secondary" : "text-destructive"}`}>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {percentage >= 70 ? "✅ You meet the minimum requirement" : "⚠️ Below 70% — attendance improvement needed"}
          </p>
        </div>

        {/* Mark Attendance */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold mb-1">Mark Today's Attendance</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Next class: <span className="font-semibold text-foreground">{SUBJECTS[data.totalClasses % SUBJECTS.length]}</span>
          </p>
          <div className="flex gap-3">
            <Button onClick={() => markAttendance("present")} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 flex-1">
              <CheckCircle2 className="mr-2 h-5 w-5" /> Mark Present
            </Button>
            <Button onClick={() => markAttendance("absent")} variant="outline" className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10">
              <XCircle className="mr-2 h-5 w-5" /> Mark Absent
            </Button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <h4 className="font-display font-semibold mb-4">Weekly Attendance</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" fill="hsl(246, 80%, 60%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-display font-semibold mb-4">Attendance Distribution</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-display font-semibold mb-4">Subject-wise Attendance</h4>
            <div className="space-y-3">
              {subjectData.map((s) => (
                <div key={s.subject}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{s.subject}</span>
                    <span className={`font-bold ${s.pct >= 70 ? "text-secondary" : "text-destructive"}`}>{s.pct}%</span>
                  </div>
                  <Progress value={s.pct} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-display font-semibold mb-4">Attendance Trend</h4>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 90%)" />
                <XAxis dataKey="class" axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="pct" stroke="hsl(280, 70%, 55%)" strokeWidth={2} dot={{ fill: "hsl(246, 80%, 60%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Prediction */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h3 className="font-display font-semibold">AI Attendance Prediction</h3>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            {percentage >= 90 && "🟢 Based on your current trend, you'll maintain excellent attendance this semester. Keep it up!"}
            {percentage >= 70 && percentage < 90 && `🟡 Your attendance is satisfactory at ${percentage}%. Attending ${Math.ceil((0.9 * data.totalClasses - data.attendedClasses))} more classes would bring you to 90%.`}
            {percentage < 70 && `🔴 Critical: You need to attend the next ${Math.ceil((0.7 * (data.totalClasses + 5) - data.attendedClasses))} classes consecutively to reach 70% by mid-term. Immediate action required.`}
          </div>
        </div>

        {/* View Report button */}
        <div className="flex justify-center">
          <Button onClick={() => setShowReport(!showReport)} variant="outline" className="gap-2">
            <CalendarDays className="h-4 w-4" /> {showReport ? "Hide" : "View"} Detailed Report
            <ChevronDown className={`h-4 w-4 transition-transform ${showReport ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Detailed report */}
        {showReport && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card rounded-xl p-6 overflow-hidden">
            <h3 className="font-display font-semibold mb-4">Attendance History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-semibold">Date</th>
                    <th className="text-left py-2 font-semibold">Subject</th>
                    <th className="text-left py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.history.slice().reverse().map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="py-2">{r.subject}</td>
                      <td className="py-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${r.status === "present" ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"}`}>
                          {r.status === "present" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
