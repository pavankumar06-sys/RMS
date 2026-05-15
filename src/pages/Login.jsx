
// // import { Users } from "lucide-react";
// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Login({ setIsLoggedIn }) {
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       alert("Please enter email and password");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const response = await fetch(
// //         "http://localhost:8080/api/auth/login",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ email, password }),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Invalid email or password");
// //       }

// //       // // ✅ Login successful
// //       // localStorage.setItem("isLoggedIn", "true");
// //       // localStorage.setItem("userEmail", email);
      

// //       // setIsLoggedIn(true); // ✅ IMPORTANT
// //       // navigate("/dashboard");

// //       const text = await response.text();

// //       localStorage.setItem("isLoggedIn", "true");
// //       localStorage.setItem("userEmail", email);   // already known
// //       localStorage.setItem("userName", email.split("@")[0]); // fallback name

// //       setIsLoggedIn(true);
// //       navigate("/dashboard");
// //       console.log(text);
      

// //     } catch (error) {
// //       alert(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

// //         {/* Logo */}
// //         <div className="flex flex-col items-center mb-8">
// //           <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-4">
// //             <Users size={28} />
// //           </div>
// //           <h1 className="text-2xl font-semibold">RecruiFlow</h1>
// //           <p className="text-gray-500 mt-1">
// //             Recruitment Process Management
// //           </p>
// //         </div>

// //         {/* Login Form */}
// //         <div className="space-y-5">
// //           <input
// //             type="email"
// //             className="w-full px-4 py-3 bg-gray-100 rounded-lg"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />

// //           <input
// //             type="password"
// //             className="w-full px-4 py-3 bg-gray-100 rounded-lg"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />

// //           <button
// //             type="button" // ✅ prevents page reload
// //             onClick={handleLogin}
// //             disabled={loading}
// //             className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-60"
// //           >
// //             {loading ? "Signing In..." : "Sign In"}
// //           </button>
// //         </div>

// //         {/* Footer */}
// //         <p className="text-center text-sm text-gray-500 mt-6">
// //           Don&apos;t have an account?
// //           <Link to="/register" className="text-blue-600 ml-1">
// //             Register
// //           </Link>
// //         </p>

// //       </div>
// //     </div>
// //   );
// // }


// import { Users } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login({ setIsLoggedIn }) {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Invalid email or password");
//       }

//       const text = await response.text();

//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userName", email.split("@")[0]);

//       setIsLoggedIn(true);
//       navigate("/dashboard");
//       console.log(text);

//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Google OAuth
//   const handleGoogleLogin = () => {
//     window.location.href =
//       "http://localhost:8080/oauth2/authorization/google";
//   };

//   // ✅ Microsoft OAuth
//   const handleMicrosoftLogin = () => {
//     window.location.href =
//       "http://localhost:8080/oauth2/authorization/microsoft";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         {/* Logo */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-4">
//             <Users size={28} />
//           </div>
//           <h1 className="text-2xl font-semibold">RecruiFlow</h1>
//           <p className="text-gray-500 mt-1">
//             Recruitment Process Management
//           </p>
//         </div>

//         {/* Login Form */}
//         <div className="space-y-5">
//           <input
//             type="email"
//             className="w-full px-4 py-3 bg-gray-100 rounded-lg"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             className="w-full px-4 py-3 bg-gray-100 rounded-lg"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="button"
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-60"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </div>

//         {/* ✅ Social Login (ADDED ONLY) */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500 mb-3">Or login with</p>

//           <div className="flex gap-3 justify-center">
//             <button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white"
//             >
//              <img
//           src="https://www.svgrepo.com/show/475656/google-color.svg"
//           alt="Google"
//           className="w-4 h-4"
//         />
//               Google
//             </button>

//             <button
//               type="button"
//               onClick={handleMicrosoftLogin}
//               className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white"
//             >
//               <img
//                 src="https://www.svgrepo.com/show/452062/microsoft.svg"
//                 alt="Microsoft"
//                 className="w-4 h-4"
//               />
//               Microsoft
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don&apos;t have an account?
//           <Link to="/register" className="text-blue-600 ml-1">
//             Register
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }

import { Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ✅ Firebase imports (ADDED)
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../api/firebase";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Existing Email/Password Login (UNCHANGED)
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", email.split("@")[0]);

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login (Firebase)
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem(
        "userName",
        result.user.displayName || "User"
      );

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch {
      alert("Google login failed");
    }
  };

  // ✅ Microsoft Login (Firebase)
  const handleMicrosoftLogin = async () => {
    try {
      const provider = new OAuthProvider("microsoft.com");
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem(
        "userName",
        result.user.displayName || "User"
      );

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch {
      alert("Microsoft login failed");
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

        {/* Login Form */}
        <div className="space-y-5">
          <input
            type="email"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        {/* Social Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">Or login with</p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-4 h-4"
              />
              Google
            </button>

            <button
              onClick={handleMicrosoftLogin}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white"
            >
              <img
                src="https://www.svgrepo.com/show/452062/microsoft.svg"
                className="w-4 h-4"
              />
              Microsoft
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-600 ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
