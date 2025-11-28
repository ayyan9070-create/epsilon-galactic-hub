import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch all data
    const [registrationsRes, contactsRes, ambassadorsRes] = await Promise.all([
      supabaseClient.from("registrations").select("*").order("created_at", { ascending: false }),
      supabaseClient.from("contacts").select("*").order("submitted_at", { ascending: false }),
      supabaseClient.from("brand_ambassador_applications").select("*").order("submitted_at", { ascending: false })
    ]);

    if (registrationsRes.error) throw registrationsRes.error;
    if (contactsRes.error) throw contactsRes.error;
    if (ambassadorsRes.error) throw ambassadorsRes.error;

    // Prepare data for Excel
    const registrationsData = registrationsRes.data.map(reg => ({
      "Team Leader": reg.team_leader_name,
      "Email": reg.email,
      "School": reg.school,
      "Team Size": reg.team_size,
      "Status": reg.status,
      "Registration Date": new Date(reg.created_at).toLocaleDateString(),
      "Reviewed Date": reg.reviewed_at ? new Date(reg.reviewed_at).toLocaleDateString() : "N/A"
    }));

    const contactsData = contactsRes.data.map(contact => ({
      "Name": contact.name,
      "Phone": contact.phone,
      "Subject": contact.subject,
      "Message": contact.message,
      "Submitted Date": new Date(contact.submitted_at).toLocaleDateString()
    }));

    const ambassadorsData = ambassadorsRes.data.map(amb => ({
      "Name": amb.name,
      "Email": amb.email,
      "Phone": amb.phone,
      "School": amb.school,
      "CNIC": amb.cnic,
      "Photo URL": amb.photo_url || "N/A",
      "Submitted Date": new Date(amb.submitted_at).toLocaleDateString()
    }));

    // Create CSV content for all three sheets
    const createCSV = (data: any[], title: string) => {
      if (data.length === 0) return `${title}\n\n`;
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(","));
      return `${title}\n${headers}\n${rows.join("\n")}\n\n`;
    };

    const csvContent = 
      createCSV(registrationsData, "REGISTRATIONS") +
      createCSV(contactsData, "CONTACTS") +
      createCSV(ambassadorsData, "BRAND AMBASSADORS");

    const base64 = btoa(csvContent);

    console.log("CSV file generated successfully");

    return new Response(
      JSON.stringify({ file: base64, filename: "epsilon-vi-data.csv" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error generating Excel:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
