import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

export function ContactsTable() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Contact deleted");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
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
            <TableHead className="text-purple-200">Phone</TableHead>
            <TableHead className="text-purple-200">Subject</TableHead>
            <TableHead className="text-purple-200">Message</TableHead>
            <TableHead className="text-purple-200">Date</TableHead>
            <TableHead className="text-purple-200 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} className="border-purple-500/30 hover:bg-slate-700/50">
              <TableCell className="text-white">{contact.name}</TableCell>
              <TableCell className="text-white">{contact.phone}</TableCell>
              <TableCell className="text-white">{contact.subject}</TableCell>
              <TableCell className="text-white max-w-md truncate">{contact.message}</TableCell>
              <TableCell className="text-white">
                {new Date(contact.submitted_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" onClick={() => handleDelete(contact.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
