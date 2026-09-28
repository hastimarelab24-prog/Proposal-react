import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

import MarkdownEditor from "../Components/MarkdownEditor";
import ProposalPreview from "../Components/ProposalPreview";
import templates from "../templates/templateData";

const DEFAULT_MARKDOWN = `# Business Proposal

## Executive Summary

Your proposal content will appear here.

## Our Services

Add your services and business information using the Markdown editor.

## Project Process

\`\`\`mermaid
graph TD
  A[Discovery] --> B[Planning]
  B --> C[Design]
  C --> D[Development]
  D --> E[Testing]
  E --> F[Launch]
\`\`\`

## Investment

| Service | Description | Price |
| ------- | ----------- | ----- |
| Website | Business website | ₹50,000 |
| UI/UX | Complete UI/UX design | ₹30,000 |
| Consulting | Business consulting | ₹20,000 |

## Next Steps

1. Project discussion
2. Final requirements
3. Design approval
4. Development
5. Final delivery
`;

function ProposalBuilder() {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem("proposalMarkdown") || DEFAULT_MARKDOWN;
  });

  const [companyName, setCompanyName] = useState(() => {
    return localStorage.getItem("proposalCompanyName") || "Marelab";
  });

  const selectedTemplate = templates.find(
    (template) => String(template.id) === String(templateId),
  );

  const TemplateComponent = selectedTemplate?.component;

  useEffect(() => {
    localStorage.setItem("proposalMarkdown", markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem("proposalCompanyName", companyName);
  }, [companyName]);

  if (!TemplateComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-bold text-red-600">Template not found</h2>

          <p className="mt-2 text-sm text-slate-500">
            Please check templateData.js
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 w-full overflow-x-hidden">
      {/* TOP BAR */}
      <div className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              {" "}
              Proposal Builder
            </h1>

            <p className="text-xs mt-0.5 truncate sm:text-sm text-slate-500">
              {selectedTemplate.name}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 sm:w-10 sm:px-0"
              title="Go to Home"
            >
              <IoMdHome size={22} />
            </button>

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none  transition placeholder:text-slate-400   focus:border-blue-500 focus:ring-2    focus:ring-blue-100 sm:w-64 sm:px-4"
            />
          </div>
        </div>
      </div>

      {/* EDITOR + PREVIEW */}
      <div className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="grid min-w-0 grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6">
          {/* EDITOR */}
          <section className="min-w-0 overflow-hidden rounded-2xl bg-white shadow">
            <div className="min-h-[450px] h-[70vh] max-h-[9000px] sm:min-h-[500px] lg:h-[calc(5000vh-150vh)]">
              <MarkdownEditor
                markdown={markdown}
                setMarkdown={setMarkdown}
                onClear={() => setMarkdown("")}
                onReset={() => setMarkdown("")}
              />
            </div>
          </section>

          {/* PREVIEW */}
          <section className="min-w-0 overflow-hidden rounded-xl bg-slate-200 p-2 shadow-sm sm:rounded-2xl sm:p-3 md:p-4">
            <div className="w-full min-w-0">
              <ProposalPreview
                markdown={markdown}
                companyName={companyName}
                TemplateComponent={TemplateComponent}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProposalBuilder;
