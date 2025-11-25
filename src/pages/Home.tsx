import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
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
        {/* Background Image - No overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroNebula})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row items-start justify-between w-full">
              {/* Left side - Title */}
              <div className="space-y-2 md:space-y-4 max-w-3xl">
                <h1 
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none"
                  style={{
                    color: '#FFFFFF',
                    textShadow: '0 0 20px rgba(167, 139, 250, 0.3)',
                    fontWeight: 900,
                    letterSpacing: '0.05em'
                  }}
                >
                  EPSILON VI
                </h1>
                <p 
                  className="text-xl md:text-2xl lg:text-3xl"
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 400,
                    letterSpacing: '0.1em'
                  }}
                >
                  BEYOND THE HORIZON
                </p>
              </div>
              
              {/* Right side - Dates and CTA */}
              <div className="flex-shrink-0 text-right space-y-2 mt-8 md:mt-0">
                <div 
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 700,
                    letterSpacing: '0.08em'
                  }}
                >
                  16 | 17 | 18
                </div>
                <div 
                  className="text-lg md:text-xl lg:text-2xl"
                  style={{
                    color: '#FFFFFF',
                    letterSpacing: '0.15em',
                    fontWeight: 400
                  }}
                >
                  JANUARY 2026
                </div>
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-5 text-base backdrop-blur-sm transition-all rounded-lg"
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
