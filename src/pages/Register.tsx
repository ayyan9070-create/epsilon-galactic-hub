import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Challan } from "@/components/Challan";

// Modules Lists
const GENERAL_MODULES = ["AREA 51", "Cicada 3301", "Cerebral Labyrinth"];
const STEM_MODULES = [
  "Biochem",
  "Robosonic",
  "Autocode",
  "Psychosphere",
  "Escherian Stairwell",
  "Euclid's Elements",
  "Terranova",
];


setBrandAmbassadors(brandAmbassadorsList);

// Helper to generate 6-digit team ID
const generateTeamId = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [brandAmbassadors, setBrandAmbassadors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    teamLeaderName: "",
    teamLeaderEmail: "",
    teamLeaderContact: "",
    teamName: "",
    teamSize: 4,
    members: Array(4).fill({ name: "", email: "", contact: "" }),
    generalModules: [] as string[],
    stemModules: [] as string[],
    brandAmbassador: "",
  });
  
// Hardcoded brand ambassadors
const brandAmbassadorsList = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Davis",
  "Diana Prince",
  "Ethan Hunt",
];
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch approved brand ambassadors
supabase
  .from("brand_ambassador_applications")
  .select("name")
  .eq("status", "approved") // ✅ Only approved ambassadors
  .then(({ data, error }) => {
    if (!error && data) setBrandAmbassadors(data.map((b) => b.name));
  });


    return () => subscription?.unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center p-12 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 card-glow max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-glow">Login Required</h2>
          <p className="text-foreground/80 mb-6">
            Please login or create an account to register for Epsilon VI.
          </p>
          <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleModuleSelect = (type: "general" | "stem", module: string) => {
    const current = type === "general" ? formData.generalModules : formData.stemModules;
    const maxLimit = type === "general" ? 3 : 5;

    if (current.includes(module)) {
      // deselect
      const updated = current.filter((m) => m !== module);
      setFormData({ ...formData, [type === "general" ? "generalModules" : "stemModules"]: updated });
    } else {
      if (current.length >= maxLimit) return toast.error(`You can select max ${maxLimit} ${type} modules`);
      setFormData({
        ...formData,
        [type === "general" ? "generalModules" : "stemModules"]: [...current, module],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.generalModules.length + formData.stemModules.length > 6) {
      toast.error("Overall module selection cannot exceed 6");
      setLoading(false);
      return;
    }

    try {
      const teamId = generateTeamId();

      const { data, error } = await supabase
        .from("registrations")
        .insert([
          {
            user_id: user.id,
            team_id: teamId,
            team_name: formData.teamName,
            team_leader_name: formData.teamLeaderName,
            team_leader_email: formData.teamLeaderEmail,
            team_leader_contact: formData.teamLeaderContact,
            team_size: formData.teamSize,
            members: formData.members,
            modules_selected: { general: formData.generalModules, stem: formData.stemModules },
            brand_ambassador: formData.brandAmbassador,
            registration_status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      toast.success("Registration successful! Your challan is ready.");
      setRegistrationData(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (registrationData) {
    return (
      <div className="min-h-screen py-20">
        <Challan registration={registrationData} userId={user.id} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow text-center">Team Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl">
          {/* Team Leader Info */}
          <div className="space-y-2">
            <Label>Team Leader Name *</Label>
            <Input
              required
              value={formData.teamLeaderName}
              onChange={(e) => setFormData({ ...formData, teamLeaderName: e.target.value })}
            />
            <Label>Email *</Label>
            <Input
              type="email"
              required
              value={formData.teamLeaderEmail}
              onChange={(e) => setFormData({ ...formData, teamLeaderEmail: e.target.value })}
            />
            <Label>Contact Number *</Label>
            <Input
              type="text"
              required
              value={formData.teamLeaderContact}
              onChange={(e) => setFormData({ ...formData, teamLeaderContact: e.target.value })}
            />
            <Label>Team Name *</Label>
            <Input
              required
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            />
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl">Team Members (4–7)</h2>
            {formData.members.map((member, i) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Name"
                  required
                  value={member.name}
                  onChange={(e) => handleMemberChange(i, "name", e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  required
                  value={member.email}
                  onChange={(e) => handleMemberChange(i, "email", e.target.value)}
                />
                <Input
                  placeholder="Contact"
                  required
                  value={member.contact}
                  onChange={(e) => handleMemberChange(i, "contact", e.target.value)}
                />
              </div>
            ))}
            <div className="flex gap-2">
              {formData.teamSize < 7 && (
                <Button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      teamSize: formData.teamSize + 1,
                      members: [...formData.members, { name: "", email: "", contact: "" }],
                    });
                  }}
                >
                  Add Member
                </Button>
              )}
              {formData.teamSize > 4 && (
                <Button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      teamSize: formData.teamSize - 1,
                      members: formData.members.slice(0, -1),
                    });
                  }}
                >
                  Remove Member
                </Button>
              )}
            </div>
          </div>

          {/* Module Selection */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl">Select Modules</h2>
            <p>General Modules (max 3)</p>
            <div className="flex flex-wrap gap-2">
              {GENERAL_MODULES.map((m) => (
                <Button
                  type="button"
                  key={m}
                  variant={formData.generalModules.includes(m) ? "default" : "outline"}
                  onClick={() => handleModuleSelect("general", m)}
                >
                  {m}
                </Button>
              ))}
            </div>
            <p>STEM/Subject Modules (max 5)</p>
            <div className="flex flex-wrap gap-2">
              {STEM_MODULES.map((m) => (
                <Button
                  type="button"
                  key={m}
                  variant={formData.stemModules.includes(m) ? "default" : "outline"}
                  onClick={() => handleModuleSelect("stem", m)}
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>

          {/* Brand Ambassador */}
<div>
  <Label>Brand Ambassador</Label>
  <select
    className="w-full border rounded p-2"
    value={formData.brandAmbassador}
    onChange={(e) => setFormData({ ...formData, brandAmbassador: e.target.value })}
  >
    <option value="">Select Brand Ambassador</option>
    {brandAmbassadors.map((ba) => (
      <option key={ba} value={ba}>
        {ba}
      </option>
    ))}
  </select>
</div>

          {/* Fee Display */}
          <div className="p-4 bg-accent/10 border rounded">
            <p>
              <strong>Registration Fee:</strong> PKR {formData.teamSize * 4000} (
              {formData.teamSize} members × PKR 4,000)
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent py-4 text-lg">
            {loading ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
      </div>
    </div>
  );
}
