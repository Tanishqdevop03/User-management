import React from 'react'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Signup = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        formData
      );

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center bg-[#f5f7fb] px-6">
        <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm mb-8">Sign up to get started</p>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-indigo-600 font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:flex bg-linear-to-br from-indigo-500 to-purple-600 justify-center items-center flex-col gap-4 text-white">
        <h2 className="text-5xl font-bold">Mybillbook</h2>
        <p className="text-indigo-100 text-lg">Manage your business with ease</p>
      </div>
    </div>
  )
}

export default Signup