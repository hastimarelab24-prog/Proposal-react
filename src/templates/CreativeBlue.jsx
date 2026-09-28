import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function CreativeBlue({ children, pageNumber = 1, totalPages = 1 }) {
  return (
    <div
      className="proposal-a4-page relative mx-auto h-[1123px] w-[794px] overflow-hidden bg-white text-slate-800 shadow-2xl"
      data-pdf-page="true"
    >
      {/* LIGHT DECORATION */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-50" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-sky-50" />

      {/* PAGE */}
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {/* HEADER */}
        <header className="flex h-[85px] shrink-0 items-center justify-between border-b border-slate-200 px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-blue-700">
              Proposal Studio
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Creative Business Proposal
            </p>
          </div>

          <ProposalLogo className="h-20 w-24 object-contain" />
        </header>

        {/* CONTENT */}
        <main className="min-h-0 flex-1 overflow-hidden px-10 py-8">
          <div className="h-full min-h-0 overflow-hidden border-l-2 border-blue-100 pl-6">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="flex h-[55px] shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-10">
          <ProposalLogo className="h-15 w-20 object-contain" />

          <span className="text-xs font-medium text-slate-500">
            Page {pageNumber} of {totalPages}
          </span>
        </footer>
      </div>
    </div>
  );
}

export default CreativeBlue;
