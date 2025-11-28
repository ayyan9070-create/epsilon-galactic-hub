import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2, Mail, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function RegistrationsTable() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({ 
          status: "approved", 
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getSession()).data.session?.user.id
        })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Registration approved");
      fetchRegistrations();
    } catch (error) {
      console.error("Error approving registration:", error);
      toast.error("Failed to approve registration");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({ 
          status: "rejected", 
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getSession()).data.session?.user.id
        })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Registration rejected");
      fetchRegistrations();
    } catch (error) {
      console.error("Error rejecting registration:", error);
      toast.error("Failed to reject registration");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Registration deleted");
      fetchRegistrations();
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast.error("Failed to delete registration");
    }
  };

  const handleSendEmail = async (registration: any) => {
    try {
      const { error } = await supabase.functions.invoke("send-confirmation-email", {
        body: { 
          email: registration.email,
          name: registration.team_leader_name,
          teamSize: registration.team_size,
          school: registration.school
        }
      });

      if (error) throw error;
      toast.success("Confirmation email sent");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send confirmation email");
    }
  };

  const openEditDialog = (registration: any) => {
    setEditForm(registration);
    setEditDialog(registration.id);
  };

  const handleEdit = async () => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({
          team_leader_name: editForm.team_leader_name,
          email: editForm.email,
          school: editForm.school,
          team_size: editForm.team_size
        })
        .eq("id", editDialog);

      if (error) throw error;
      
      toast.success("Registration updated");
      setEditDialog(null);
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating registration:", error);
      toast.error("Failed to update registration");
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <div className="rounded-md border border-purple-500/30">
        <Table>
          <TableHeader>
            <TableRow className="border-purple-500/30 hover:bg-slate-700/50">
              <TableHead className="text-purple-200">Team Leader</TableHead>
              <TableHead className="text-purple-200">Email</TableHead>
              <TableHead className="text-purple-200">School</TableHead>
              <TableHead className="text-purple-200">Team Size</TableHead>
              <TableHead className="text-purple-200">Status</TableHead>
              <TableHead className="text-purple-200">Date</TableHead>
              <TableHead className="text-purple-200 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg.id} className="border-purple-500/30 hover:bg-slate-700/50">
                <TableCell className="text-white">{reg.team_leader_name}</TableCell>
                <TableCell className="text-white">{reg.email}</TableCell>
                <TableCell className="text-white">{reg.school}</TableCell>
                <TableCell className="text-white">{reg.team_size}</TableCell>
                <TableCell>
                  <Badge variant={reg.status === "approved" ? "default" : reg.status === "rejected" ? "destructive" : "secondary"}>
                    {reg.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">
                  {new Date(reg.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => openEditDialog(reg)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleSendEmail(reg)}>
                      <Mail className="w-4 h-4" />
                    </Button>
                    {reg.status === "pending" && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => handleApprove(reg.id)}>
                          <Check className="w-4 h-4 text-green-500" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleReject(reg.id)}>
                          <X className="w-4 h-4 text-red-500" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(reg.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="bg-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Registration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Team Leader Name</Label>
              <Input
                value={editForm.team_leader_name || ""}
                onChange={(e) => setEditForm({ ...editForm, team_leader_name: e.target.value })}
                className="bg-slate-700"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editForm.email || ""}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="bg-slate-700"
              />
            </div>
            <div>
              <Label>School</Label>
              <Input
                value={editForm.school || ""}
                onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                className="bg-slate-700"
              />
            </div>
            <div>
              <Label>Team Size</Label>
              <Input
                type="number"
                value={editForm.team_size || ""}
                onChange={(e) => setEditForm({ ...editForm, team_size: parseInt(e.target.value) })}
                className="bg-slate-700"
              />
            </div>
            <Button onClick={handleEdit} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
