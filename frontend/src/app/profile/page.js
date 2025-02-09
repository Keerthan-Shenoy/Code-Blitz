"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileSidebar from "../components/profile_sidebar";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    firstName: "Virat",
    lastName: "Kohli",
    dob: "1988-11-05",
    email: "viratkohli@gmail.com",
    country: "India",
    gender: "Male",
    skilltons: 1200,
    skillexCredits: 500,
    rank: "Expert",
    acquiredSkills: [
      { name: "Data Science", provider: "John Doe" },
      { name: "Graphic Design", provider: "Jane Smith" },
    ],
    providedSkills: [
      { name: "Photography", provider: "Alice Brown" },
      { name: "Baking", provider: "Gordon Ramsay" },
    ],
    learningSkills: [
      { name: "Coding", provider: "Mark Zuckerberg" },
      { name: "Public Speaking", provider: "Tony Robbins" },
    ],
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-100 to-yellow-100 p-10">
      <ProfileSidebar />
      <div className="flex-1 px-10 py-10 ml-[300px] bg-white shadow-lg rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6 ">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!isEditing ? (
          /* Display Profile Information */
          <div>
            <div className="flex items-center gap-x-6 mb-6">
              <Image src="https://i.pravatar.cc/?img=3" alt="Profile" width={80} height={80} className="rounded-full" unoptimized />
              <div>
                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-gray-900">
              <p><strong>Country:</strong> {user.country}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <div className="col-span-2 inline-block rounded-lg bg-green-100 p-2 w-auto">
                <p><strong>Skilltons :</strong> {user.skilltons}</p>
              </div>
              <div className="col-span-2 inline-block rounded-lg bg-green-100 p-2 w-auto">
                <p><strong>Skillex Credits :</strong> {user.skillexCredits}</p>
              </div>
              <div className="col-span-2 inline-block rounded-lg bg-green-100 p-2 w-26">
                <p><strong>Rank :</strong> {user.rank}</p>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Profile Form */
          <form>
            <div className="grid grid-cols-2 gap-6">
              <input className="border p-2 rounded" defaultValue={user.firstName} placeholder="First Name" />
              <input className="border p-2 rounded" defaultValue={user.lastName} placeholder="Last Name" />
              <input className="border p-2 rounded" defaultValue={user.email} placeholder="Email" />
              <input className="border p-2 rounded" defaultValue={user.country} placeholder="Country" />
              <input className="border p-2 rounded" type="date" defaultValue={user.dob} />
              <select className="border p-2 rounded" defaultValue={user.gender}>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
            </div>
          </form>
        )}

        {/* Skill Sections */}
        {['acquiredSkills', 'providedSkills', 'learningSkills'].map((type) => (
          <div key={type} className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {type === 'acquiredSkills' ? 'Acquired Skills' : type === 'providedSkills' ? 'Provided Skills' : 'Learning Skills'}
            </h2>
            <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide">
              {user[type].map((skill, i) => (
                <div key={i} className="w-60 p-4 bg-blue-100 shadow-md rounded-lg text-center text-gray-900">
                  <h3 className="font-bold">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
