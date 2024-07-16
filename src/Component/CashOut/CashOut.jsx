import React, { useState } from "react";

const CashOut = () => {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(1000); // Example balance, you can set it dynamically
  const [agentBalance, setAgentBalance] = useState(500); // Example agent balance

  const handleSubmit = (e) => {
    e.preventDefault();

    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError("Transaction amount must be a positive number.");
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

    if (!agentNumber) {
      setError("Agent number is required.");
      return;
    }

    // Calculate the fee (1.5% of the transaction amount)
    const fee = amountNumber * 0.015;
    const totalDeduction = amountNumber + fee;

    if (totalDeduction > balance) {
      setError("Insufficient balance to cover the transaction and fee.");
      return;
    }

    // Deduct the amount and fee from user's balance and add to agent's balance
    setBalance(balance - totalDeduction);
    setAgentBalance(agentBalance + totalDeduction);

    // Here you would include the logic for cashing out
    // Including JWT and pin verification

    console.log("Cashing Out", {
      amount: amountNumber,
      pin,
      fee,
      totalDeduction,
      agentNumber,
    });

    setError("");
    alert(
      `Cash Out Successful! Amount: ৳${amountNumber}, Fee: ৳${fee.toFixed(
        2
      )}, Total Deducted: ৳${totalDeduction.toFixed(2)}`
    );
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-pink-200">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg relative">
        <div className="text-center text-xl font-semibold mb-4 text-pink-500">
          ক্যাশ আউট
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={agentNumber}
              onChange={(e) => setAgentNumber(e.target.value)}
              placeholder="Agent Number"
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
              ক্যাশ আউট
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-600 text-sm">
          আপনার টাকা ক্যাশ আউট করতে, এজেন্টের মাধ্যমে ট্রানজেকশন করুন।
          <br />
          আপনার ব্যালেন্স থেকে ফি কাটার পর এজেন্টের ব্যালেন্সে যোগ হবে।
        </div>
      </div>
    </div>
  );
};

export default CashOut;