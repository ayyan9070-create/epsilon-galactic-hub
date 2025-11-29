import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Users, Megaphone, Trophy, Award, Star, Lightbulb } from "lucide-react";

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
      status: "pending", // ✅ New field
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-xl frosted-glass border border-primary/30 card-glow">
            <Award className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Recognition</h3>
            <p className="text-foreground/80 leading-relaxed">Gain official recognition and a certificate for your contribution to promoting science education.</p>
          </div>
          <div className="p-8 rounded-xl frosted-glass border border-primary/30 card-glow">
            <Users className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Networking</h3>
            <p className="text-foreground/80 leading-relaxed">Connect with like-minded individuals and be part of a community passionate about STEM.</p>
          </div>
          <div className="p-8 rounded-xl frosted-glass border border-primary/30 card-glow">
            <Lightbulb className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Experience</h3>
            <p className="text-foreground/80 leading-relaxed">Build valuable experience in marketing, outreach, and event management.</p>
          </div>
          <div className="p-8 rounded-xl frosted-glass border border-primary/30 card-glow">
            <Trophy className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Exclusive Perks</h3>
            <p className="text-foreground/80 leading-relaxed">Enjoy special rewards, recognition, and exclusive opportunities based on your performance.</p>
          </div>
        </div>

        {/* Ambassador Perks */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-purple">
            Ambassador Perks & Rewards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="p-8 rounded-xl frosted-glass border-2 border-primary/40 card-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
              <Trophy className="w-16 h-16 text-primary mb-4 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 text-primary relative z-10">Bring 10+ Teams</h3>
              <p className="text-foreground/80 leading-relaxed relative z-10">
                Earn a <span className="text-primary font-semibold">Token of Appreciation</span> + <span className="text-primary font-semibold">Exclusive Gift Prize</span> as a reward for exceptional outreach.
              </p>
            </div>
            
            <div className="p-8 rounded-xl frosted-glass border-2 border-accent/40 card-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16" />
              <Award className="w-16 h-16 text-accent mb-4 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 text-accent relative z-10">Bring 5+ Teams</h3>
              <p className="text-foreground/80 leading-relaxed relative z-10">
                Receive an official <span className="text-accent font-semibold">Token of Appreciation</span> recognizing your valuable contribution.
              </p>
            </div>
            
            <div className="p-8 rounded-xl frosted-glass border-2 border-primary/40 card-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
              <Star className="w-16 h-16 text-primary mb-4 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 text-primary relative z-10">Top 2 Ambassadors</h3>
              <p className="text-foreground/80 leading-relaxed relative z-10">
                Awarded <span className="text-primary font-semibold">Position Shields</span> and recognized <span className="text-primary font-semibold">on-stage</span> during the closing ceremony.
              </p>
            </div>
          </div>
          
          <div className="p-6 rounded-xl frosted-glass border border-accent/30 text-center">
            <p className="text-foreground/90 text-lg">
              <span className="font-semibold text-accent">Certification Requirement:</span> Brand Ambassadors are expected to bring in at least <span className="font-bold text-accent">3 teams</span> for certification.
            </p>
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
