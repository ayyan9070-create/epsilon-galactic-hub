import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";
import { ContactsTable } from "@/components/admin/ContactsTable";
import { BrandAmbassadorApproval } from "@/components/admin/BrandAmbassadorApproval";
import { ApprovedBrandAmbassadors } from "@/components/admin/ApprovedBrandAmbassadors";
import { Download, LogOut } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke("export-excel");
      
      if (error) throw error;

      // Create a blob from the base64 data
      const byteCharacters = atob(data.file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "text/csv" });

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || `epsilon-vi-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-purple-200">Epsilon VI Event Management</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleExportExcel} 
              disabled={exporting}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {exporting ? "Exporting..." : "Export CSV"}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="text-white border-white">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="registrations" className="space-y-4">
          <TabsList className="bg-slate-800 border-purple-500">
            <TabsTrigger value="registrations" className="data-[state=active]:bg-purple-600">
              Registrations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-600">
              Contacts
            </TabsTrigger>
            <TabsTrigger value="ambassadors" className="data-[state=active]:bg-purple-600">
              BA Applications
            </TabsTrigger>
            <TabsTrigger value="approved-ambassadors" className="data-[state=active]:bg-purple-600">
              Brand Ambassadors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Event Registrations</CardTitle>
                <CardDescription className="text-purple-200">
                  Manage and approve team registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Contact Submissions</CardTitle>
                <CardDescription className="text-purple-200">
                  View all contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ambassadors">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Brand Ambassador Applications</CardTitle>
                <CardDescription className="text-purple-200">
                  Review and approve brand ambassador applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BrandAmbassadorApproval />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved-ambassadors">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Brand Ambassadors</CardTitle>
                <CardDescription className="text-purple-200">
                  List of approved brand ambassadors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApprovedBrandAmbassadors />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
