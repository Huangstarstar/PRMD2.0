import React from "react";

function SectionHeader({ title, description }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      {description ? <p className="mt-2 text-slate-600">{description}</p> : null}
    </div>
  );
}

export default SectionHeader;
