import React from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import templates from "../templates/templateData";

function TemplatePage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const template =
    templates.find(
      (item) =>
        item.id === Number(id)
    );

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <h1 className="text-2xl font-bold">
            Template Not Found
          </h1>

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const TemplateComponent =
    template.component;

  const handleCreate = () => {
    /*
      IMPORTANT:
      selected template ID goes
      into URL.
    */

    navigate(
      `/proposal/${template.id}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="mb-4 text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Templates
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            {template.name}
          </h1>

          <p className="mt-2 text-slate-500">
            {template.description}
          </p>
        </div>

        {/* PREVIEW */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex justify-center overflow-hidden rounded-xl bg-slate-200 p-8">
            <div className="origin-top scale-[0.7]">
              <TemplateComponent
                pageNumber={1}
                totalPages={1}
                isCover={true}
              >
                <div className="flex h-full flex-col justify-center">
                  <div className="mb-5 h-1 w-20 bg-blue-600" />

                  <h1 className="text-5xl font-bold text-slate-900">
                    BUSINESS PROPOSAL
                  </h1>

                  <h2 className="mt-5 text-2xl text-blue-600">
                    Strategic Digital Partnership
                  </h2>

                  <div className="mt-20">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Prepared For
                    </p>

                    <p className="mt-2 text-xl font-semibold">
                      Your Client
                    </p>
                  </div>
                </div>
              </TemplateComponent>
            </div>
          </div>

          {/* CREATE */}

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={
                handleCreate
              }
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Use This Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatePage;