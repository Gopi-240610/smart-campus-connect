import { motion } from "framer-motion";
import { GraduationCap, Clock, Target, TrendingUp } from "lucide-react";

const benefits = [
  { icon: GraduationCap, title: "Improves Discipline", desc: "Students stay accountable with transparent attendance tracking and timely alerts." },
  { icon: Clock, title: "Saves Faculty Time", desc: "Automates tedious manual attendance processes, freeing up valuable teaching hours." },
  { icon: Target, title: "Student Consistency", desc: "Motivational nudges and progress tracking help students maintain regular attendance." },
  { icon: TrendingUp, title: "Data-Driven Insights", desc: "Comprehensive analytics empower informed decisions at every institutional level." },
];

const BenefitsSection = () => (
  <section id="benefits" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Benefits</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">Why Choose <span className="gradient-text">AttendAI</span>?</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-5 group">
            <div className="w-14 h-14 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:gradient-bg group-hover:text-primary-foreground transition-all duration-300">
              <b.icon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
