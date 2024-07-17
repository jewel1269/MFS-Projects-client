import axios from "axios";
import React, { useEffect, useState } from "react";


const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/alluser").then((res) => {
      setUsers(res.data);
    });
  }, []);
  console.log(users);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-full"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              className="px-4 py-4 flex items-center justify-between overflow-x-auto"
            >
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.imageUrl}
                  alt=""
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.RegiDate.slice(0, 10)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <span
                  className={`text-sm font-medium ${
                    user.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <svg
                    className={`inline-block w-2 h-2 mr-1 ${
                      user.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  {user.status}
                </span>
                <span className="text-sm text-gray-900 hover:text-red-500">
                  Block Account
                </span>
                <span className="text-sm text-gray-900 hover:text-green-500">
                  Active Account
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Contact
                </button>
                <button className="text-gray-500 hover:text-gray-700">⋮</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
