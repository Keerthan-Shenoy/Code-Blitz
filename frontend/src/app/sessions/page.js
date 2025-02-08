// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import ProfileSidebar from '../components/profile_sidebar';

// const UpcomingSessions = () => {
//   const sessions = [
//     { id: 1, session: 'John Doe', name: 'React Basics', profilePic: '/profile1.jpg' },
//     { id: 2, session: 'Jane Smith', name: 'Advanced CSS', profilePic: '/profile2.jpg' },
//     { id: 3, session: 'Sam Wilson', name: 'JavaScript Mastery', profilePic: '/profile3.jpg' },
// ];


//   return (
//     <div className="flex h-screen bg-gray-100">
//       <ProfileSidebar />
//       <div className="flex-1 p-6 flex flex-col ml-[300px]">
//       <main className="flex-1 p-6 bg-gradient-to-r from-blue-100 to-yellow-100">
//         <header className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
//           <button className="bg-green-500 text-white py-2 px-4 rounded-full">Profile</button>
//         </header>
//         <section className="space-y-6">
//           {sessions.map((session) => (
//             <div key={session.id} className="bg-white p-4 rounded-lg shadow flex items-center">
//               <Image
//                 src={session.profilePic}
//                 alt={`${session.name}'s Profile Picture`}
//                 width={50}
//                 height={50}
//                 className="rounded-full mr-4"
//               />
//               <div>
//                 <h3 className="text-lg font-bold">{session.name}</h3>
//                 <p className="text-gray-600">{session.session}</p>
//                 <button className="bg-blue-500 text-white py-1 px-3 rounded-full mt-2">Details</button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </main>
//     </div>
//     </div>
    
//   );
// };

// export default UpcomingSessions;


// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import ProfileSidebar from '../components/profile_sidebar';

// const UpcomingSessions = () => {
//   const sessions = [
//     { id: 1, name: 'React Basics', session: 'John Doe', profilePic: '/profile1.jpg', startTime: '10:00 AM', endTime: '11:00 AM', link: '/sessions/react-basics' },
//     { id: 2, name: 'Advanced CSS', session: 'Jane Smith', profilePic: '/profile2.jpg', startTime: '11:30 AM', endTime: '12:30 PM', link: '/sessions/advanced-css' },
//     { id: 3, name: 'JavaScript Mastery', session: 'Sam Wilson', profilePic: '/profile3.jpg', startTime: '1:00 PM', endTime: '2:00 PM', link: '/sessions/javascript-mastery' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <ProfileSidebar />
//       <div className="flex-1 p-6 flex flex-col ml-[300px]">
//         <main className="flex-1 p-6 bg-gradient-to-r from-blue-100 to-yellow-100">
//           <header className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
//             <button className="bg-green-500 text-white py-2 px-4 rounded-full">Profile</button>
//           </header>
//           <section className="space-y-6">
//             {sessions.map((session) => (
//               <div key={session.id} className="bg-white p-4 rounded-lg shadow flex items-center">
//                 <Image
//                   src={session.profilePic}
//                   alt={`${session.name}'s Profile Picture`}
//                   width={50}
//                   height={50}
//                   className="rounded-full mr-4"
//                 />
//                 <div>
//                   <h3 className="text-lg font-bold">{session.name}</h3>
//                   <p className="text-gray-600">{session.session}</p>
//                   <p className="text-gray-600">{session.startTime} - {session.endTime}</p>
//                   <a href={session.link} className="bg-blue-500 text-white py-1 px-3 rounded-full mt-2 inline-block">Join Session</a>
//                 </div>
//               </div>
//             ))}
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UpcomingSessions;

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
            <button
              onClick={() => router.push('/profile')}
              className="bg-white text-black py-2 px-4 rounded-full"
            >
              Profile
            </button>
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