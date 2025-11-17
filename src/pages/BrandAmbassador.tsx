import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Users, Megaphone, Trophy } from "lucide-react";

export default function BrandAmbassador() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    phone: "",
    cnic: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock photo URL (in production, upload to storage)
      const photoUrl = photoFile ? URL.createObjectURL(photoFile) : null;

      const { data, error } = await supabase
        .from("brand_ambassador_applications")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            school: formData.school,
            phone: formData.phone,
            cnic: formData.cnic,
            photo_url: photoUrl,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success(
        `Application submitted successfully! Application ID: ${data.id.slice(0, 8)}...`
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        school: "",
        phone: "",
        cnic: "",
      });
      setPhotoFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Brand Ambassador
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Become the face of Epsilon VI at your institution. Spread innovation, inspire peers, and earn exclusive perks.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: Users,
              title: "Networking",
              desc: "Connect with ambassadors from other institutions",
            },
            {
              icon: Megaphone,
              title: "Leadership",
              desc: "Develop marketing and outreach skills",
            },
            {
              icon: Trophy,
              title: "Recognition",
              desc: "Certificate and LinkedIn endorsement",
            },
            {
              icon: Sparkles,
              title: "Exclusive Perks",
              desc: "Special rewards based on team referrals",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all"
            >
              <benefit.icon className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Ambassador Perks */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 card-glow">
          <h2 className="text-3xl font-bold mb-8 text-center text-glow-purple">
            Ambassador Perks & Rewards
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  10+
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Bring 10+ Teams</h3>
                  <p className="text-foreground/80">
                    Earn a <span className="text-primary font-semibold">Token of Appreciation</span> + <span className="text-accent font-semibold">Exclusive Gift Prize</span> as a reward for exceptional outreach.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                  5+
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-accent">Bring 5+ Teams</h3>
                  <p className="text-foreground/80">
                    Receive an official <span className="text-accent font-semibold">Token of Appreciation</span> recognizing your contribution.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20">
              <div className="flex items-start gap-4">
                <Trophy className="flex-shrink-0 w-12 h-12 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Top 2 Brand Ambassadors</h3>
                  <p className="text-foreground/80">
                    Awarded <span className="text-primary font-semibold">Position Shields</span> and recognized on-stage during the closing ceremony.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-foreground/70 text-center">
                <strong className="text-primary">Note:</strong> Brand Ambassadors are expected to bring in at least <strong>3 teams</strong> for certification.
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 card-glow">
          <h2 className="text-2xl font-bold mb-6 text-center text-glow-purple">
            Apply Now
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">School/Institute *</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) =>
                    setFormData({ ...formData, school: e.target.value })
                  }
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number *</Label>
                <Input
                  id="cnic"
                  value={formData.cnic}
                  onChange={(e) =>
                    setFormData({ ...formData, cnic: e.target.value })
                  }
                  required
                  placeholder="XXXXX-XXXXXXX-X"
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photograph</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
