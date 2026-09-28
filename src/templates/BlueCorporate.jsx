import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function BlueCorporate({ children, pageNumber = 1, totalPages = 1 }) {
  return (
    <div
      className="proposal-a4-page relative mx-auto flex h-[1223px] w-[794px] flex-col overflow-hidden bg-white shadow-2xl"
      data-pdf-page="true"
    >
      {/* TOP HEADER */}

      <header className="flex shrink-0 items-center justify-between px-12 py-7">
        <span className="text-xs font-bold tracking-[3px] text-slate-900">
          PROPOSAL
        </span>

        <ProposalLogo className="h-20 w-30 font-semibold rounded p-1 shadow-sm" />
      </header>

      {/* MAIN CONTENT */}

      <main className="min-h-0 flex-1 overflow-hidden px-16 pt-12 pb-4">
        <div className="h-full min-h-0 overflow-hidden">
          <div className=" pt-6">{children}</div>
        </div>
      </main>

      {/* FOOTER */}

      <footer className="absolute bottom-0 left-0 h-[75px] w-full">
        {/* BLACK HORIZONTAL LINE */}

        <div className="absolute left-0 top-[25px] h-[30px] w-full bg-[#1B2222]" />

        {/* BLUE SHAPE - LEFT */}

        <div className="absolute left-[52%] top-[9px] z-10 h-[62px] w-[42px] -skew-x-[18deg] bg-[#73B6D9]" />

        {/* BLUE SHAPE - RIGHT */}

        <div className="absolute left-[61%] top-[9px] z-10 h-[62px] w-[42px] -skew-x-[18deg] bg-[#73B6D9]" />

        {/* PAGE NUMBER */}

        <div className="absolute bottom-[16px] right-16 z-20 text-[9px] text-white text-xl justify-center">
          Page {pageNumber} of {totalPages}
        </div>
      </footer>
    </div>
  );
}

export default BlueCorporate;
