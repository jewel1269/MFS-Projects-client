import axios from "axios";
import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";


const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(1000);
  const [personalNumber, setPersonalNumber] = useState("");
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
      .get(`http://localhost:5000/userInfo/${email || ""}`)
      .then((res) => {
        setUser(res.data);
        setBalance(res.data.Balance)
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [email]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amountNumber < 50) {
      setError("Transaction amount must be at least 50 Taka.");
      return;
    }

    if (amountNumber > balance) {
      setError("Insufficient balance.");
      return;
    }

    if (!pin) {
      setError("Pin is required.");
      return;
    }

    try {
      const matchPin = await bcrypt.compare(pin, user?.password);
      if (!matchPin) {
        setError("Pin Invalid");
        return;
      }

      // Apply a fee of 5 Taka for transactions over 100 Taka
      const fee = amountNumber > 100 ? 5 : 0;
      const totalAmount = amountNumber + fee;

      
      // Sending data to the backend after successful transaction
      axios
        .post("http://localhost:5000/payment", {
          personalNumber,
          amount: amountNumber,
          fee,
          Method: "Send Money",
          totalAmount,
          userId: user._id,
          token: user?.token,
          name: user?.name,
          Date: new Date(),
          image: user?.imageUrl,

        })
        .then((response) => {
          console.log("Transaction data sent to backend:", response.data);
        })
        .catch((error) => {
          console.error("Error sending transaction data:", error);
        });

      alert(
        `Transaction Successful! Amount: ৳${amountNumber}, Fee: ৳${fee}, Total Deducted: ৳${totalAmount}`
      );

      setError("");
      setAmount("");
      setPin("");
      setPersonalNumber("");
    } catch (error) {
      console.error("Error comparing pin:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-200">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg relative">
        <div className="text-center text-xl font-semibold mb-4 text-pink-500">
          সেন্ড মানি
        </div>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div className="ml-4 text-lg">{user?.name}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="number"
              value={personalNumber}
              onChange={(e) => setPersonalNumber(e.target.value)}
              placeholder="Personal Number"
              className="w-full text-center text-lg border-2 p-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="৳0"
              className="w-full text-center text-4xl border-2 p-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter Pin"
              className="w-full text-center text-lg border-2 p-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <div className="text-gray-600 text-center mb-4">
            ব্যবহারযোগ্য ব্যালেন্স: ৳{balance}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-full text-lg"
            >
              মানি সেন্ড
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-600 text-sm">
          গ্রাহকের বিকাশ একাউন্ট নেই কিন্তু আপনি তার নাম্বারে সেন্ড মানি করতে
          পারবেন
          <br />
          আপনি এই{" "}
          <span className="text-pink-500 underline">নিয়ম ও শর্তাবলী</span> মেনে
          পরবর্তী ধাপে এগিয়ে যাবেন
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
