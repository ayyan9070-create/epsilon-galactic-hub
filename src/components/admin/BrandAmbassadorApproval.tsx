import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2 } from "lucide-react";

export function BrandAmbassadorApproval() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("brand_ambassador_applications")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("brand_ambassador_applications")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Brand Ambassador approved");
      fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("brand_ambassador_applications")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Brand Ambassador rejected");
      fetchApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Failed to reject application");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const { error } = await supabase
        .from("brand_ambassador_applications")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Application deleted");
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="rounded-md border border-purple-500/30">
      <Table>
        <TableHeader>
          <TableRow className="border-purple-500/30 hover:bg-slate-700/50">
            <TableHead className="text-purple-200">Name</TableHead>
            <TableHead className="text-purple-200">Email</TableHead>
            <TableHead className="text-purple-200">School</TableHead>
            <TableHead className="text-purple-200">Phone</TableHead>
            <TableHead className="text-purple-200">Status</TableHead>
            <TableHead className="text-purple-200">Date</TableHead>
            <TableHead className="text-purple-200 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="border-purple-500/30 hover:bg-slate-700/50">
              <TableCell className="text-white">{app.name}</TableCell>
              <TableCell className="text-white">{app.email}</TableCell>
              <TableCell className="text-white">{app.school}</TableCell>
              <TableCell className="text-white">{app.phone}</TableCell>
              <TableCell>
                <Badge variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"}>
                  {app.status || "pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-white">
                {new Date(app.submitted_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {(!app.status || app.status === "pending") && (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => handleApprove(app.id)} title="Approve">
                        <Check className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleReject(app.id)} title="Reject">
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(app.id)} title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
