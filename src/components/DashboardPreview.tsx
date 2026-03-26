import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, MessageSquare, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 95 },
  { day: "Thu", attendance: 78 },
  { day: "Fri", attendance: 91 },
];

const stats = [
  { icon: Users, label: "Total Students", value: "1,247", color: "text-primary" },
  { icon: TrendingUp, label: "Avg. Attendance", value: "89%", color: "text-secondary" },
  { icon: AlertTriangle, label: "Below 70%", value: "23", color: "text-destructive" },
  { icon: MessageSquare, label: "Messages Sent", value: "156", color: "text-accent" },
];

const students = [
  { name: "Priya Sharma", pct: 96, status: "Excellent" },
  { name: "Rahul Kumar", pct: 72, status: "Warning" },
  { name: "Ananya Patel", pct: 100, status: "Perfect" },
  { name: "Vikram Singh", pct: 65, status: "Critical" },
];

const DashboardPreview = () => (
  <section className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Dashboard Preview</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">Powerful <span className="gradient-text">Analytics Dashboard</span></h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 md:p-8 glow-shadow">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-muted/50 rounded-xl p-4 text-center">
              <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-muted/30 rounded-xl p-5">
            <h4 className="font-display font-semibold mb-4">Weekly Attendance</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" fill="hsl(246 80% 60%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student list */}
          <div className="bg-muted/30 rounded-xl p-5">
            <h4 className="font-display font-semibold mb-4">Student Attendance</h4>
            <div className="space-y-4">
              {students.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{s.name}</span>
                      <span className={`text-xs font-semibold ${s.pct >= 90 ? "text-secondary" : s.pct >= 70 ? "text-accent" : "text-destructive"}`}>{s.status}</span>
                    </div>
                    <Progress value={s.pct} className="h-2" />
                  </div>
                  <span className="text-sm font-bold w-10 text-right">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DashboardPreview;
