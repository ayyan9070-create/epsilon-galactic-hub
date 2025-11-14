import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Challan } from "@/components/Challan";

export default function Register() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [formData, setFormData] = useState({
    teamLeaderName: "",
    email: "",
    school: "",
    teamSize: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to register for the event.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("registrations")
        .insert([
          {
            user_id: user.id,
            team_leader_name: formData.teamLeaderName,
            email: formData.email,
            school: formData.school,
            team_size: formData.teamSize,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success("Registration successful! Your challan is ready.");
      setRegistrationData(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center p-12 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 card-glow max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-glow">Login Required</h2>
          <p className="text-foreground/80 mb-6">
            Please login or create an account to register for Epsilon VI.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  if (registrationData) {
    return (
      <div className="min-h-screen py-20">
        <Challan registration={registrationData} userId={user.id} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Team Registration
          </h1>
          <p className="text-xl text-foreground/80">
            Register your team for Epsilon VI 2026
          </p>
        </div>

        {/* User ID Display */}
        <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-sm text-foreground/80 mb-1">Logged in as:</p>
          <p className="text-xs font-mono text-primary break-all">{user.id}</p>
        </div>

        {/* Registration Form */}
        <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 card-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamLeader">Team Leader Name *</Label>
              <Input
                id="teamLeader"
                value={formData.teamLeaderName}
                onChange={(e) =>
                  setFormData({ ...formData, teamLeaderName: e.target.value })
                }
                required
                placeholder="Enter team leader's full name"
                className="bg-background/50 border-primary/30 focus:border-primary input-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="team@example.com"
                className="bg-background/50 border-primary/30 focus:border-primary input-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School/Institution *</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
                }
                required
                placeholder="Enter your institution name"
                className="bg-background/50 border-primary/30 focus:border-primary input-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size (1-4 members) *</Label>
              <Input
                id="teamSize"
                type="number"
                min="1"
                max="4"
                value={formData.teamSize}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teamSize: parseInt(e.target.value),
                  })
                }
                required
                className="bg-background/50 border-primary/30 focus:border-primary input-glow"
              />
            </div>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
              <p className="text-sm text-foreground/90">
                <strong>Registration Fee:</strong> PKR 3,000
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Payment challan will be generated after registration
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
            >
              {loading ? "Registering..." : "Complete Registration"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
