import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TransactionList = () => {
  const [historys, setHistorys] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/payHistory/${token}`)
        .then((res) => {
          setHistorys(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [token]);

  return (
    <div className="lg:mt-16">
      <div className="max-w-lg mx-auto min-h-screen mt-8">
        <Tabs>
          <TabList className="flex justify-between border-b pb-2 mb-4">
            <Tab
              className="flex-1 text-center border-b-2 cursor-pointer"
              selectedClassName="text-red-500 border-red-500"
            >
              লেনদেনের বিবরণী
            </Tab>
            <Tab
              className="flex-1 text-center cursor-pointer"
              selectedClassName="text-red-500 border-red-500"
            >
              লেনদেনের সার-সংক্ষেপ
            </Tab>
          </TabList>

          <TabPanel>
            <div className="flex justify-between mb-4">
              <button className="bg-green-500 text-white py-1 px-4 rounded">
                + ইন
              </button>
              <button className="bg-red-500 text-white py-1 px-4 rounded">
                - আউট
              </button>
            </div>

            {historys &&
              historys.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex justify-between items-center mb-4 p-4 border rounded shadow"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={transaction?.image}
                        className="h-8 w-8 rounded-xl"
                        alt="transaction"
                      />
                      <div className="text-gray-700 font-semibold">
                        {transaction.name}
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">
                      <span className="font-bold text-black">Trans ID</span>:{" "}
                      {transaction._id}
                    </div>
                    {transaction.ref && (
                      <div className="text-gray-500 text-sm">
                        Ref: {transaction.ref}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm ${
                        transaction.Balance < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      ৳{transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {transaction.Date}
                    </div>
                    <span>{transaction?.Method}</span>
                  </div>
                </div>
              ))}
          </TabPanel>

          <TabPanel>
            {/* Content for লেনদেনের সার-সংক্ষেপ */}
            <div className="flex justify-between mb-4">
              <button className="bg-green-500 text-white py-1 px-4 rounded">
                Summary +
              </button>
              <button className="bg-red-500 text-white py-1 px-4 rounded">
                Summary -
              </button>
            </div>
            <div>Summary content goes here...</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TransactionList;
