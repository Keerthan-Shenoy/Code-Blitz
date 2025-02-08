"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "../components/profile_sidebar";

export default function SkillRequestsPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedUserSkill, setSelectedUserSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  
  const userSkills = ["Web Development", "Graphic Design", "Photography"];
  const allSkills = ["Python", "JavaScript", "UI/UX Design", "Video Editing"];

  const pendingSentRequests = [
    { provider: "Alice", skill: "UI/UX Design" },
    { provider: "Bob", skill: "Python" },
  ];

  const pendingReceivedRequests = [
    { provider: "Charlie", skill: "Video Editing" },
    { provider: "David", skill: "JavaScript" },
  ];

  const handleSubmit = () => {
    if (selectedUserSkill && selectedSkill) {
      alert("Request sent");
      setShowForm(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <ProfileSidebar />
      <div className="flex-1 p-6 flex flex-col ml-[300px]">
        <div className="w-full flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold">SKILLEX</h1>
          <button onClick={() => router.push("/profile")} className="w-10 h-10 bg-gray-300 rounded-full" />
        </div>
        
        <div className="mt-10 flex justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowForm(true)}>Create a New Request</button>
        </div>
        
        {showForm && (
          <div className="mt-4 p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">New Skill Request</h2>
            <div className="mb-2">
              <label className="block mb-1">Select Your Skill</label>
              <select className="w-full p-2 border rounded" onChange={(e) => setSelectedUserSkill(e.target.value)}>
                <option value="">-- Select --</option>
                {userSkills.map((skill, idx) => (
                  <option key={idx} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Select Skill You Need</label>
              <select className="w-full p-2 border rounded" onChange={(e) => setSelectedSkill(e.target.value)}>
                <option value="">-- Select --</option>
                {allSkills.map((skill, idx) => (
                  <option key={idx} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSubmit}>Submit Request</button>
          </div>
        )}
        
        <div className="mt-10 w-full flex justify-center gap-6">
          <div className="w-full max-w-md p-4 bg-white shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Pending Sent Requests</h2>
            {pendingSentRequests.map((req, idx) => (
              <div key={idx} className="p-2 border-b">{req.provider} - {req.skill}</div>
            ))}
          </div>
          <div className="w-full max-w-md p-4 bg-white shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Pending Received Requests</h2>
            {pendingReceivedRequests.map((req, idx) => (
              <div key={idx} className="p-2 border-b">{req.provider} - {req.skill}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}