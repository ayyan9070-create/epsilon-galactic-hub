import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import heroNebula from "@/assets/hero-nebula.jpg";
import { Particles } from "@/components/Particles";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">

      {/* Particle Layer */}
      <Particles />

      {/* Fullscreen Nebula Background */}
      <section
        className="relative min-h-screen w-full flex items-center"
        style={{
          backgroundImage: `url(${heroNebula})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative z-10 w-full py-20">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row items-start justify-between w-full gap-12">

              {/* Left Side - Title */}
              <div className="space-y-4 md:space-y-6 max-w-3xl">
                <h1
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none"
                  style={{
                    background: "linear-gradient(135deg, #b8a7e8 0%, #9b87d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.02em",
                  }}
                >
                  EPSILON VI
                </h1>

                <p
                  className="text-xl md:text-2xl lg:text-3xl text-white"
                  style={{
                    letterSpacing: "0.15em",
                  }}
                >
                  BEYOND THE HORIZON
                </p>
              </div>

              {/* Right Side - Dates + CTA */}
              <div className="flex-shrink-0 text-right space-y-3">
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                  style={{ letterSpacing: "0.05em" }}
                >
                  16 | 17 | 18
                </div>

                <div
                  className="text-xl md:text-2xl text-white"
                  style={{ letterSpacing: "0.15em" }}
                >
                  JANUARY 2026
                </div>

                <div className="pt-4">
                  <Button
                    size="lg"
                    className="bg-white/90 hover:bg-white text-black px-8 py-6 text-base font-semibold rounded-lg transition-all"
                    onClick={() => navigate("/register")}
                    style={{ letterSpacing: "0.05em" }}
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
      <section className="py-20 bg-black">
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

      {/* STEM Society Section */}
      <section className="py-16 bg-card/20 backdrop-blur-sm border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-glow-purple">
            Presented by STEM Society
          </h3>

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
