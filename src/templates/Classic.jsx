import React from "react";
import ProposalLogo from "../Components/ProposalLogo";

function Classic({ children, pageNumber = 1, totalPages = 1 }) {
  const isFirstPage = pageNumber === 1;

  return (
    <div
      className="proposal-a4-page relative mx-auto h-[1123px] w-[794px] overflow-hidden bg-slate-50 p-5 shadow-2xl"
      data-pdf-page="true"
    >
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden border border-slate-300 bg-white">
        {/* COVER PAGE */}
        {isFirstPage ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col items-center px-10 pt-16 text-center">
              <p className="text-xs font-bold tracking-[4px] text-blue-700">
                PROPOSAL STUDIO
              </p>

              <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900">
                Strategic
                <br />
                Partnership
              </h1>

              <div className="my-8 h-px w-12 shrink-0 bg-blue-600" />

              <p className="text-sm text-slate-500">
                Prepared for Your Client
              </p>

              <div className="mt-auto mb-16">
                {/* COVER LOGO */}
                <ProposalLogo className="h-14 w-40 object-contain" />
              </div>
            </div>

            {/* COVER FOOTER */}
            <footer className="flex h-[55px] shrink-0 items-center justify-between bg-white px-10">
              {/* FOOTER LOGO */}
              <ProposalLogo className="h-32 w-32 object-contain" />

              <span className="text-sm text-slate-500">
                Page {pageNumber} of {totalPages}
              </span>
            </footer>
          </>
        ) : (
          <>
            {/* PAGE HEADER */}
            <header className="flex h-[85px] shrink-0 items-center justify-between bg-white px-10">
              <div className="min-w-0">
                <p className="text-[9px] font-bold tracking-[3px] text-blue-700">
                  PROPOSAL STUDIO
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Strategic Partnership
                </p>
              </div>

              {/* HEADER LOGO */}
              <ProposalLogo className="h-20 w-32 shrink-0 object-contain" />
            </header>

            {/* CONTENT */}
            <main className="min-h-0 flex-1 overflow-hidden  px-10 py-8">
              <div className="h-full min-h-0 overflow-hidden rounded-lg px-8 py-7">
                <div className="h-full min-h-0 overflow-hidden">
                  {children}
                </div>
              </div>
            </main>

            {/* PAGE FOOTER */}
            <footer className="flex h-[60px] shrink-0 items-center justify-between bg-white px-10">
              {/* FOOTER LOGO */}
              <ProposalLogo className="h-14 w-32 object-contain" />

              <span className="text-sm text-slate-500">
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