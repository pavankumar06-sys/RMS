import { Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    // Basic validation
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
      }

      alert("Registration successful ✅");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-4">
            <Users size={28} />
          </div>
          <h1 className="text-2xl font-semibold">RecruiFlow</h1>
          <p className="text-gray-500 mt-1">
            Recruitment Process Management
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-gray-100"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hr@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-100"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-100"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-100"
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-lg bg-black text-white font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 hover:underline ml-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
