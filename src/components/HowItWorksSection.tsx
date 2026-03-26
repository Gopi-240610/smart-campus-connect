import { motion } from "framer-motion";
import { UserCheck, BrainCircuit, Bell, FileBarChart } from "lucide-react";

const steps = [
  { icon: UserCheck, num: "01", title: "Record Attendance", desc: "Students are marked present via AI-powered facial recognition or smart check-in." },
  { icon: BrainCircuit, num: "02", title: "AI Analyzes Patterns", desc: "Our AI engine processes attendance data in real-time, identifying trends and anomalies." },
  { icon: Bell, num: "03", title: "Alerts & Messages", desc: "Automated alerts for low attendance and motivational messages for consistent students." },
  { icon: FileBarChart, num: "04", title: "Reports Generated", desc: "Detailed analytics reports are generated for students, teachers, and administrators." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">Simple Steps, <span className="gradient-text">Powerful Results</span></h2>
      </motion.div>

      <div className="relative grid md:grid-cols-4 gap-8">
        <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

        {steps.map((s, i) => (
          <motion.div key={s.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
            <div className="relative z-10 w-16 h-16 mx-auto rounded-full gradient-bg flex items-center justify-center mb-6 glow-shadow">
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-xs font-bold text-primary/50 uppercase tracking-widest">Step {s.num}</span>
            <h3 className="font-display text-lg font-semibold mt-2 mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
