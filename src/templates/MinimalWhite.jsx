import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function MinimalWhite({
  children,
  pageNumber = 1,
  totalPages = 1,
}) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1123px] w-[794px] flex-col overflow-hidden bg-white shadow-2xl"
      data-pdf-page="true"
    >
     
      {/* HEADER */}
      <header className="relative z-10 flex h-[120px] shrink-0 items-center justify-between px-14">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[4px] text-slate-800">
            Proposal
          </p>

          <div className="mt-2 h-1 w-8 rounded-full bg-blue-300" />
        </div>

        <ProposalLogo className="h-20 w-28 object-contain" />
      </header>

      {/* CONTENT */}
      <main className="relative z-10 min-h-0 flex-1 overflow-hidden px-14 py-8">
        <div className="h-full min-h-0 overflow-hidden">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 flex h-[55px] shrink-0 items-center justify-between border-t border-slate-100 bg-white px-14">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-200" />

          <span className="text-[9px] font-medium uppercase tracking-[2px] text-slate-400">
            Proposal Studio
          </span>
        </div>

        <span className="text-xs font-medium text-slate-500">
          Page {pageNumber} of {totalPages}
        </span>
      </footer>
    </div>
  );
}

export default MinimalWhite;