import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Award } from "lucide-react";
import heroNebula from "@/assets/hero-nebula.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroNebula})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) blur(2px)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="space-y-8 animate-float">
            <h1 className="text-7xl md:text-9xl font-bold text-glow animate-glow">
              EPSILON VI
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-xl md:text-3xl font-light">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" size={32} />
                <span className="text-foreground/90">16 | 17 | 18</span>
              </div>
              <span className="text-primary text-4xl md:text-6xl font-bold text-glow-purple">
                JANUARY 2026
              </span>
            </div>

            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Pakistan's Premier STEM Olympiad - Where Innovation Meets Excellence
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-glow animate-glow"
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-card to-card/50 card-glow border border-primary/20">
              <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-5xl font-bold text-primary mb-2 text-glow">80+</h3>
              <p className="text-lg text-foreground/80">Teams Competing</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-card to-card/50 card-glow border border-primary/20">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-accent" />
              <h3 className="text-5xl font-bold text-accent mb-2 text-glow-purple">3</h3>
              <p className="text-lg text-foreground/80">Days of Innovation</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-card to-card/50 card-glow border border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-5xl font-bold text-primary mb-2 text-glow">11+</h3>
              <p className="text-lg text-foreground/80">Challenge Modules</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Ready to Join the Galaxy?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Register your team now and embark on an extraordinary journey of STEM excellence.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
