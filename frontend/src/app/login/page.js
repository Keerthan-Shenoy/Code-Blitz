'use client';
import { useState } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-yellow-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
