import React from "react";

function Footer({ setPage }) {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>PRMD 2.0 frontend skeleton in JSX structure.</div>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setPage("Help")} className="hover:text-slate-800">Help</button>
          <button onClick={() => setPage("Contact")} className="hover:text-slate-800">Contact</button>
          <button onClick={() => setPage("Links")} className="hover:text-slate-800">Links</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
