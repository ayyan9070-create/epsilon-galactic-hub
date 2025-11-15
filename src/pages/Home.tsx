import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Award } from "lucide-react";
import heroNebula from "@/assets/hero-nebula.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroNebula})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side - Title */}
            <div className="flex-1 space-y-6">
              <h1 
                className="text-7xl md:text-9xl font-black text-foreground/90 tracking-wider"
                style={{
                  textShadow: '0 0 30px rgba(167, 139, 250, 0.5), 0 0 60px rgba(167, 139, 250, 0.3)',
                  fontWeight: 900,
                  letterSpacing: '0.05em'
                }}
              >
                EPSILON VI
              </h1>
              <p className="text-2xl md:text-3xl text-foreground font-light tracking-wide">
                BEYOND THE HORIZON
              </p>
            </div>
            
            {/* Right side - Dates and CTA */}
            <div className="flex-shrink-0 text-right space-y-4">
              <div className="text-6xl md:text-8xl font-bold text-foreground tracking-wider">
                16 | 17 | 18
              </div>
              <div className="text-xl md:text-2xl text-foreground/90 tracking-widest">
                JANUARY 2026
              </div>
              <Button 
                size="lg" 
                className="mt-6 bg-background/40 hover:bg-background/60 border border-primary/30 text-foreground px-8 py-6 text-lg backdrop-blur-sm transition-all"
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
            </div>
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
