import { Brain, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="hero-gradient text-primary-foreground/80 py-12 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <a href="#home" className="flex items-center gap-2 font-display font-bold text-xl text-primary-foreground mb-3">
            <Brain className="h-6 w-6" />
            AttendAI
          </a>
          <p className="text-sm text-primary-foreground/50">AI-powered attendance management for the modern campus.</p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm">
            {["Home", "About", "Features", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block hover:text-primary-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-3">Follow Us</h4>
          <div className="flex gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/40">
        © {new Date().getFullYear()} AttendAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
