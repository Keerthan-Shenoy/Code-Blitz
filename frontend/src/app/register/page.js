'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserPaths } from '../../../constant';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    country: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    about: '',
    profile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Set file to 'profile' key in formData
      setFormData({ ...formData, profile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Prepare FormData to submit
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      // Append 'profile' file key as 'profile'
      if (key === 'profile') {
        formDataToSubmit.append('profile', formData[key]); // Use 'profile' as the key for the image
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }
  
    try {
      // Send POST request with FormData
      const response = await fetch(`${UserPaths}/register`, {
        method: 'POST',
        body: formDataToSubmit,
      });
  
      // Check if the response is successful
      if (response.ok) {
        alert('User registered successfully');
        // Redirect to the desired URL after successful registration
        window.location.href = 'http://localhost:3000';
      } else {
        const errorData = await response.json();
        alert(errorData?.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 overflow-auto">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Sign Up</h2>

          {/* Register Form */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="mb-4">
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email Address</label>
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
                <label className="block text-gray-600">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your country"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Write a few sentences about yourself"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="mb-4">
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600">Profile Image</label>
              <input
                type="file"
                name="profile"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" /> I agree to the terms and conditions
              </label>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Register</button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
