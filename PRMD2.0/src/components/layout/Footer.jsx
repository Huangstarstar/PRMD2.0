import React from "react";

function Footer({ setPage }) {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>© 2024 PRMD 2.0 - Plant RNA Modification Database</div>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setPage("Help")} className="hover:text-slate-800 transition-colors">Help</button>
          <button onClick={() => setPage("Contact")} className="hover:text-slate-800 transition-colors">Contact</button>
          <button onClick={() => setPage("Links")} className="hover:text-slate-800 transition-colors">Links</button>
          <button onClick={() => setPage("Download")} className="hover:text-slate-800 transition-colors">Download</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
