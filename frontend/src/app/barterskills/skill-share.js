"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CommunityPath } from '../../../constant';
import { SkillPath } from "../../../constant";
export default function SkillShare() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedUserSkill, setSelectedUserSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [userCommunities, setUserCommunities] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null);
  
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

  const handleSubmit = async () => {
    if (selectedUserSkill && selectedSkill) {
      console.log(selectedSkill)
      console.log(selectedUserSkill)
      const userResponse = await fetch(`${SkillPath}/addSkillshare`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            req_com_id: selectedSkill,
            to_com_id: selectedUserSkill
          }
        }
      );
      setShowForm(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const storedUserData = localStorage.getItem('user_data');

        if (storedUserData) {
          const userID = JSON.parse(storedUserData);
          setUserID(userID._id);
          const userResponse = await fetch(
            `${CommunityPath}/user-communities?user_id=${userID._id}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            }
          );
          const userData = await userResponse.json();

          setUserCommunities(userData.communities);
        }

        const allResponse = await fetch(
          `${CommunityPath}/all-communities`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const allData = await allResponse.json();
        console.log(allData);
        setAllCommunities(allData.communities);

      } catch (err) {
        console.error('Error fetching communities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 px-6 flex flex-col ml-[100px]">
        <div className="flex justify-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" 
            onClick={() => setShowForm(true)}
          >
            Create a New Request
          </button>
        </div>
        
        {showForm && (
          <div className="mt-4 p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">New Skill Request</h2>
            <div className="flex">
              <div className="mb-2 w-1/2 pr-1">
                <label className="block mb-1">Select Your Skill</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={selectedUserSkill}
                  onChange={(e) => setSelectedUserSkill(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {userCommunities.map((skill) => (
                    <option key={skill._id} value={skill._id}>{skill.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2 w-1/2 pl-1">
                <label className="block mb-1">Select Skill You Need</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {allCommunities.map((skill) => (
                    skill.host_id._id !== userID &&
                    <option key={skill._id} value={skill._id}>{skill.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button 
                className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" 
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-10 w-[800px] flex justify-center gap-6">
          <div className="w-full p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Pending Sent Requests</h2>
            {pendingSentRequests.map((req, idx) => (
              <div className="flex items-center m-3">
                <div className="px-2">
                  <div className="font-bold">
                    {req.skill}
                  </div>
                  <div className="text-sm text-gray-600">
                    {req.provider}
                  </div>
                </div>
                <div className='justify-end'>
                  Pending
                </div>
              </div>
            
            ))}
          </div>
          <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Pending Received Requests</h2>
            {pendingReceivedRequests.map((req, idx) => (
              <div className="flex items-center m-3">
                <div className="px-2">
                  <div className="font-bold">
                    {req.skill}
                  </div>
                  <div className="text-sm text-gray-600">
                    {req.provider}
                  </div>
                </div>
                <div>
                  <button className="bg-blue-500 text-white-900 px-3 p-2 mx-3 rounded">Accept</button>
                  <button className="bg-blue-500 text-white-900 px-3 p-2 rounded">Deny</button>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}