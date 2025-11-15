import { Users, Calendar, Award, Target, Zap, Trophy, Sparkles, Shield } from "lucide-react";

export default function About() {
  // Placeholder gallery images - user will replace these
  const galleryImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            About Epsilon VI
          </h1>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed mb-8">
            Epsilon is the flagship three-day science olympiad organized by the STEM Society of Alpha College, 
            designed to test creativity, technical skill, and problem-solving under pressure.
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Epsilon VI will be a remarkable science showcase, featuring more than 12 diverse modules with 
              additional modules filled by the creativity of our members that will span an impressive range of 
              disciplines, from coding to criminology. Hopefully, drawing over 800 dedicated participants, the 
              event will foster a vibrant community united by a shared passion for discovery and a pursuit of knowledge.
            </p>
            <p>
              Participants form teams of 4–7 members, competing collaboratively in intellectually challenging and 
              fun modules. Features 12+ thrilling modules: 4 General and 8 STEM-based, Epsilon VI will be having 
              new modules.
            </p>
            <p>
              Each day functions as a qualifying round, where top-performing teams advance to subsequent stages, 
              narrowing the competition toward the final day. Epsilon VI will leave an indelible mark on everyone 
              involved, creating unforgettable experiences and deepening their appreciation for the wonders of science, 
              as well as getting their hands on real-world experiences fueled by teamwork and endurance.
            </p>
          </div>
        </div>

        {/* Event Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            Event Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="aspect-video rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all card-glow"
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect - Three Metric Cards */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-10 rounded-2xl frosted-glass card-glow hover:border-primary/40 transition-all">
              <Users className="w-20 h-20 mx-auto mb-6 text-primary animate-float" />
              <h3 className="text-6xl font-bold text-primary mb-3 text-glow">800+</h3>
              <p className="text-xl font-semibold text-foreground/90 mb-2">PARTICIPANTS</p>
              <p className="text-sm text-muted-foreground">
                Dedicated participants from across Pakistan
              </p>
            </div>

            <div className="text-center p-10 rounded-2xl frosted-glass card-glow hover:border-accent/40 transition-all">
              <Calendar className="w-20 h-20 mx-auto mb-6 text-accent animate-float" />
              <h3 className="text-6xl font-bold text-accent mb-3 text-glow-purple">3</h3>
              <p className="text-xl font-semibold text-foreground/90 mb-2">DAYS</p>
              <p className="text-sm text-muted-foreground">
                Of intense competition and innovation
              </p>
            </div>

            <div className="text-center p-10 rounded-2xl frosted-glass card-glow hover:border-primary/40 transition-all">
              <Award className="w-20 h-20 mx-auto mb-6 text-primary animate-float" />
              <h3 className="text-6xl font-bold text-primary mb-3 text-glow">12+</h3>
              <p className="text-xl font-semibold text-foreground/90 mb-2">MODULES</p>
              <p className="text-sm text-muted-foreground">
                Diverse STEM challenges to conquer
              </p>
            </div>
          </div>
        </div>

        {/* Executive Body */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            Executive Body
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {executiveBody.map((member, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl frosted-glass card-glow hover:border-primary/40 transition-all"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-sm text-primary font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Council */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            Executive Council
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {executiveCouncil.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl frosted-glass card-glow hover:border-accent/40 transition-all"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-xs text-accent font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-xl frosted-glass card-glow">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
            <p className="text-foreground/80 leading-relaxed">
              To inspire and empower the next generation of scientists, engineers, and innovators through 
              challenging competitions that foster creativity, critical thinking, and collaborative problem-solving.
            </p>
          </div>

          <div className="p-8 rounded-xl frosted-glass card-glow">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
            <p className="text-foreground/80 leading-relaxed">
              To establish Epsilon as the premier platform for STEM excellence in Pakistan, nurturing talent 
              that will drive innovation and technological advancement on a global scale.
            </p>
          </div>
        </div>

        {/* Brand Ambassador Perks */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            Brand Ambassador Perks
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-xl frosted-glass card-glow hover:border-primary/40 transition-all">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Bring 10+ Teams</h3>
                  <p className="text-foreground/80">
                    Earn a Token of Appreciation + Exclusive Gift Prize as a reward for exceptional outreach.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl frosted-glass card-glow hover:border-accent/40 transition-all">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Bring 5+ Teams</h3>
                  <p className="text-foreground/80">
                    Receive an official Token of Appreciation recognizing your contribution.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl frosted-glass card-glow hover:border-primary/40 transition-all">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Top 2 Brand Ambassadors</h3>
                  <p className="text-foreground/80">
                    Awarded Position Shields and recognized on-stage during the closing ceremony.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/30">
              <p className="text-foreground/90 font-semibold">
                Brand Ambassadors are expected to bring in at least 3 teams for certification
              </p>
            </div>
          </div>
        </div>

        {/* Why Participate */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-glow-purple">
            Why Participate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Trophy,
                title: "Compete for Glory",
                desc: "Win prestigious awards and recognition",
              },
              {
                icon: Users,
                title: "Network & Collaborate",
                desc: "Meet like-minded innovators from across Pakistan",
              },
              {
                icon: Zap,
                title: "Skill Development",
                desc: "Enhance your STEM skills through real challenges",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl frosted-glass card-glow hover:border-primary/40 transition-all"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
