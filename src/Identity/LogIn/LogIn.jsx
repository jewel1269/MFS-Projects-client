import axios from "axios";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const logInfo = { email, password };
    console.log(logInfo);

     axios
       .post("http://localhost:5000/loginUser", logInfo)
       .then((res) => {
         const { token, user } = res.data;
         // Store the token and user data
         localStorage.setItem("token", token);
         localStorage.setItem("user", JSON.stringify(user));
         toast.success("Login Success");
         setTimeout(() => {
           navigate("/root"); 
         }, 3000);
       })
       .catch((err) => {
         console.log(err);
         setError("Login failed. Please check your credentials.");
         toast.error("Login failed");
       });
  };

  return (
    <div className="lg:p-44 lg:bg-pink-400 flex justify-center">
    <ToastContainer/>
      <div className="lg:w-[700px] border border-gray-800 flex flex-col items-center justify-center bg-pink-500 text-white">
        {/* Header */}
        <div className="flex justify-around items-center w-full px-4 py-2 bg-pink-700">
          <div className="flex items-center gap-2">
            <RiMenu2Fill />
            <div className="text-2xl font-bold">মেনু</div>
          </div>
          <img
            src="https://cdn.worldvectorlogo.com/logos/bkash.svg"
            alt="bKash Logo"
            className="h-12 bg-white rounded-xl"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center w-full px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">
            বিকাশ অ্যাকাউন্টে আপনাকে স্বাগতম
          </h1>
          <p className="text-center mb-4">লগইন কর</p>

          <form onSubmit={handleSubmit}>
            <div className="bg-white text-pink-500 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg" htmlFor="email">
                  মোবাইল নাম্বার/ইমেইল
                </label>
                <input
                  className="border border-pink-500 p-2 rounded"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="মোবাইল নাম্বার/ইমেইল"
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-2 font-bold text-lg" htmlFor="password">
                  পাসওয়ার্ড/পিন
                </label>
                <input
                  className="border border-pink-500 p-2 rounded"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder="******"
                />
              </div>
              <p className="text-red-500">{error}</p>
              <button
                type="submit"
                className="w-full hover:bg-pink-700 hover:translate-x-1 hover:touch-pinch-zoom bg-pink-500 text-white p-2 rounded font-bold"
              >
                লগইন করুন
              </button>
              <NavLink to={"register"}>
                <button className="w-full mt-3 bg-pink-500 hover:bg-pink-700 hover:translate-x-1 hover:touch-pinch-zoom text-white p-2 rounded font-bold">
                  অ্যাকাউন্ট তৈরি খুলুন ➡️
                </button>
              </NavLink>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="w-full py-4 bg-pink-700 text-center">
          <button className="text-white font-bold">
            প্রয়োজনে পার্শ্ব বিকাশ
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
