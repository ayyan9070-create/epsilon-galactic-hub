import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contacts").insert([formData]);

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Get In Touch
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Have questions about Epsilon VI? We're here to help. Reach out and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl frosted-glass border border-primary/20 card-glow">
              <Mail className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Email</h3>
              <p className="text-foreground/70">info@epsilon.org.pk</p>
              <p className="text-foreground/70">support@epsilon.org.pk</p>
            </div>

            <div className="p-6 rounded-xl frosted-glass border border-accent/20 card-glow">
              <Phone className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Phone</h3>
              <p className="text-foreground/70">+92 300 1234567</p>
              <p className="text-foreground/70">+92 321 9876543</p>
            </div>

            <div className="p-6 rounded-xl frosted-glass border border-primary/20 card-glow">
              <MapPin className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Location</h3>
              <p className="text-foreground/70">
                Pakistan Science Foundation<br />
                Islamabad, Pakistan
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl frosted-glass border border-primary/20 card-glow">
            <h2 className="text-2xl font-bold mb-6 text-glow-purple">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="John Doe"
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
                  placeholder="+92 XXX XXXXXXX"
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  placeholder="How can we help?"
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="bg-background/50 border-primary/30 focus:border-primary input-glow resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
