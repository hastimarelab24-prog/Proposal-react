import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function Template6({
  children,
  pageNumber = 1,
  totalPages = 1,
}) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1123px] w-[794px] flex-col overflow-hidden bg-white shadow-2xl"
      data-pdf-page="true"
    >
      {/* TOP ACCENT */}
      <div className="absolute left-0 top-0 h-1 w-full bg-blue-600" />

      {/* HEADER */}
      <header className="flex h-[115px] w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-12">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />

            <p className="text-[9px] font-semibold uppercase tracking-[3px] text-blue-600">
              Business Proposal
            </p>
          </div>

          <h1 className="mt-2 text-xl font-bold tracking-[1px] text-slate-800">
            PROPOSAL STUDIO
          </h1>

          <p className="mt-1 text-[10px] text-slate-400">
            Professional Business Solution
          </p>
        </div>

        <div className="flex h-12 w-28 items-center justify-center">
          <ProposalLogo className="h-10 w-28 object-contain" />
        </div>
      </header>

      {/* CONTENT */}
      <main className="min-h-0 flex-1 overflow-hidden bg-slate-50 px-10 py-8">
        <div className="h-full min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white px-8 py-7">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex h-[60px] w-full shrink-0 items-center justify-between border-t border-slate-200 bg-white px-12">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

          <span className="text-[9px] font-medium uppercase tracking-[2px] text-slate-400">
            Proposal Studio
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">
            Page {pageNumber}
          </span>

          <span className="text-slate-300">/</span>

          <span className="text-slate-400">
            {totalPages}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Template6;