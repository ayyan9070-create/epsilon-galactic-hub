import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, ExternalLink } from "lucide-react";

export function BrandAmbassadorsTable() {
  const [ambassadors, setAmbassadors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  const fetchAmbassadors = async () => {
    try {
      const { data, error } = await supabase
        .from("brand_ambassador_applications")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setAmbassadors(data || []);
    } catch (error) {
      console.error("Error fetching ambassadors:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
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
      fetchAmbassadors();
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
            <TableHead className="text-purple-200">Phone</TableHead>
            <TableHead className="text-purple-200">School</TableHead>
            <TableHead className="text-purple-200">CNIC</TableHead>
            <TableHead className="text-purple-200">Photo</TableHead>
            <TableHead className="text-purple-200">Date</TableHead>
            <TableHead className="text-purple-200 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ambassadors.map((ambassador) => (
            <TableRow key={ambassador.id} className="border-purple-500/30 hover:bg-slate-700/50">
              <TableCell className="text-white">{ambassador.name}</TableCell>
              <TableCell className="text-white">{ambassador.email}</TableCell>
              <TableCell className="text-white">{ambassador.phone}</TableCell>
              <TableCell className="text-white">{ambassador.school}</TableCell>
              <TableCell className="text-white">{ambassador.cnic}</TableCell>
              <TableCell>
                {ambassador.photo_url ? (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => window.open(ambassador.photo_url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                ) : (
                  <span className="text-gray-400">No photo</span>
                )}
              </TableCell>
              <TableCell className="text-white">
                {new Date(ambassador.submitted_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" onClick={() => handleDelete(ambassador.id)}>
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
