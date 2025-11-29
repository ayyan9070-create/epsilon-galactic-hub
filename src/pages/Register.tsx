import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Register() {

  const [teamID, setTeamID] = useState("");
  const [teamName, setTeamName] = useState("");

  const [leader, setLeader] = useState({
    name: "",
    email: "",
    contact: "",
    institute: "",
  });

  const [members, setMembers] = useState([
    { name: "", email: "", contact: "", institute: "" },
    { name: "", email: "", contact: "", institute: "" },
    { name: "", email: "", contact: "", institute: "" },
    { name: "", email: "", contact: "", institute: "" },
  ]);

  const [generalModules, setGeneralModules] = useState<string[]>([]);
  const [stemModules, setStemModules] = useState<string[]>([]);
  const [baList, setBaList] = useState<string[]>([]);
  const [selectedBA, setSelectedBA] = useState("");

  // Generate 6-digit team ID
  useEffect(() => {
    setTeamID(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

  useEffect(() => {
    async function fetchBAs() {
      const { data } = await supabase
        .from("brand_ambassadors")
        .select("name")
        .eq("status", "approved");

      setBaList(data?.map(b => b.name) || []);
    }
    fetchBAs();
  }, []);

  function addMember() {
    if (members.length < 7)
      setMembers([...members, { name: "", email: "", contact: "", institute: "" }]);
  }

  function removeMember() {
    if (members.length > 4)
      setMembers(members.slice(0, members.length - 1));
  }

  async function handleSubmit() {
    if (generalModules.length > 3)
      return alert("General modules cannot exceed 3.");

    if (stemModules.length > 5)
      return alert("STEM modules cannot exceed 5.");

    if (generalModules.length + stemModules.length > 6)
      return alert("Total selected modules cannot exceed 6.");

    const { error: teamErr } = await supabase.from("teams").insert({
      team_id: teamID,
      team_name: teamName,
      leader_name: leader.name,
      leader_email: leader.email,
      leader_contact: leader.contact,
      leader_institute: leader.institute,
      modules_general: generalModules,
      modules_stem: stemModules,
      brand_ambassador: selectedBA,
      status: "pending"
    });

    if (teamErr) return alert(teamErr.message);

    const insertMembers = members.map(m => ({
      team_id: teamID,
      ...m
    }));

    const { error: memErr } = await supabase.from("team_members").insert(insertMembers);
    if (memErr) return alert(memErr.message);

    alert("Registration successful! Your Team ID is " + teamID);
  }

  return (
    <div>
      <h1>Team Registration</h1>

      <p>Team ID: {teamID}</p>

      <input placeholder="Team Name" onChange={e => setTeamName(e.target.value)} />

      <h2>Team Leader</h2>
      <input placeholder="Name" onChange={e => setLeader({ ...leader, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setLeader({ ...leader, email: e.target.value })} />
      <input placeholder="Contact" onChange={e => setLeader({ ...leader, contact: e.target.value })} />
      <input placeholder="Institute" onChange={e => setLeader({ ...leader, institute: e.target.value })} />

      <h2>Team Members (4–7)</h2>

      {members.map((m, i) => (
        <div key={i}>
          <input placeholder="Name" onChange={e => {
            const cp = [...members];
            cp[i].name = e.target.value;
            setMembers(cp);
          }} />
          <input placeholder="Email" onChange={e => {
            const cp = [...members];
            cp[i].email = e.target.value;
            setMembers(cp);
          }} />
          <input placeholder="Contact" onChange={e => {
            const cp = [...members];
            cp[i].contact = e.target.value;
            setMembers(cp);
          }} />
          <input placeholder="Institute" onChange={e => {
            const cp = [...members];
            cp[i].institute = e.target.value;
            setMembers(cp);
          }} />
        </div>
      ))}

      <button onClick={addMember}>Add Member</button>
      <button onClick={removeMember}>Remove Member</button>

      <h2>Brand Ambassador</h2>
      <select onChange={e => setSelectedBA(e.target.value)}>
        <option value="">Select BA</option>
        {baList.map(b => <option key={b}>{b}</option>)}
      </select>

      <button onClick={handleSubmit}>Submit Registration</button>
    </div>
  );
}
