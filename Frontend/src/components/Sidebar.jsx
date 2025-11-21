// Sidebar.jsx
import React, { useState } from "react";

export default function Sidebar({
  dbActive = false,
  insActive = false,
  compActive = false,
  onComparisonResult, // optional callback: (data) => void
}) {
  const [loading, setLoading] = useState(false);

  // Use env var if available, fallback to 127.0.0.1:5000
  const API_BASE ="http://127.0.0.1:5000";

  async function handleComparisonClick() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/sample11`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ message: "run comparison" }),
        // credentials: "include" // enable if you use cookie-based sessions
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Comparison result:", data);
      if (typeof onComparisonResult === "function") onComparisonResult(data);
      // lightweight user feedback:
      alert("Comparison finished — check console for details.");
    } catch (err) {
      console.error("Comparison error:", err);
      alert("Failed to run comparison: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0d1320] text-[#9db6cb] h-screen w-[20vw] px-5 py-5">
      <div className="font-poppins text-center text-[35px] px-3 py-1 font-bold border-[#242f43] rounded-[5px]">
        VishnuDTA
      </div>

      <div className="my-8 p-0">
        <div
          className={`${dbActive ? "bg-[#153246] text-[#d0efff]" : ""} hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] rounded-[5px] my-3 px-4 py-4`}
        >
          Dashboard
        </div>

        <div
          className={`${insActive ? "bg-[#153246] text-[#d0efff]" : ""} hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] rounded-[5px] my-3 px-4 py-4`}
        >
          Insights
        </div>

        <div
          className={`${compActive ? "bg-[#153246] text-[#d0efff]" : ""} hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] rounded-[5px] my-3 px-4 py-4 flex justify-between items-center`}
        >
          <span>Comparison Charts</span>

          <button
            onClick={handleComparisonClick}
            disabled={loading}
            className="ml-4 rounded px-3 py-1 border bg-[#1c4463] hover:bg-[#255b82] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Run comparison (calls Flask backend)"
          >
            {loading ? "Running..." : "Run"}
          </button>
        </div>
      </div>
    </div>
  );
}
