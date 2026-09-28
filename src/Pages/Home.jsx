import React from "react";
import { useNavigate } from "react-router-dom";
import templates from "../templates/templateData";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Proposal Studio
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Choose a professional proposal template
          </p>
        </div>
      </header>

      {/* TEMPLATES */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => {
            const TemplateComponent = template.component;

            return (
              <div
                key={template.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* PREVIEW */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/template/${template.id}`)
                  }
                  className="block w-full text-left"
                >
                  <div className="flex w-full justify-center overflow-hidden bg-slate-100 p-4 sm:p-5">
                    <div
                      className="
                        relative
                        w-full
                        max-w-[380px]
                        overflow-hidden
                        bg-white
                      "
                      style={{
                        aspectRatio: "794 / 1123",
                      }}
                    >
                      <div
                        className="absolute left-0 top-0"
                        style={{
                          width: "794px",
                          height: "1123px",
                          transform: "scale(0.47)",
                          transformOrigin: "top left",
                        }}
                      >
                        <TemplateComponent
                          pageNumber={1}
                          totalPages={1}
                          isCover={true}
                        >
                          <div className="flex h-full flex-col justify-center">
                            <div className="mb-5 h-1 w-20 bg-blue-600" />

                            <h2 className="text-5xl font-bold text-slate-900">
                              Executive Summary
                            </h2>

                            <p className="mt-5 text-xl text-slate-600">
                              Professional business proposal
                              content preview.
                            </p>

                            <h3 className="mt-10 text-3xl font-bold text-slate-900">
                              Our Services
                            </h3>

                            <p className="mt-3 text-xl text-slate-700">
                              Strategic solutions designed for
                              your business.
                            </p>
                          </div>
                        </TemplateComponent>
                      </div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-slate-900">
                      {template.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {template.description}
                    </p>
                  </div>
                </button>

                {/* BUTTON */}
                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/template/${template.id}`)
                    }
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Home;