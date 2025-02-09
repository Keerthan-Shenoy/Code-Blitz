'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // To handle navigation
import { UserPaths } from '../../../constant';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter(); // Hook to handle navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email);
    console.log(formData.password);

    fetch(`${UserPaths}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // If response status is not in the 200 range, throw an error
          return response.json().then((error) => {
            throw new Error(error.error); // Assuming your backend sends { error: "message" }
          });
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Response Data: ", data);

        // Store user data in local storage
        localStorage.setItem('user_data', JSON.stringify(data.user));

        alert("Logged in Successfully");

        // Redirect to home page
        router.push('/');
      })
      .catch((error) => {
        console.log("Login Error: ", error.message);
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-yellow-100">
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
            <h2 className="text-2xl font-bold text-center text-gray-700">Log in</h2>
            
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
              
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 font-bold">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your email" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-bold">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your password" 
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center text-gray-600">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <Link href="#" className="text-blue-500 hover:underline">Forgot password?</Link>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
              <p className="text-center text-gray-600 mt-4">
                Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
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