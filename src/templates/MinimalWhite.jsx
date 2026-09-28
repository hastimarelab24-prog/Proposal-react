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
      {/* YELLOW DESIGN */}

      <div className="absolute left-12 top-0 z-0 h-28 w-14 rounded-b-full bg-yellow-400" />

      {/* HEADER */}

      <header className="relative z-10 flex h-[170px] shrink-0 items-start px-16 py-14">
        <div className="w-full text-center pt-20">
          <p className="text-xs font-bold uppercase tracking-[4px] text-slate-900">
            Proposal
          </p>
        </div>

          <ProposalLogo className="h-20 w-30 font-semibold rounded p-1 shadow-sm" />
      </header>

      {/* CONTENT */}

      <main className="relative z-10 min-h-0 flex-1 overflow-hidden px-16 py-10">
        <div className="h-full min-h-0 overflow-hidden">
          {children}
        </div>
      </main>

      {/* FOOTER */}

      <footer className="relative z-10 flex h-[55px] shrink-0 items-center justify-between border-t border-slate-100 bg-white px-16 text-[9px] text-slate-400">
        <ProposalLogo className="h-20 w-30" />

        <span className="text-xl">
          Page {pageNumber} of {totalPages}
        </span>
      </footer>
    </div>
  );
}

export default MinimalWhite;