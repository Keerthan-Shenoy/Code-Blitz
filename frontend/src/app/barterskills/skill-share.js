"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "../components/profile_sidebar";
import { CommunityPath } from '../../../constant';

export default function SkillShare() {
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

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(`${CommunityPath}/all-communities`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any auth headers if needed
            // 'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }

        const data = await response.json();
        setUserCommunities(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 px-6 flex flex-col ml-[100px]">
        
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowForm(true)}>Create a New Request</button>
        </div>
        
        {showForm && (
          <div className="mt-4 p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">New Skill Request</h2>
            <div className="flex">
                <div className="mb-2 w-1/2 pr-1">
                    <label className="block mb-1">Select Your Skill</label>
                    <select className="w-full p-2 border rounded" onChange={(e) => setSelectedUserSkill(e.target.value)}>
                        <option value="">-- Select --</option>
                        {userSkills.map((skill, idx) => (
                        <option key={idx} value={skill}>{skill}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2 w-1/2 pl-1">
                    <label className="block mb-1">Select Skill You Need</label>
                    <select className="w-full p-2 border rounded" onChange={(e) => setSelectedSkill(e.target.value)}>
                        <option value="">-- Select --</option>
                        {allSkills.map((skill, idx) => (
                        <option key={idx} value={skill}>{skill}</option>
                        ))}
                    </select>
                </div>
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