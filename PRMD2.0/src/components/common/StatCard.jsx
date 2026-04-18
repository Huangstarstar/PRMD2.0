import React from "react";

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <div className="text-3xl font-bold text-[#223e36]">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default StatCard;
