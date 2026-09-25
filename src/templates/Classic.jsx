

import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function Classic({
  children,
  pageNumber = 1,
  totalPages = 1,
}) {
  const isFirstPage = pageNumber === 1;

  return (
    <div
      className="proposal-a4-page relative mx-auto h-[1123px] w-[794px] overflow-hidden bg-slate-50 p-5 shadow-2xl"
      data-pdf-page="true"
    >
      {/* INNER PAGE */}

      <div className="relative flex h-full min-h-0 flex-col overflow-hidden border border-slate-400 bg-white">

        {/* PAGE 1 COVER */}

        {isFirstPage ? (
          <>
            {/* COVER CONTENT */}

            <div className="flex flex-1 flex-col items-center px-10 pt-16 text-center">

              <p className="text-xs font-bold tracking-[4px] text-slate-800">
                PROPOSAL STUDIO
              </p>

              <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900">
                Strategic
                <br />
                Partnership
              </h1>

              {/* SMALL LINE */}

              <div className="my-8 h-px w-12 bg-slate-800" />

              <p className="text-sm text-slate-500">
                Prepared for Your Client
              </p>

              {/* LOGO */}

              <div className="mt-auto mb-20">
                <ProposalLogo className="h-10 w-32 object-contain" />
              </div>
            </div>

            {/* COVER FOOTER */}

            <footer className="flex h-[55px] shrink-0 items-center justify-between border-t border-slate-300 bg-white px-10">
              <ProposalLogo className="h-20 w-30 object-contain" />

              <span className="text-xl text-slate-500">
                Page {pageNumber} of {totalPages}
              </span>
            </footer>
          </>
        ) : (
          <>
            {/* OTHER PAGES HEADER */}

            <header className="flex h-[75px] shrink-0 items-center justify-between border-b border-slate-300 px-10">
              <div>
                <p className="text-[9px] font-bold tracking-[3px] text-slate-700">
                  PROPOSAL STUDIO
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Strategic Partnership
                </p>
              </div>

              <ProposalLogo className="h-6 w-20 object-contain" />
            </header>

            {/* MARKDOWN CONTENT */}

            <main className="min-h-0 flex-1 overflow-hidden px-12 py-8">
              <div className="h-full min-h-0 overflow-hidden">
                {children}
              </div>
            </main>

            {/* NORMAL PAGE FOOTER */}

        <footer className="mt-6 flex h-[55px] shrink-0 items-center justify-between border-t border-sky-100 text-[9px] ">
          <ProposalLogo className="h-20 w-30 font-semibold rounded p-1 shadow-sm" />

              <span className=" text-sm pr-3">
                Page {pageNumber} of {totalPages}
              </span>
            </footer>
          </>
        )}

      </div>
    </div>
  );
}

export default Classic;