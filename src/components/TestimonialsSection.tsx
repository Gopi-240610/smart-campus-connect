import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Dr. Meera Joshi", role: "Professor, CSE Dept.", text: "AttendAI has reduced my administrative workload by 60%. The automated alerts ensure no student falls behind without my knowledge.", rating: 5 },
  { name: "Arjun Mehta", role: "Final Year Student", text: "The motivational messages kept me going. I went from 74% to 98% attendance in one semester. The dashboard is incredibly intuitive.", rating: 5 },
  { name: "Prof. Rajesh Nair", role: "HOD, IT Dept.", text: "The analytics reports have transformed how we approach student engagement. Data-driven decisions are now the norm in our department.", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">What People <span className="gradient-text">Say About Us</span></h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card rounded-xl p-7 relative">
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
            <div>
              <div className="font-display font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
