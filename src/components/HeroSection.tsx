import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 hero-gradient opacity-80" />
    </div>

    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground/80 mb-8">
          <Sparkles className="h-4 w-4" />
          AI-Powered Attendance System
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-primary-foreground">Smart Attendance.</span>
          <br />
          <span className="gradient-text">Smarter Future.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/60 mb-10 font-body">
          Revolutionize college attendance with AI-driven tracking, real-time analytics, and intelligent alerts that keep students engaged and faculty informed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 text-base px-8 glow-shadow animate-pulse-glow">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
            Learn More
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
