import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function Template6({ children, pageNumber = 1, totalPages = 1 }) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1123px] w-[794px] flex-col overflow-hidden bg-white text-slate-800"
      data-pdf-page="true"
    >
      {/* HEADER */}
      <header className="flex h-[145px] shrink-0 items-center justify-between px-14">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[4px] text-slate-400">
            Business Proposal
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Proposal Studio
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="h-px w-8 bg-slate-400" />
            <p className="text-[10px] text-slate-400">
              Professional Business Solution
            </p>
          </div>
        </div>

        {/* LOGO */}
        <div className="flex h-20 w-40 items-center justify-center">
          <ProposalLogo className="h-16 w-40 object-contain" />
        </div>
      </header>

      {/* ACCENT */}
      <div className="mx-14 h-px bg-slate-200" />

      {/* CONTENT */}
      <main className="min-h-0 flex-1  px-14 py-7">
        <div className="h-full min-h-0 overflow-hidden">
          {children}
        </div>
      </main>

      {/* BOTTOM ACCENT */}
      <div className="mx-14 h-px bg-slate-200" />

      {/* FOOTER */}
      <footer className="flex h-[85px] shrink-0 items-center justify-between px-14">
        <div>
          <p className="text-[9px] uppercase tracking-[3px] text-slate-400">
            Proposal Studio
          </p>

          <p className="mt-1 text-[9px] text-slate-300">
            Business Proposal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            Page
          </span>

          <span className="text-sm font-semibold text-slate-800">
            {pageNumber}
          </span>

          <span className="text-slate-300">/</span>

          <span className="text-sm text-slate-400">
            {totalPages}
          </span>
        </div>
      </footer>

      {/* BOTTOM DESIGN */}
      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-slate-900" />
      <div className="absolute bottom-0 left-1/3 h-1 w-1/3 bg-slate-300" />
      <div className="absolute bottom-0 right-0 h-1 w-1/3 bg-slate-100" />
    </div>
  );
}

export default Template6;