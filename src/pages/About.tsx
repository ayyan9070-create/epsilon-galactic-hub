import { Users, Calendar, Award, Target, Zap, Trophy } from "lucide-react";

export default function About() {
  const galleryImages = ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];
  const executiveBody = [
    { name: "Name 1", role: "Position 1", image: "/placeholder.svg" },
    { name: "Name 2", role: "Position 2", image: "/placeholder.svg" },
    { name: "Name 3", role: "Position 3", image: "/placeholder.svg" },
  ];
  const executiveCouncil = [
    { name: "Name 1", role: "Council Position 1", image: "/placeholder.svg" },
    { name: "Name 2", role: "Council Position 2", image: "/placeholder.svg" },
    { name: "Name 3", role: "Council Position 3", image: "/placeholder.svg" },
    { name: "Name 4", role: "Council Position 4", image: "/placeholder.svg" },
    { name: "Name 5", role: "Council Position 5", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">About Epsilon VI</h1>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed mb-8">
            Epsilon is the flagship three-day science olympiad organized by the STEM Society of Alpha College, designed to test creativity, technical skill, and problem-solving under pressure.
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-4 text-foreground/80 leading-relaxed">
            <p>Epsilon VI will be a remarkable science showcase, featuring more than 12 diverse modules with additional modules filled by the creativity of our members that will span an impressive range of disciplines, from coding to criminology. Hopefully, drawing over 800 dedicated participants, the event will foster a vibrant community united by a shared passion for discovery and a pursuit of knowledge.</p>
            <p>Participants form teams of 4–7 members, competing collaboratively in intellectually challenging and fun modules. Features 12+ thrilling modules: 4 General and 8 STEM-based, Epsilon VI will be having new modules.</p>
            <p>Each day functions as a qualifying round, where top-performing teams advance to subsequent stages, narrowing the competition toward the final day. Epsilon VI will leave an indelible mark on everyone involved, creating unforgettable experiences and deepening their appreciation for the wonders of science, as well as getting their hands on real-world experiences fueled by teamwork and endurance.</p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">Event Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="aspect-video rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all card-glow">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-glow-purple">What to Expect</h2>
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <line x1="50%" y1="15%" x2="25%" y2="40%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="15%" x2="75%" y2="40%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="15%" x2="50%" y2="65%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
            </svg>
            
            {/* Top Center Circle */}
            <div className="flex justify-center mb-32 relative">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-2xl animate-pulse" />
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 backdrop-blur-md border-4 border-primary/60 flex items-center justify-center card-glow">
                  <Target className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* 80+ Teams Card */}
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-primary/60 backdrop-blur-md border-4 border-primary/60 flex items-center justify-center">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="pt-12 p-8 rounded-xl frosted-glass card-glow border border-primary/20 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-4xl text-primary/10">+</div>
                  <div className="absolute bottom-4 right-4 text-4xl text-primary/10">+</div>
                  <h3 className="text-4xl font-bold text-center text-primary mb-4">80+ TEAMS</h3>
                  <p className="text-center text-foreground/80 text-sm leading-relaxed">
                    Hosting over 80 teams, Epsilon unfolds as a three-day odyssey of intellect, innovation, and discovery.
                  </p>
                </div>
              </div>

              {/* 3 Days Card */}
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/40 to-accent/60 backdrop-blur-md border-4 border-accent/60 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="pt-12 p-8 rounded-xl frosted-glass card-glow border border-accent/20 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-4xl text-accent/10">+</div>
                  <div className="absolute bottom-4 right-4 text-4xl text-accent/10">+</div>
                  <h3 className="text-4xl font-bold text-center text-accent mb-4">3 DAYS</h3>
                  <p className="text-center text-foreground/80 text-sm leading-relaxed">
                    A three-day odyssey of intellect, innovation, and discovery awaits at Epsilon.
                  </p>
                </div>
              </div>

              {/* 11+ Modules Card */}
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-primary/60 backdrop-blur-md border-4 border-primary/60 flex items-center justify-center">
                      <Award className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="pt-12 p-8 rounded-xl frosted-glass card-glow border border-primary/20 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-4xl text-primary/10">+</div>
                  <div className="absolute bottom-4 right-4 text-4xl text-primary/10">+</div>
                  <h3 className="text-4xl font-bold text-center text-primary mb-4">11+ MODULES</h3>
                  <p className="text-center text-foreground/80 text-sm leading-relaxed">
                    Epsilon's modules blend mystery, intellect, and innovation into a unified experience of exploration. Each challenge pushes creative and analytical limits across science, technology, and logic. Together, they form the ultimate test of curiosity and human potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">Executive Body</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {executiveBody.map((member, index) => (
              <div key={index} className="relative group">
                <div className="p-6 md:p-8 rounded-2xl frosted-glass card-glow hover:border-primary/60 transition-all duration-300 border border-primary/20">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Image Section */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />
                      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-primary/40 group-hover:border-primary/60 transition-all">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    {/* Details Section */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-wide" style={{ fontStyle: 'italic' }}>
                        {member.name}
                      </h3>
                      <p className="text-primary font-bold text-lg mb-4">{member.role}</p>
                      <div className="space-y-2 text-foreground/70">
                        <p className="flex items-center justify-center md:justify-start gap-2">
                          <span className="font-semibold">Phone:</span> <span>0321 3409951</span>
                        </p>
                        <p className="flex items-center justify-center md:justify-start gap-2">
                          <span className="font-semibold">Email:</span> <span>member@example.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">Executive Council</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {executiveCouncil.map((member, index) => (
              <div key={index} className="relative group">
                <div className="p-6 rounded-xl frosted-glass card-glow hover:border-accent/60 transition-all duration-300">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-primary opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-accent/40 group-hover:border-accent/60 transition-all">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-center text-foreground mb-1">{member.name}</h3>
                  <p className="text-center text-accent font-semibold text-xs">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-xl frosted-glass card-glow">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
            <p className="text-foreground/80 leading-relaxed">To inspire and empower the next generation of scientists, engineers, and innovators through challenging competitions that foster creativity, critical thinking, and collaborative problem-solving.</p>
          </div>
          <div className="p-8 rounded-xl frosted-glass card-glow">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
            <p className="text-foreground/80 leading-relaxed">To establish Epsilon as the premier platform for STEM excellence in Pakistan, nurturing talent that will drive innovation and technological advancement on a global scale.</p>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <Trophy className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-6 text-glow-purple">Why Participate?</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">Epsilon VI offers an unparalleled opportunity to challenge yourself, collaborate with brilliant minds, and showcase your skills on a competitive stage.</p>
        </div>
      </div>
    </div>
  );
}
