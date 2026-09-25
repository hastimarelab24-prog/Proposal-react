import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function Executive({
  children,
  pageNumber = 1,
  totalPages = 1,
}) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1123px] w-[794px] flex-col overflow-hidden bg-white shadow-2xl"
      data-pdf-page="true"
    >
      {/* 
          HEADER
       */}

      <header className="flex h-[120px] w-full shrink-0 items-center justify-between bg-slate-800 px-12">
        <div>
          <p className="text-[10px] uppercase tracking-[3px] text-slate-300">
            Business Proposal
          </p>

          <h1 className="mt-1 text-lg font-semibold tracking-[2px] text-white">
            EXECUTIVE
          </h1>
        </div>

        <div className="flex items-center">
          <ProposalLogo
            className="h-20 w-30 object-contain brightness-0 invert"
          />
        </div>
      </header>

   

      <main className="min-h-0 flex-1 overflow-hidden px-12 py-10">
        <div className="h-full min-h-0 overflow-hidden">
          {children}
        </div>
      </main>

      {/* 
          FOOTER
       */}

      <footer className="flex h-[55px] w-full shrink-0 items-center justify-between border-t border-slate-200 bg-white px-12 text-[9px] text-slate-400">
        <ProposalLogo className="h-10 w-24 object-contain" />

        <span className="text-sm">
          Page {pageNumber} of {totalPages}
        </span>
      </footer>
    </div>
  );
}

export default Executive;