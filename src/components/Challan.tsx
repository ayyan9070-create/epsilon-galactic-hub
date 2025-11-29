import { useState, useEffect } from "react";
import { supabase } from ".../integrations/supabase/client.ts";

export default function Challan() {

  const [teamData, setTeamData] = useState<any>(null);
  const [proof, setProof] = useState<File | null>(null);

  useEffect(() => {
    async function load() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data } = await supabase
        .from("teams")
        .select("*")
        .eq("leader_email", user.user.email)
        .single();

      setTeamData(data);
    }
    load();
  }, []);

  async function uploadProof() {
    if (!proof) return alert("Upload a file first!");

    const path = `${teamData.team_id}-${proof.name}`;

    await supabase.storage.from("payments").upload(path, proof);

    await supabase.from("teams").update({
      payment_proof: path,
      status: "paid"
    }).eq("team_id", teamData.team_id);

    alert("Proof uploaded!");
  }

  if (!teamData) return <p>Loading...</p>;

  const teamSize = teamData.modules_general.length + teamData.modules_stem.length;
  const total = teamSize * 4000;

  return (
    <div>
      <h1>Challan</h1>
      <p>Team ID: {teamData.team_id}</p>
      <p>Total Fee: PKR {total}</p>

      <input type="file" onChange={e => setProof(e.target.files![0])} />
      <button onClick={uploadProof}>Upload Payment Proof</button>
    </div>
  );
}
