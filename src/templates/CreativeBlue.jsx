import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function CreativeBlue({
  children,
  pageNumber = 1,
  totalPages = 1,
}) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1123px] w-[794px] flex-col overflow-hidden bg-white text-sky-600 shadow-2xl"
      data-pdf-page="true"
    >
      {/* DECORATIVE CIRCLES */}

      <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-sky-200" />

      <div className="absolute -bottom-20 -left-24 h-48 w-48 rounded-full bg-sky-200" />

      {/* MAIN CONTENT */}

      <div className="relative z-10 flex h-full min-h-0 flex-col px-14 py-10">
        {/* TOP HEADER */}

        <div className="flex shrink-0 items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-sky-600">
              Proposal Studio
            </p>
          </div>

          <ProposalLogo className="h-20 w-30 font-semibold rounded p-1 shadow-sm" />
        </div>


        {/* MARKDOWN CONTENT */}

        <div className="mt-14 min-h-0 flex-1 overflow-hidden border-t border-sky-100 pt-10">
          <div className="h-full min-h-0 overflow-hidden">
            {children}
          </div>
        </div>

        {/* FOOTER */}

        <footer className="mt-6 flex h-[55px] shrink-0 items-center justify-between border-t border-sky-100 text-[9px] text-sky-400">
          <ProposalLogo className="h-20 w-30 font-semibold rounded p-1 shadow-sm" />

          <span className="text-xl">
            Page {pageNumber} of {totalPages}
          </span>
        </footer>
      </div>
    </div>
  );
}

export default CreativeBlue;