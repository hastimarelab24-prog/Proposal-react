import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function CreativeBlue({ children, pageNumber = 1, totalPages = 1 }) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1123px] w-[794px] flex-col overflow-hidden bg-white text-slate-800"
      data-pdf-page="true"
    >
      {/* TOP ACCENT */}
      <div className="h-2 w-full bg-blue-600" />

      {/* HEADER */}
      <header className="flex h-[115px] shrink-0 items-center justify-between px-12">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-blue-600" />

          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-slate-800">
              Proposal Studio
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Creative Business Proposal
            </p>
          </div>
        </div>

        <ProposalLogo className="h-20 w-32 object-contain" />
      </header>

      {/* CONTENT */}
      <main className="min-h-0 flex-1  px-12 ">
        <div className="h-full min-h-0 rounded-xl  p-7">
          <div className="h-full min-h-0 overflow-hidden rounded-lg bg-white p-6">
            {children}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex h-[70px] shrink-0 items-center justify-between bg-slate-900 px-12">
        <ProposalLogo className="h-24 w-24 object-contain brightness-0 invert" />

        <div className="flex items-center gap-3 text-xs text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span>
            Page {pageNumber} of {totalPages}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default CreativeBlue;