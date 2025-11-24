import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Award, ExternalLink } from "lucide-react";
import heroNebula from "@/assets/hero-nebula.jpg";
import { Particles } from "@/components/Particles";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Particles Background */}
      <Particles />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroNebula})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Minimal Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row items-start justify-between w-full">
              {/* Left side - Title */}
              <div className="space-y-4 md:space-y-6 flex-1">
                <h1 
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider leading-none"
                  style={{
                    color: 'rgba(220, 220, 240, 0.95)',
                    textShadow: '0 0 40px rgba(167, 139, 250, 0.6), 0 0 80px rgba(167, 139, 250, 0.4)',
                    fontWeight: 900,
                    letterSpacing: '0.1em'
                  }}
                >
                  EPSILON VI
                </h1>
                <p 
                  className="text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-widest"
                  style={{
                    color: 'rgba(220, 220, 240, 0.9)',
                    fontWeight: 300,
                    letterSpacing: '0.15em'
                  }}
                >
                  BEYOND THE HORIZON
                </p>
              </div>
              
              {/* Right side - Dates and CTA */}
              <div className="flex-shrink-0 text-right space-y-3 mt-8 md:mt-0">
                <div 
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider"
                  style={{
                    color: 'rgba(220, 220, 240, 0.95)',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}
                >
                  16 | 17 | 18
                </div>
                <div 
                  className="text-base md:text-lg lg:text-xl xl:text-2xl tracking-widest"
                  style={{
                    color: 'rgba(220, 220, 240, 0.85)',
                    letterSpacing: '0.2em'
                  }}
                >
                  JANUARY 2026
                </div>
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="bg-background/30 hover:bg-background/50 border border-foreground/20 text-foreground px-10 py-6 text-base md:text-lg backdrop-blur-md transition-all rounded-md"
                    onClick={() => navigate("/register")}
                    style={{
                      fontWeight: 500,
                      letterSpacing: '0.05em'
                    }}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
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
            Register your team and embark on an unforgettable journey through science and innovation
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-glow"
            onClick={() => navigate("/register")}
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* STEM Society Link */}
      <section className="py-16 bg-card/20 backdrop-blur-sm border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-glow-purple">Presented by STEM Society</h3>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Explore more events and initiatives by the STEM Society of Alpha College
          </p>
          <a 
            href="https://stem.orionedgedigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg transition-all text-primary hover:text-glow"
          >
            Visit STEM Society Website
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
