import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const modules = [
  {
    id: 1,
    category: "General Modules",
    name: "AREA 51",
    description: "A module where quizzes and puzzles will meet practicality, testing logical reasoning and deduction prowess.",
    details: [
      "Focuses on logic, deduction, and problem-solving through practical and FUN challenges.",
      "Involves mazes, and scavenger hunts that blend reasoning with activity.",
      "Designed to test a participant's analytical and situational thinking.",
      "It's mostly based on real time thinking since the module itself is a mystery for the participants."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    category: "General Modules",
    name: "Cicada 3301",
    description: "Module based on Criminology, Intelligence Analysis, and Criminal Investigation.",
    details: [
      "Based on criminology, intelligence analysis, and real-world problem-solving, inspired by both real and fictional investigations.",
      "Participants will unravel complex cases involving cybercrime, fraud, espionage, or data leaks through logical deduction and evidence interpretation.",
      "Emphasizes a well-structured, interactive storyline that challenges participants to think like investigators rather than detectives of violent crime.",
      "Requires keen interest in crime-related media and fictional writing to create engaging mysteries."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 3,
    category: "General Modules",
    name: "Cerebral Labyrinth",
    description: "General trivia-based brain games demanding sharp intellect and wide-ranging general knowledge.",
    details: [
      "A general trivia and brain game module emphasizing quick thinking and wide knowledge.",
      "Focused on intellectual flexibility, memory, and reasoning.",
      "Includes quizzes, logic games, and rapid-fire challenges.",
      "Engages participants in competitive, high-energy mental rounds.",
      "Module head should design balanced difficulty levels for accessibility and challenge."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 4,
    category: "Subject-Related Modules",
    name: "Biochem Module",
    description: "Comprehensive biology and chemistry module with hands-on experiments.",
    details: [
      "Bio Section: Assembles all aspects of biology under one umbrella, testing theoretical and practical knowledge.",
      "Provides hands-on experience through various experiments including titrations, dissections, and questionnaires.",
      "Chem Section: Invites participants to immerse in chemistry through thrilling experiments.",
      "Success hinges on deep knowledge of chemistry's practical aspects and creativity in experiments.",
      "Makes chemistry come alive through innovative and engaging activities."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 5,
    category: "Subject-Related Modules",
    name: "Robosonic (Robotics)",
    description: "Versatile module based on the construction of robots using Arduino and various components.",
    details: [
      "Requires knowledge of Arduino, L298 motor drivers, DC motors, relays, and sensors (infrared and ultrasonic).",
      "Tests time management, critical thinking, and analytical skills side by side.",
      "Understanding of Bluetooth modules (HC05 being an example) is essential.",
      "All required skills are tested in a battle amongst the participants.",
      "Focus on hands-on construction and real-world robotics applications."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 6,
    category: "Subject-Related Modules",
    name: "Autocode (Programming)",
    description: "Takes you into the vast world of coding with problem-solving and time management challenges.",
    details: [
      "Tests programming skills along with time management and problem-solving.",
      "Experience in mainstream programming gives an edge.",
      "Focuses on knowledge of filing, sorting, strings, and arrays.",
      "Basic mathematical skills are a necessity.",
      "Challenges designed to test practical coding ability under pressure."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 7,
    category: "Subject-Related Modules",
    name: "Psychosphere (Psychology)",
    description: "Module revolving around pure psychology testing understanding of famous studies and breakthroughs.",
    details: [
      "Knowledge of famous psychological studies: Milgram, Skinner, Andrade, Bandura, and Laney required.",
      "Understanding of major breakthroughs like Freud, Watson, and Zimbardo is essential.",
      "Research methods and ethics to consider while preparing experiments are crucial.",
      "Ability to deduce causes of specific patterns of behavior is indispensable.",
      "Does not mandate psychology as a subject but tests on a comprehensive scale."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 8,
    category: "Subject-Related Modules",
    name: "Escherian Stairwell (Physics)",
    description: "Hands-on construction module diving into functional device creation.",
    details: [
      "Participants dive into the world of hands-on construction with various materials.",
      "Embark on the challenge of creating functional devices.",
      "Demands solid understanding of physics principles.",
      "Requires use of mechanical tools and creativity.",
      "Create unique and gravity-defying constructions."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 9,
    category: "Subject-Related Modules",
    name: "Euclid's Elements (Maths)",
    description: "Mathematical adventure with intricate conundrums testing expertise.",
    details: [
      "Participants grapple with intricate mathematical conundrums.",
      "Tailor-made for those with background in math competitions or interest in the subject.",
      "Requires firm grasp of mathematical concepts.",
      "Opportunity to create challenging mathematical problems.",
      "Showcases problem-solving prowess through creative mathematics."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 10,
    category: "Subject-Related Modules",
    name: "Terranova",
    description: "Newest addition focusing on environmental systems and sustainable development.",
    details: [
      "Focuses on environmental systems, climate change, and sustainable development practices.",
      "Module head should have strong awareness of current environmental issues and sustainable technologies.",
      "Involves themes like biodiversity conservation, renewable energy, pollution control, and waste management.",
      "Newest addition to the modules lineup.",
      "Emphasis on real-world environmental challenges and solutions."
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
];

export default function Modules() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const generalModules = modules.filter(m => m.category === "General Modules");
  const subjectModules = modules.filter(m => m.category === "Subject-Related Modules");

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Module Teams
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse range of challenge modules spanning general brain games to specialized STEM disciplines.
          </p>
        </div>

        {/* General Modules Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-glow-purple">
            General Modules
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {generalModules.map((module) => (
              <div
                key={module.id}
                className="p-8 rounded-2xl frosted-glass card-glow hover:border-primary/40 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 text-glow">
                      {module.name}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleModule(module.id)}
                    className="ml-4 hover:bg-primary/20"
                  >
                    {expandedModule === module.id ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </Button>
                </div>

                {expandedModule === module.id && (
                  <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {module.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all">
                          <img src={img} alt={`${module.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 pt-4 border-t border-primary/20">
                      {module.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3">
                          <span className="text-primary mt-1">•</span>
                          <p className="text-foreground/80 leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subject-Related Modules Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-glow-purple">
            Subject-Related Modules
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {subjectModules.map((module) => (
              <div key={module.id} className="p-8 rounded-2xl frosted-glass card-glow hover:border-accent/40 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 text-glow">{module.name}</h3>
                    <p className="text-foreground/80 leading-relaxed">{module.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleModule(module.id)} className="ml-4 hover:bg-accent/20">
                    {expandedModule === module.id ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                  </Button>
                </div>
                {expandedModule === module.id && (
                  <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                    {/* Module Logo Space */}
                    <div className="flex justify-center pb-6 border-b border-primary/20">
                      <div className="w-32 h-32 rounded-xl frosted-glass border-2 border-primary/30 flex items-center justify-center card-glow">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                          </div>
                          <span className="text-xs text-foreground/50">Module Logo</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {module.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-video rounded-lg overflow-hidden frosted-glass border border-accent/20 hover:border-accent/40 transition-all">
                          <img src={img} alt={`${module.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 pt-4 border-t border-accent/20">
                      {module.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3">
                          <span className="text-accent mt-1">•</span>
                          <p className="text-foreground/80 leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-2xl frosted-glass card-glow">
          <h2 className="text-3xl font-bold mb-4 text-glow">Ready to Take on the Challenge?</h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">Register your team now and compete in these exciting modules. Show your skills and win prestigious awards!</p>
          <Button onClick={() => navigate("/register")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}
