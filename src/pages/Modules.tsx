import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const modules = [
  {
    id: 1,
    name: "Robotics Challenge",
    description: "Design and build autonomous robots to complete complex tasks.",
    details: "Teams will design, build, and program robots to navigate obstacle courses, manipulate objects, and complete mission-critical tasks. Focus on mechanical design, sensor integration, and autonomous navigation algorithms.",
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    description: "Develop intelligent systems using cutting-edge AI techniques.",
    details: "Create machine learning models for real-world applications. Topics include computer vision, natural language processing, neural networks, and predictive analytics. Use popular frameworks like TensorFlow and PyTorch.",
  },
  {
    id: 3,
    name: "Cybersecurity",
    description: "Defend against digital threats and secure critical systems.",
    details: "Learn offensive and defensive security techniques. Challenges include penetration testing, cryptography, network security, and incident response. Compete in Capture The Flag (CTF) style competitions.",
  },
  {
    id: 4,
    name: "IoT Innovation",
    description: "Build connected devices for smart solutions.",
    details: "Design Internet of Things systems integrating sensors, actuators, and cloud platforms. Create smart home solutions, environmental monitoring systems, and industrial IoT applications.",
  },
  {
    id: 5,
    name: "Data Science",
    description: "Extract insights from complex datasets.",
    details: "Analyze large datasets using statistical methods and visualization tools. Perform exploratory data analysis, build predictive models, and communicate findings through compelling visualizations.",
  },
  {
    id: 6,
    name: "Web Development",
    description: "Create innovative web applications.",
    details: "Build full-stack web applications using modern frameworks. Focus on responsive design, user experience, API development, and deployment strategies. Technologies include React, Node.js, and cloud platforms.",
  },
  {
    id: 7,
    name: "Mobile App Development",
    description: "Design apps for iOS and Android platforms.",
    details: "Create cross-platform mobile applications with native performance. Learn mobile UI/UX design principles, state management, and integration with device features and backend services.",
  },
  {
    id: 8,
    name: "Biotech Innovation",
    description: "Apply technology to biological challenges.",
    details: "Explore the intersection of biology and technology. Projects may include bioinformatics, genetic algorithms, medical device prototyping, and computational biology.",
  },
  {
    id: 9,
    name: "Renewable Energy",
    description: "Engineer sustainable energy solutions.",
    details: "Design and optimize renewable energy systems. Challenges include solar panel efficiency, wind turbine design, energy storage solutions, and smart grid integration.",
  },
  {
    id: 10,
    name: "Space Technology",
    description: "Explore aerospace engineering challenges.",
    details: "Work on satellite design, orbital mechanics, spacecraft systems, and space exploration technologies. Includes simulation and hands-on hardware challenges.",
  },
  {
    id: 11,
    name: "Quantum Computing",
    description: "Dive into the quantum realm.",
    details: "Introduction to quantum algorithms, quantum gates, and quantum programming. Use platforms like Qiskit to solve optimization problems and explore quantum advantage.",
  },
  {
    id: 12,
    name: "3D Printing & Design",
    description: "Create physical prototypes with additive manufacturing.",
    details: "Learn CAD modeling, 3D printing techniques, material selection, and design for manufacturing. Create functional prototypes for engineering challenges.",
  },
];

export default function Modules() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Challenge Modules
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse range of STEM challenges. Each module is designed to test your skills, creativity, and problem-solving abilities.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {modules.map((module) => (
            <div
              key={module.id}
              className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all card-glow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-foreground">{module.name}</h3>
                <button
                  onClick={() => toggleModule(module.id)}
                  className="text-primary hover:text-accent transition-colors"
                >
                  {expandedModule === module.id ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
              </div>
              
              <p className="text-sm text-foreground/70 mb-3">{module.description}</p>
              
              {expandedModule === module.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {module.details}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Register for This Module
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4 text-glow-purple">
            Ready to Take on the Challenge?
          </h2>
          <p className="text-foreground/80 mb-6">
            Register your team now and choose your modules during the event.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
          >
            Register Your Team
          </Button>
        </div>
      </div>
    </div>
  );
}
