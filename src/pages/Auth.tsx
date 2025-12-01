import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if admin
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        if (roleData) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is admin
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        if (roleData) {
          toast.success("Welcome back, Admin!");
          navigate("/admin");
        } else {
          await supabase.auth.signOut();
          toast.error("This account does not have admin privileges");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Account created! Please sign in.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800/80 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Epsilon VI Admin</CardTitle>
          <CardDescription className="text-center text-purple-200">
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="signin" className="data-[state=active]:bg-purple-600">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-white">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700 border-purple-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-white">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700 border-purple-500/30 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate("/forgot-password")}
                    className="text-purple-300 hover:text-purple-100 text-sm"
                  >
                    Forgot Password?
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700 border-purple-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-slate-700 border-purple-500/30 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
                <p className="text-xs text-purple-200 text-center">
                  Note: New accounts need admin role assigned by an existing admin
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/")}
              className="text-purple-300 hover:text-purple-100"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
