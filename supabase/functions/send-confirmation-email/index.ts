import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  name: string;
  teamSize: number;
  school: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, teamSize, school }: EmailRequest = await req.json();

    console.log("Sending confirmation email to:", email);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Epsilon VI <onboarding@resend.dev>",
        to: [email],
        subject: "Registration Confirmation - Epsilon VI",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
          <h1 style="text-align: center; margin-bottom: 30px;">EPSILON VI</h1>
          <h2 style="text-align: center; margin-bottom: 20px;">Registration Confirmed!</h2>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Team Leader:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>School:</strong> ${school}</p>
            <p style="margin: 10px 0;"><strong>Team Size:</strong> ${teamSize} members</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Event Details</h3>
            <p style="margin: 10px 0;"><strong>Dates:</strong> 16 | 17 | 18 January 2026</p>
            <p style="margin: 10px 0;"><strong>Theme:</strong> Beyond The Horizon</p>
          </div>
          
          <p style="text-align: center; margin-top: 30px;">
            We're excited to see you at Epsilon VI! Further details will be shared closer to the event.
          </p>
          
          <p style="text-align: center; margin-top: 20px; font-size: 12px; opacity: 0.8;">
            If you have any questions, please contact us through our website.
          </p>
        </div>
        `
      })
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.json();
      throw new Error(error.message || "Failed to send email");
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
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
