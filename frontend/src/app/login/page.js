// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Add your login logic here
//     console.log('Login attempt:', formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Add your login logic here
//     console.log('Login attempt:', formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md flex w-full max-w-4xl">
//         <div className="w-1/2">
//           <Image
//             src="https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-120316.jpg?t=st=1739021842~exp=1739025442~hmac=8ef2c5ec0488d886eb8033ae4defad524f77798064e4f513a0153d643ffa91d8&w=900"
//             alt="Login Image"
//             width={800}
//             height={600}
//             className="object-cover h-full w-full rounded-l-lg"
//           />
//         </div>
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link href="/register" className="text-blue-600 hover:underline">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image';

// export default function LoginPage() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-100 relative">
//       {/* Left Character */}
//       <div className="absolute left-10 bottom-10 hidden md:block">
//         <Image src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="Left Character" width={150} height={150} />
//       </div>

//       {/* Login Card */}
//       <div className="relative bg-white p-10 rounded-xl shadow-lg w-[400px] text-center">
//         {/* Profile Image on Top */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
//           <Image src="https://img.freepik.com/free-icon/user_318-563642.jpg" alt="Profile" width={80} height={80} className="rounded-full border-4 border-white shadow-md" />
//         </div>

//         <h2 className="text-2xl font-bold text-gray-700 mt-10">LOGIN</h2>

//         {/* Form Inputs */}
//         <div className="mt-6 text-left">
//           <label className="block text-gray-600 mb-1">Username</label>
//           <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your username" />
//         </div>

//         <div className="mt-4 text-left">
//           <label className="block text-gray-600 mb-1">Password</label>
//           <input type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
//         </div>

//         {/* Login Button */}
//         <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 transition">Login</button>
//       </div>

//       {/* Right Character */}
//       <div className="absolute right-10 bottom-10 hidden md:block">
//         <Image src="https://img.freepik.com/free-vector/young-woman-avatar-character_24877-17807.jpg" alt="Right Character" width={150} height={150} />
//       </div>
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-wrap justify-center items-center w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Section - Image */}
          <div className="hidden md:block md:w-1/2">
            <Image 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
              alt="Login Illustration" 
              width={500} 
              height={500} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right Section - Login Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center text-gray-700">Sign in</h2>
            
            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
            
            <div className="flex items-center my-6">
              {/* <div className="flex-1 h-px bg-gray-300"></div>
              <p className="mx-3 text-gray-500">Or</p>
              <div className="flex-1 h-px bg-gray-300"></div> */}
            </div>
            
            {/* Login Form */}
            <form>
              <div className="mb-4">
                <label className="block text-gray-600">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center text-gray-600">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <Link href="#" className="text-blue-500 hover:underline">Forgot password?</Link>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
              <p className="text-center text-gray-600 mt-4">
                Don't have an account? <Link href="#" className="text-blue-500 hover:underline">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center py-4 px-6 bg-blue-600 text-white text-center md:text-left">
        <p>Copyright © 2024. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="#"><i className="fab fa-facebook-f"></i></Link>
          <Link href="#"><i className="fab fa-twitter"></i></Link>
          <Link href="#"><i className="fab fa-google"></i></Link>
          <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
        </div>
      </footer>
    </div>
  );
}