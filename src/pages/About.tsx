import { Users, Calendar, Award, Target, Zap, Trophy } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            About Epsilon VI
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Pakistan's most prestigious STEM olympiad, bringing together the brightest minds to compete, innovate, and excel.
          </p>
        </div>

        {/* What to Expect - Three Metric Cards */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-card to-card/50 card-glow border border-primary/20 hover:border-primary/40 transition-all">
              <Users className="w-20 h-20 mx-auto mb-6 text-primary animate-float" />
              <h3 className="text-6xl font-bold text-primary mb-3 text-glow">80+</h3>
              <p className="text-xl font-semibold text-foreground/90 mb-2">TEAMS</p>
              <p className="text-sm text-muted-foreground">
                Competing from across Pakistan
              </p>
            </div>

            <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-card to-card/50 card-glow border border-accent/20 hover:border-accent/40 transition-all">
              <Calendar className="w-20 h-20 mx-auto mb-6 text-accent animate-float" />
              <h3 className="text-6xl font-bold text-accent mb-3 text-glow-purple">3</h3>
              <p className="text-xl font-semibold text-foreground/90 mb-2">DAYS</p>
              <p className="text-sm text-muted-foreground">
                Of intense competition and innovation
              </p>
            </div>

            <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-card to-card/50 card-glow border border-primary/20 hover:border-primary/40 transition-all">
              <Award className="w-20 h-20 mx-auto mb-6 text-primary animate-float" />
              <h3 className="text-6xl font-bold text-primary mb-3 text-glow">11+</h3>
              <p className="text-xl font-semibold text-foreground/90 mb-2">MODULES</p>
              <p className="text-sm text-muted-foreground">
                Diverse STEM challenges to conquer
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
            <p className="text-foreground/80 leading-relaxed">
              To inspire and empower the next generation of scientists, engineers, and innovators through challenging competitions that foster creativity, critical thinking, and collaborative problem-solving.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-accent/20">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
            <p className="text-foreground/80 leading-relaxed">
              To establish Epsilon as the premier platform for STEM excellence in Pakistan, nurturing talent that will drive innovation and technological advancement on a global scale.
            </p>
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
                className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border hover:border-primary/40 transition-all"
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
