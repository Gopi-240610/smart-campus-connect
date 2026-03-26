import { motion } from "framer-motion";
import { Brain, Users, Shield } from "lucide-react";

const items = [
  { icon: Brain, title: "AI-Driven Accuracy", desc: "Advanced algorithms ensure precise attendance tracking, eliminating manual errors and proxy attendance." },
  { icon: Users, title: "Student-Centric", desc: "Empowers students with real-time attendance insights and motivational nudges to maintain consistency." },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security ensures student data protection while maintaining accessibility for authorized users." },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">About the Project</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">Redefining Attendance with <span className="gradient-text">Artificial Intelligence</span></h2>
        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">Our AI-powered system transforms the way colleges track and manage student attendance, providing actionable insights that improve academic outcomes for everyone.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card rounded-xl p-8 hover:glow-shadow transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
