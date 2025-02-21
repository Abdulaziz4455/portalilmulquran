"use client";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@/app/common/auth-context";
import { toast } from "../../../components/ToastProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { stdAccessToken, setStdAccessToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (stdAccessToken) {
  //     router.push("/student/dashboard");
  //   }
  // }, [stdAccessToken, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async (data) => {
    // Validate the input data
    if (!data || !data.id || !data.userid) {
      console.error("Invalid data provided for update:", data);
      return;
    }

    try {
      const response = await axios.post("/api/student/oracle_data/update", {
        id: data.id,
        userid: data.userid,
      });
    } catch (error) {
      console.error(
        "Error updating data:",
        error.message,
        error.response?.data || error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/student/login", formData);
      if (response.status == 200) {
        setStdAccessToken(response.data.stdAccessToken);
        handleUpdate(response.data.student);
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/student/dashboard");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      toast.error(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <title>ilmulQuran Student Login</title>

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 max-w-md w-full ">
          {/* Logo Section */}
          <div className="flex justify-center mb-0">
            <Image
              src="/Images/Logo/updated-logo.webp"
              alt="ilmulQuran logo"
              width={200}
              height={80}
              className="rounded-full"
            />
          </div>
          <h2 className="text-3xl font-semibold text-teal-700 text-center mb-6">
            Student Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-teal-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-teal-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-teal-400"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-teal-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-teal-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-teal-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-teal-500 hover:text-teal-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg"
            >
              Login
            </button>
          </form>
          {/* Forgot Password Button */}
          <div className="mt-4 text-center">
            <Link
              className="text-teal-600 hover:text-teal-700 text-sm"
              href="/student/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
