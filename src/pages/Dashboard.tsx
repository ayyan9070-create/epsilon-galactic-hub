import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRegistration(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRegistration(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRegistration = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      setRegistration(data);
    } catch (error: any) {
      console.error("Error fetching registration:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user || !registration) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${registration.team_id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-proofs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("payment-proofs")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("registrations")
        .update({ payment_proof_url: publicUrl })
        .eq("id", registration.id);

      if (updateError) throw updateError;

      toast.success("Payment proof uploaded successfully!");
      fetchRegistration(user.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-glow">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center p-12 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 card-glow max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-glow">Login Required</h2>
          <p className="text-foreground/80 mb-6">
            Please login to view your registration dashboard.
          </p>
          <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center p-12 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 card-glow max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-glow">No Registration Found</h2>
          <p className="text-foreground/80 mb-6">
            You haven't registered for Epsilon VI yet.
          </p>
          <Button onClick={() => navigate("/register")} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Register Now
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: any; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      paid: { variant: "default", label: "Paid" },
      verified: { variant: "default", label: "Verified" },
      unpaid: { variant: "destructive", label: "Unpaid" },
    };
    const config = statusMap[status] || statusMap.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow text-center">My Registration</h1>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Registration Details</h2>
            {getStatusBadge(registration.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-foreground/60">Team ID</p>
              <p className="font-semibold text-lg">{registration.team_id}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Team Name</p>
              <p className="font-semibold text-lg">{registration.team_name}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Team Leader</p>
              <p className="font-semibold">{registration.team_leader_name}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Team Size</p>
              <p className="font-semibold">{registration.team_size} members</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Total Fee</p>
              <p className="font-semibold text-primary text-xl">PKR {registration.total_fee?.toLocaleString()}</p>
            </div>
          </div>

          {registration.modules_selected && (
            <div className="mb-6">
              <h3 className="font-bold mb-2">Selected Modules</h3>
              <div className="space-y-2">
                {registration.modules_selected.general?.length > 0 && (
                  <div>
                    <p className="text-sm text-foreground/60">General Modules:</p>
                    <p className="font-semibold">{registration.modules_selected.general.join(", ")}</p>
                  </div>
                )}
                {registration.modules_selected.stem?.length > 0 && (
                  <div>
                    <p className="text-sm text-foreground/60">STEM Modules:</p>
                    <p className="font-semibold">{registration.modules_selected.stem.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!registration.payment_verified && (
            <div className="border-t border-primary/20 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Upload Payment Proof</h3>
                  <p className="text-sm text-foreground/60">
                    Upload your payment receipt to complete registration
                  </p>
                </div>
                {registration.payment_proof_url ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <Upload className="w-8 h-8 text-primary" />
                )}
              </div>

              {registration.payment_proof_url && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    <p className="text-sm text-green-500">Payment proof uploaded - awaiting verification</p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="payment-proof">Upload Receipt</Label>
                <Input
                  id="payment-proof"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  disabled={uploading || !!registration.payment_proof_url}
                />
                {uploading && <p className="text-sm text-foreground/60 mt-2">Uploading...</p>}
              </div>
            </div>
          )}

          {registration.payment_verified && (
            <div className="border-t border-primary/20 pt-6">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <p className="font-semibold text-green-500">Payment Verified - Registration Complete!</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
