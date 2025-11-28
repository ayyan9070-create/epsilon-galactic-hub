import "../styles/style.css";
import { Users, Calendar, Award, Target, Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
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

  // Smooth horizontal scroll for marquee replacement
  const marqueeText = [
    "INNOVATION",
    "CREATIVITY",
    "TECHNOLOGY",
    "SCIENCE",
    "ENGINEERING",
    "MATHEMATICS",
  ];

  return (
    <div className="about-page text-white overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section relative min-h-screen flex flex-col overflow-hidden">
        <img
          src="/img/bg-hero.png"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="background"
        />
        <main className="flex-grow relative flex flex-col items-center justify-center text-center z-20 px-6 -mt-16">
          <img
            src="/img/present-badge.svg"
            className="mb-4 w-48 animate-fade-up delay-load-100"
            alt="Badge"
          />
          <h1 className="leading-none animate-fade-up delay-load-200">
            <div className="text-9xl md:text-9xl font-bebas text-gradient-purple">
              EPSILON VI
            </div>
            <div className="text-2xl md:text-2xl mt-2 font-questrial text-gradient tracking-[0.2em]">
              BEYOND THE HORIZON
            </div>
          </h1>
          <a className="block mt-10 animate-fade-up delay-load-300 hover:scale-105 transition-all">
            <img
              src="/img/hero-button.svg"
              className="w-[120px] h-[118px]"
              alt="Scroll"
            />
          </a>
        </main>
      </section>

      {/* ================= DATE + LOGO BANNER ================= */}
      <section className="relative w-full py-12 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row w-full rounded-2xl overflow-hidden backdrop-blur-[50px] shadow-lg">
            <div className="w-full lg:w-1/2 p-10 bg-gradient-to-r from-[rgba(133,71,246,0.1)] to-[rgba(183,121,245,0.2)] border-r border-white/20">
              <img src="/img/epsilon-logo.svg" className="w-[379px]" />
            </div>
            <div className="w-full lg:w-1/2 p-10 bg-gradient-to-r from-[rgba(183,121,245,0.2)] to-[rgba(133,71,246,0.1)]">
              <span className="font-bebas text-[80px]">16-17-18</span>
              <div>
                <span className="font-questrial text-4xl">January 2025</span>
                <p className="text-lg">where innovation comes alive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE REPLACEMENT ================= */}
      <section className="relative py-12 overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap animate-marquee"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {marqueeText.map((text, i) => (
            <span
              key={i}
              className="text-4xl font-bold text-gradient px-6 tracking-widest"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ================= WHAT TO EXPECT ================= */}
      <section className="relative w-full py-24 px-6">
        <div className="max-w-[1300px] mx-auto text-center">
          <img src="/img/epsi-badge.svg" className="mx-auto" />
          <h2 className="font-clash-display text-6xl text-gradient mt-4">
            WHAT TO EXPECT
          </h2>
          <img
            src="/img/expect.svg"
            className="w-full max-w-[1300px] mx-auto mt-12"
            alt="Expect"
          />
        </div>
      </section>

      {/* ================= MODULES ================= */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="/img/module-bg.svg"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative max-w-[1300px] mx-auto px-6">
          <img src="/img/modules-badge.svg" className="mx-auto" />
          <h2 className="font-clash-display text-6xl text-gradient text-center mt-4">
            EPSILON VI MODULES
          </h2>
        </div>
      </section>

      {/* ================= GRADIENT DIVIDER ================= */}
      <div className="w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mb-24" />

      {/* ================= REACT CONTENT ================= */}
      <div className="container mx-auto px-4 py-20">
        {/* ABOUT HEADER */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-glow tracking-wider">
            ABOUT EPSILON VI
          </h1>
          <div className="max-w-5xl mx-auto space-y-6 text-lg md:text-xl text-white/90 leading-relaxed">
            <p>Epsilon is the flagship three-day science olympiad…</p>
            <p>Epsilon VI will be a remarkable science showcase…</p>
            <p>Participants form teams of 4–7 members…</p>
            <p>Each day functions as a qualifying round…</p>
          </div>
        </motion.div>

        {/* COUNTERS */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-16 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <Users className="w-20 h-20 text-purple-400" />
            <h3 className="text-5xl font-black text-purple-400">80+</h3>
            <p className="text-xl font-bold text-white/90">TEAMS</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Calendar className="w-20 h-20 text-pink-400" />
            <h3 className="text-5xl font-black text-pink-400">3</h3>
            <p className="text-xl font-bold text-white/90">DAYS</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Award className="w-20 h-20 text-purple-400" />
            <h3 className="text-5xl font-black text-purple-400">11+</h3>
            <p className="text-xl font-bold text-white/90">MODULES</p>
          </div>
        </motion.div>

        {/* GALLERY */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-glow-purple">
            Event Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="aspect-video rounded-xl overflow-hidden border border-white/10"
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* EXECUTIVE BODY */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-glow-purple">
            Executive Body
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {executiveBody.map((member, index) => (
              <div
                key={index}
                className="p-8 frosted-glass rounded-xl border border-white/10"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={member.image}
                    className="w-40 h-40 rounded-xl object-cover border-4 border-purple-300"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-4xl font-black text-white italic">
                      {member.name}
                    </h3>
                    <p className="text-purple-400 font-bold text-lg mb-3">
                      {member.role}
                    </p>
                    <p className="text-white/70">Phone: 0321 3409951</p>
                    <p className="text-white/70">Email: member@example.com</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* EXECUTIVE COUNCIL */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-glow-purple">
            Executive Council
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {executiveCouncil.map((member, index) => (
              <div
                key={index}
                className="p-6 frosted-glass rounded-xl border border-white/10 text-center"
              >
                <img
                  src={member.image}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-pink-300 mb-3"
                />
                <h3 className="font-bold text-white">{member.name}</h3>
                <p className="text-pink-400 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MISSION + VISION */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 frosted-glass rounded-xl border border-white/10">
            <Target className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
            <p className="text-white/80">
              To inspire and empower the next generation of scientists…
            </p>
          </div>
          <div className="p-8 frosted-glass rounded-xl border border-white/10">
            <Zap className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-white/80">
              To establish Epsilon as the premier platform for STEM excellence…
            </p>
          </div>
        </motion.div>

        {/* WHY PARTICIPATE */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Trophy className="w-16 h-16 mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl font-bold mb-6 text-glow-purple">
            Why Participate?
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Epsilon VI offers an unparalleled opportunity to challenge yourself…
          </p>
        </motion.div>
      </div>
    </div>
  );
}
