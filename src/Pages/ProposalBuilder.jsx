// import React, { useState } from "react";
// import MarkdownEditor from "../Components/MarkdownEditor";
// import ProposalPreview from "../Components/ProposalPreview";
// import { useParams } from "react-router-dom";
// import templates from "../templates/templateData";

// const DEFAULT_MARKDOWN = `# BUSINESS PROPOSAL

// ## Strategic Digital Partnership

// **Prepared for:** Your Client

// **Prepared by:** Your Company

// ---

// ## Executive Summary

// We are pleased to present this business proposal for a modern digital partnership.

// Our goal is to create a professional, scalable and high-performing digital solution.

// ## Our Services

// ### Web Development

// We create responsive and modern websites.

// - Responsive website
// - React.js development
// - API integration
// - CMS integration
// - Performance optimization

// ### UI/UX Design

// Our design process focuses on usability and conversion.

// - User research
// - Wireframes
// - UI design
// - Design systems

// ## Project Process

// \`\`\`mermaid
// graph TD
//     A[Discovery] --> B[Planning]
//     B --> C[Design]
//     C --> D[Development]
//     D --> E[Testing]
//     E --> F[Launch]
// \`\`\`

// ## Investment

// | Service | Description | Price |
// | --- | --- | ---: |
// | Website | Business website | ₹50,000 |
// | UI/UX | Complete UI/UX design | ₹30,000 |
// | Consulting | Business consulting | ₹20,000 |

// ## Technology

// \`\`\`javascript
// const proposal = {
//   platform: "React.js",
//   design: "Tailwind CSS"
// };

// console.log(proposal);
// \`\`\`

// ## Conclusion

// We look forward to working with you.

// **Thank you for considering our proposal.**

// ---

// # Thank You

// ## Let's Build Something Great

// **Your Company**
// `;

// function ProposalBuilder() {
//   //
//   const {templateId}=useParams();
//   // find selected template
//   const template = templates.find((item)=>item.id === Number(templateId))

// const TemplateComponent=template?.component
//   const [markdown, setMarkdown] = useState(() => {
//     const savedMarkdown = localStorage.getItem("proposalMarkdown");

//     return savedMarkdown !== null
//       ? savedMarkdown
//       : DEFAULT_MARKDOWN;
//   });

//   const [companyName, setCompanyName] = useState(() => {
//     const savedCompanyName =
//       localStorage.getItem("proposalCompanyName");

//     return savedCompanyName !== null
//       ? savedCompanyName
//       : "Your Company";
//   });

//   const [showPreview, setShowPreview] = useState(true);

// if(!template){
//   return(
//     <div>
//       Template Not Found
//     </div>
//   )
// }

//   // Markdown change
//   const handleMarkdownChange = (value) => {
//     setMarkdown(value);

//     localStorage.setItem("proposalMarkdown", value);
//   };

//   // Company name change
//   const handleCompanyNameChange = (value) => {
//     setCompanyName(value);

//     localStorage.setItem(
//       "proposalCompanyName",
//       value
//     );
//   };

//   // Clear
//   const handleClear = () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to clear the proposal?"
//     );

//     if (!confirmed) return;

//     setMarkdown("");

//     localStorage.setItem("proposalMarkdown", "");
//   };

//   // Reset
//   const handleReset = () => {
//     const confirmed = window.confirm(
//       "Reset proposal to the default content?"
//     );

//     if (!confirmed) return;

//     setMarkdown(DEFAULT_MARKDOWN);
//     setCompanyName("Your Company");

//     localStorage.setItem(
//       "proposalMarkdown",
//       DEFAULT_MARKDOWN
//     );

//     localStorage.setItem(
//       "proposalCompanyName",
//       "Your Company"
//     );
//   };

//   // Print
//   const handlePrint = () => {
//     window.print();
//   };

// // ================= DOWNLOAD PDF =================

// const handleDownload = async () => {
//   try {
//     const html2canvas =
//       (await import("html2canvas")).default;

//     const { jsPDF } = await import("jspdf");

//     const pages = Array.from(
//       document.querySelectorAll(
//         ".proposal-a4-page"
//       )
//     );

//     if (pages.length === 0) {
//       alert("Proposal pages not found.");
//       return;
//     }

//     console.log(
//       "PDF pages:",
//       pages.length
//     );

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//       compress: true,
//     });

//     for (let i = 0; i < pages.length; i++) {
//       const originalPage = pages[i];

//       // ==========================================
//       // TEMPORARY PDF PAGE
//       // ==========================================

//       const wrapper =
//         document.createElement("div");

//       wrapper.style.position = "fixed";
//       wrapper.style.left = "0";
//       wrapper.style.top = "0";

//       wrapper.style.width = "794px";
//       wrapper.style.height = "1123px";

//       wrapper.style.background = "#ffffff";

//       wrapper.style.overflow = "hidden";

//       // IMPORTANT:
//       // Keep it above the page, but invisible to user
//       wrapper.style.zIndex = "2147483647";

//       wrapper.style.opacity = "1";

//       // ==========================================
//       // CLONE A4 PAGE
//       // ==========================================

//       const page =
//         originalPage.cloneNode(true);

//       page.style.width = "794px";
//       page.style.height = "1123px";
//       page.style.minHeight = "1123px";
//       page.style.maxHeight = "1123px";

//       page.style.margin = "0";
//       page.style.padding =
//         originalPage.style.padding;

//       page.style.transform = "none";
//       page.style.position = "relative";

//       page.style.left = "0";
//       page.style.top = "0";

//       page.style.background = "#ffffff";

//       page.style.overflow = "hidden";

//       // VERY IMPORTANT
//       // Remove CSS PDF/print page breaks
//       page.style.pageBreakAfter = "auto";
//       page.style.pageBreakBefore = "auto";
//       page.style.breakAfter = "auto";
//       page.style.breakBefore = "auto";

//       // ==========================================
//       // REMOVE PAGE BREAK CSS FROM CHILDREN
//       // ==========================================

//       const allElements =
//         page.querySelectorAll("*");

//       allElements.forEach((element) => {
//         element.style.pageBreakAfter =
//           "auto";

//         element.style.pageBreakBefore =
//           "auto";

//         element.style.breakAfter =
//           "auto";

//         element.style.breakBefore =
//           "auto";
//       });

//       wrapper.appendChild(page);

//       document.body.appendChild(wrapper);

//       // ==========================================
//       // WAIT FOR RENDER
//       // ==========================================

//       await new Promise((resolve) => {
//         requestAnimationFrame(() => {
//           requestAnimationFrame(resolve);
//         });
//       });

//       // ==========================================
//       // WAIT FOR IMAGES
//       // ==========================================

//       const images =
//         page.querySelectorAll("img");

//       await Promise.all(
//         Array.from(images).map((img) => {
//           if (img.complete) {
//             return Promise.resolve();
//           }

//           return new Promise((resolve) => {
//             img.onload = resolve;
//             img.onerror = resolve;
//           });
//         })
//       );

//       // ==========================================
//       // CAPTURE
//       // ==========================================

//       const canvas =
//         await html2canvas(page, {
//           width: 794,
//           height: 1123,

//           scale: 2,

//           backgroundColor:
//             "#ffffff",

//           useCORS: true,
//           allowTaint: true,

//           scrollX: 0,
//           scrollY: 0,

//           windowWidth: 794,
//           windowHeight: 1123,

//           logging: false,
//         });

//       // ==========================================
//       // REMOVE TEMP PAGE
//       // ==========================================

//       document.body.removeChild(wrapper);

//       // ==========================================
//       // IMAGE
//       // ==========================================

//       const image =
//         canvas.toDataURL(
//           "image/jpeg",
//           0.95
//         );

//       // ==========================================
//       // PDF PAGE
//       // ==========================================

//       if (i > 0) {
//         pdf.addPage(
//           "a4",
//           "portrait"
//         );
//       }

//       pdf.addImage(
//         image,
//         "JPEG",
//         0,
//         0,
//         210,
//         297,
//         undefined,
//         "FAST"
//       );

//       console.log(
//         `PDF page ${i + 1} added`
//       );
//     }

//     // ==========================================
//     // DOWNLOAD
//     // ==========================================

//     pdf.save(
//       "business-proposal.pdf"
//     );

//     console.log(
//       "PDF completed successfully"
//     );

//   } catch (error) {
//     console.error(
//       "PDF Error:",
//       error
//     );

//     alert(
//       "PDF download failed."
//     );
//   }
// };
//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* ================= TOP HEADER ================= */}
//       <header className="sticky top-0 z-50 h-[72px] border-b border-slate-200 bg-white">

//         <div className="flex h-full items-center justify-between px-6">

//           {/* Logo */}
//           <div className="flex items-center gap-3">

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
//               P
//             </div>

//             <div>
//               <h1 className="text-lg font-bold text-slate-900">
//                 Proposal Builder
//               </h1>

//               <p className="text-xs text-slate-500">
//                 Create professional business proposals
//               </p>
//             </div>

//           </div>

//           {/* Header Buttons */}
//           <div className="flex items-center gap-2">

//             <button
//               type="button"
//               onClick={() => setShowPreview(false)}
//               className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
//                 !showPreview
//                   ? "border-blue-600 bg-blue-600 text-white"
//                   : "border-slate-300 bg-white text-slate-700"
//               }`}
//             >
//               Editor
//             </button>

//             <button
//               type="button"
//               onClick={() => setShowPreview(true)}
//               className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
//                 showPreview
//                   ? "border-blue-600 bg-blue-600 text-white"
//                   : "border-slate-300 bg-white text-slate-700"
//               }`}
//             >
//               Preview
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* ================= WORKSPACE ================= */}
//       <main className="p-5">

//         <div
//           className={`grid gap-5 ${
//             showPreview
//               ? "grid-cols-1 xl:grid-cols-2"
//               : "grid-cols-1"
//           }`}
//         >

//           {/* ================= EDITOR ================= */}
//           <section
//             className={`rounded-2xl border border-slate-200 bg-white shadow-proposal ${
//               showPreview ? "" : "mx-auto w-full max-w-6xl"
//             }`}
//           >

//             {/* Editor Header */}
//             <div className="border-b border-slate-200 px-5 py-4">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
//                     Document Editor
//                   </p>

//                   <h2 className="mt-1 text-lg font-bold text-slate-900">
//                     Proposal Content
//                   </h2>
//                 </div>

//                 <div className="flex items-center gap-2">

//                   <span className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">

//                     <span className="h-2 w-2 rounded-full bg-green-500" />

//                     Saved
//                   </span>

//                   <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
//                     Markdown
//                   </span>

//                 </div>
//               </div>

//               {/* Company Name */}
//               <div className="mt-6">

//                 <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
//                   Company Name
//                 </label>

//                 <input
//                   type="text"
//                   value={companyName}
//                   onChange={(e) =>
//                     handleCompanyNameChange(
//                       e.target.value
//                     )
//                   }
//                   placeholder="Enter company name"
//                   className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />

//                 <p className="mt-2 text-xs text-slate-400">
//                   "Your Company" will automatically be
//                   replaced with this name.
//                 </p>

//               </div>
//             </div>

//             {/* Markdown Editor */}
//             <MarkdownEditor
//               markdown={markdown}
//               setMarkdown={handleMarkdownChange}
//               onClear={handleClear}
//               onReset={handleReset}
//             />

//           </section>

//           {/* ================= PREVIEW ================= */}
//           {showPreview && (
//             <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-proposal">

//               <ProposalPreview
//                 markdown={markdown}
//                 companyName={companyName}
//                 TemplateComponent={TemplateComponent}
//                 onReset={handleReset}
//                 onPrint={handlePrint}
//               />

//             </section>
//           )}

//         </div>

//       </main>
//     </div>
//   );
// }

// export default ProposalBuilder;



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
