import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navber = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("email");
    if (storedToken) {
      setEmail(storedToken);
    }
  }, []);
  console.log(email);

  useEffect(() => {
    axios
      .get(`https://ph-task-lake.vercel.app/userInfo/${email || ""}`)
      .then((res) => {
        setUser(res.data);
        
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [email]);

  return (
    <div className="fixed z-40 lg:mt-5 opacity-100 bottom-0 left-0 right-0 bg-pink-700 text-white p-4 flex justify-around">
      <div className="flex flex-col items-center">
        <NavLink to="/" className="text-sm flex flex-col items-center">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12 6 6 0 010-12z"
              clipRule="evenodd"
            />
            <path d="M10 6a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          হোম
        </NavLink>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-sm flex flex-col items-center">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011-1h10a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V2zm9 1H7v2h6V3zm-7 4h8v10H6V7z"
              clipRule="evenodd"
            />
          </svg>
          QR স্ক্যান
        </div>
      </div>

      {user?.role && (
        <NavLink to="/TransactionList" className="flex flex-col items-center">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12 6 6 0 010-12z"
              clipRule="evenodd"
            />
            <path d="M12 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div className="text-sm">
            {user.role === "user"
              ? "লেনদেনের ইতিহাস"
              : "Transaction Management"}
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default Navber;
