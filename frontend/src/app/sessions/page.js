'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileSidebar from '../components/profile_sidebar';

const UpcomingSessions = () => {
  const router = useRouter();
  const sessions = [
    { id: 1, name: 'React Basics', session: 'John Doe', startTime: '2025-07-02T10:00:00', endTime: '2025-07-02T11:00:00', link: '/sessions/react-basics' },
    { id: 2, name: 'Advanced CSS', session: 'Jane Smith', startTime: '2025-07-02T11:30:00', endTime: '2025-07-02T12:30:00', link: '/sessions/advanced-css' },
    { id: 3, name: 'JavaScript Mastery', session: 'Sam Wilson', startTime: '2025-07-02T13:00:00', endTime: '2025-07-02T14:00:00', link: '/sessions/javascript-mastery' },
    { id: 4, name: 'Python for Beginners', session: 'Alice Johnson', startTime: '2025-07-02T14:30:00', endTime: '2025-07-02T15:30:00', link: '/sessions/python-beginners' },
    { id: 5, name: 'Data Science with R', session: 'Bob Brown', startTime: '2025-07-02T16:00:00', endTime: '2025-07-02T17:00:00', link: '/sessions/data-science-r' },
    { id: 6, name: 'Machine Learning', session: 'Charlie Davis', startTime: '2025-07-02T17:30:00', endTime: '2025-07-02T18:30:00', link: '/sessions/machine-learning' },
  ];

  const handleJoinSession = (session) => {
    const now = new Date();
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime);
    if (now >= startTime && now <= endTime) {
      window.location.href = session.link;
    } else {
      alert('The session is not active now. Please join at the specified time.');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-yellow-100">
      <ProfileSidebar />
      <div className="flex-1 p-6 flex flex-col ml-[300px]">
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
          </header>
          <section className="flex flex-wrap -mx-4">
            {sessions.map((session) => (
              <div key={session.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{session.name}</h3>
                  <p className="text-gray-600">{session.session}</p>
                  <p className="text-gray-600">{new Date(session.startTime).toLocaleString('en-US')} - {new Date(session.endTime).toLocaleString('en-US')}</p>
                  <button
                    onClick={() => handleJoinSession(session)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-full mt-2 inline-block"
                  >
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default UpcomingSessions;