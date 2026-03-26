import { motion } from "framer-motion";
import { ScanFace, BellRing, MessageSquareHeart, BarChart3, LayoutDashboard, Zap } from "lucide-react";

const features = [
  { icon: ScanFace, title: "AI-Based Tracking", desc: "Facial recognition and smart pattern analysis for seamless attendance recording." },
  { icon: BellRing, title: "Smart Alerts", desc: "Automatic notifications when attendance drops below 70%, keeping students on track." },
  { icon: MessageSquareHeart, title: "Daily Motivation", desc: "Personalized motivational messages for students maintaining 100% attendance." },
  { icon: BarChart3, title: "Data Analytics", desc: "Comprehensive reports and trend analysis for data-driven decision making." },
  { icon: LayoutDashboard, title: "User-Friendly Dashboard", desc: "Intuitive interface for students, teachers, and administrators alike." },
  { icon: Zap, title: "Real-Time Processing", desc: "Instant attendance updates with zero delays, powered by edge computing." },
];

const FeaturesSection = () => (
  <section id="features" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">Everything You Need for <span className="gradient-text">Smart Attendance</span></h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-7 hover:glow-shadow hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
