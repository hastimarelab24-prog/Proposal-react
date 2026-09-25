
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
    <div className="min-h-screen bg-slate-100">
      {/* TOP BAR */}
      <div className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Proposal Builder
            </h1>

            <p className="text-sm text-slate-500">{selectedTemplate.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              title="Go to Home"
            >
              <IoMdHome size={22} />
            </button>

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* EDITOR + PREVIEW */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        {/* EDITOR */}
        <section className="min-w-0 overflow-hidden rounded-2xl bg-white shadow">
          <MarkdownEditor
            markdown={markdown}
            setMarkdown={setMarkdown}
            onClear={() => setMarkdown("")}
            onReset={() => setMarkdown("")}
          />
        </section>

        {/* PREVIEW */}
        <section className="min-w-0 overflow-hidden rounded-2xl bg-slate-200 p-4 shadow">
          <ProposalPreview
            markdown={markdown}
            companyName={companyName}
            TemplateComponent={TemplateComponent}
          />
        </section>
      </div>
    </div>
  );
}

export default ProposalBuilder;
