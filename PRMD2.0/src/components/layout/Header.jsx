import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

function Header({ page, setPage, globalSearch, setGlobalSearch, navigateToSearchResults, topNav, toolsMenu }) {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#223e36]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-6">
        <button onClick={() => setPage("Home")} className="shrink-0 text-left text-white">
          <div className="text-2xl font-bold tracking-wide">
            PRMD <span className="font-medium text-white/70">2.0</span>
          </div>
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {topNav.map((item) => {
            if (item === "Tools") {
              return (
                <div key={item} className="relative">
                  <button
                    onClick={() => setToolsOpen((v) => !v)}
                    className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      toolsMenu.includes(page) || page === "Tools"
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Tools <ChevronDown className="h-4 w-4" />
                  </button>
                  {toolsOpen && (
                    <div className="absolute left-0 top-12 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                      {toolsMenu.map((tool) => (
                        <button
                          key={tool}
                          onClick={() => {
                            setPage(tool);
                            setToolsOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          <span>{tool}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  page === item ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <GlobalSearch
          value={globalSearch}
          onChange={setGlobalSearch}
          onSubmit={() => navigateToSearchResults(globalSearch)}
        />
      </div>
    </header>
  );
}

export default Header;
