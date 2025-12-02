import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function ApprovedBrandAmbassadors() {
  const [ambassadors, setAmbassadors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedAmbassadors();
  }, []);

  const fetchApprovedAmbassadors = async () => {
    try {
      const { data, error } = await supabase
        .from("brand_ambassador_applications")
        .select("*")
        .eq("status", "approved")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setAmbassadors(data || []);
    } catch (error) {
      console.error("Error fetching approved ambassadors:", error);
      toast.error("Failed to load brand ambassadors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (ambassadors.length === 0) {
    return <div className="text-white text-center py-8">No approved brand ambassadors yet.</div>;
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
            <TableHead className="text-purple-200">CNIC</TableHead>
            <TableHead className="text-purple-200">Photo</TableHead>
            <TableHead className="text-purple-200">Status</TableHead>
            <TableHead className="text-purple-200">Approved Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ambassadors.map((amb) => (
            <TableRow key={amb.id} className="border-purple-500/30 hover:bg-slate-700/50">
              <TableCell className="text-white">{amb.name}</TableCell>
              <TableCell className="text-white">{amb.email}</TableCell>
              <TableCell className="text-white">{amb.school}</TableCell>
              <TableCell className="text-white">{amb.phone}</TableCell>
              <TableCell className="text-white">{amb.cnic}</TableCell>
              <TableCell>
                {amb.photo_url ? (
                  <Button size="sm" variant="ghost" onClick={() => window.open(amb.photo_url, "_blank")}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                ) : (
                  <span className="text-gray-400">No photo</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="default">Approved</Badge>
              </TableCell>
              <TableCell className="text-white">
                {new Date(amb.submitted_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
