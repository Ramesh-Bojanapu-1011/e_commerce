import React, { useState } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  // Login state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  // Register state
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerShowPassword, setRegisterShowPassword] = useState(false);

  // Handlers for login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.email === "admin@enkonix.in" &&
      loginForm.password === "admin123"
    ) {
      const adminUser = {
        email: loginForm.email,
        role: "admin",
        firstName: "Admin",
        lastName: "User",
      };
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      router.push("/admin-dashbord");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) =>
        u.email === loginForm.email && u.password === loginForm.password,
    );
    if (!user) {
      setLoginError("Invalid email or password.");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    router.push("/home1");
  };

  // Handlers for register
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registerForm.firstName ||
      !registerForm.lastName ||
      !registerForm.email ||
      !registerForm.password
    ) {
      setRegisterError("All fields are required.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u: any) => u.email === registerForm.email)) {
      setRegisterError("Email already registered.");
      return;
    }
    users.push({ ...registerForm, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    setRegisterSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      setMode("login");
      setRegisterSuccess("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-md animate-fade-in-up">
        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-yellow-200 dark:via-pink-400 dark:to-pink-600 mb-6 animate-gradient-x text-center">
              Login
            </h2>
            {loginError && (
              <div className="mb-4 text-red-500">{loginError}</div>
            )}
            <div className="mb-4">
              <input
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 mb-2"
              />
              <div className="relative">
                <input
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  type={loginShowPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 text-sm"
                  tabIndex={-1}
                  onClick={() => setLoginShowPassword((v) => !v)}
                >
                  {loginShowPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-pink-400/40 transition-all duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-yellow-200 dark:via-pink-400 dark:to-pink-600 mb-6 animate-gradient-x text-center">
              Register
            </h2>
            {registerError && (
              <div className="mb-4 text-red-500">{registerError}</div>
            )}
            {registerSuccess && (
              <div className="mb-4 text-green-500">{registerSuccess}</div>
            )}
            <div className="mb-4">
              <input
                name="firstName"
                value={registerForm.firstName}
                onChange={handleRegisterChange}
                placeholder="First Name"
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 mb-2"
              />
              <input
                name="lastName"
                value={registerForm.lastName}
                onChange={handleRegisterChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 mb-2"
              />
              <input
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 mb-2"
              />
              <div className="relative mb-2">
                <input
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="Password"
                  type={registerShowPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 text-sm"
                  tabIndex={-1}
                  onClick={() => setRegisterShowPassword((v) => !v)}
                >
                  {registerShowPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-pink-400/40 transition-all duration-300"
            >
              Register
            </button>
          </form>
        )}
        <div className="mt-6 text-center">
          {mode === "login" ? (
            <span className="text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <button
                className="text-blue-600 dark:text-yellow-200 hover:underline"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </span>
          ) : (
            <span className="text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <button
                className="text-blue-600 dark:text-yellow-200 hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
