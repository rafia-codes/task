import React, { useEffect, useState } from "react";

const rewards = [
  { amount: 1000, label: "🎁 Free T-shirt" },
  { amount: 2000, label: "🥇 Certificate" },
  { amount: 3000, label: "🚀 Bonus task unlock" },
];

const Dashboard = () => {
  const referralCode = "rafia2025";
  const referralLink = `https://yourapp.com/referral/${referralCode}`;
  const message = `
Hey! Use my referral code *${referralCode}* to join the intern portal and unlock rewards!
Sign up here: ${referralLink}
Thanks! 😊
`;
  const shareText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  const [donations, setDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/donations")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setDonations(data.donations);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const progressPercent = Math.min((donations / 3000) * 100, 100);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralCode).then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      });
    } else {
      // Fallback for unsupported browsers:
      alert("Clipboard not supported, please copy manually.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading donations...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md font-sans">
      <h1 className="text-2xl font-bold mb-4">Intern Dashboard</h1>
      <p className="mb-2">
        <strong>Name:</strong> Rafia Perween
      </p>

      {/* Referral Code + Copy & Share */}
      <div className="mb-4 flex items-center space-x-3">
        <span>
          <strong>Referral Code:</strong>{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">{referralCode}</code>
        </span>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white px-3 py-1 rounded"
        >
          Copy
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Share 
        </a>
        {copySuccess && <span className="text-green-600 ml-2">{copySuccess}</span>}
      </div>

      <p className="mb-4">
        <strong>Total Donations:</strong> ₹{donations}
      </p>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-600 h-6 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Progress: {Math.floor(progressPercent)}% towards ₹3000
        </p>
      </div>

      {/* Rewards */}
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Rewards / Unlockables</h3>
        <ul className="list-disc pl-5 space-y-1">
          {rewards.map(({ amount, label }) => (
            <li
              key={amount}
              className={donations >= amount ? "text-green-600 font-semibold" : "text-gray-400"}
            >
              {label} {donations >= amount ? "✅" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
