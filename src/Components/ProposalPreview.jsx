// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import mermaid from "mermaid";
// import  html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

// import marelabLogo from "../assets/marelablogo.webp";
// // =
// // MERMAID CONFIG
// // ======================================================

// mermaid.initialize({
//   startOnLoad: false,
//   theme: "neutral",
//   securityLevel: "loose",
// });

// // ======================================================
// // HELPERS
// // ======================================================

// function replaceCompanyName(
//   markdown,
//   companyName = "Your Company"
// ) {
//   const name =
//     companyName && companyName.trim()
//       ? companyName.trim()
//       : "Your Company";

//   return (markdown || "").replace(
//     /Your Company/g,
//     name
//   );
// }

// // ======================================================
// // COVER DATA
// // ======================================================

// function getCoverData(
//   markdown,
//   companyName
// ) {
//   const text = replaceCompanyName(
//     markdown,
//     companyName
//   );

//   const lines = text
//     .split("\n")
//     .map((line) => line.trim());

//   let title = "BUSINESS PROPOSAL";

//   let subtitle =
//     "Strategic Digital Partnership";

//   let preparedFor = "Your Client";

//   let preparedBy =
//     companyName || "Your Company";

//   // Main title
//   const titleLine = lines.find((line) =>
//     /^#\s+/.test(line)
//   );

//   if (titleLine) {
//     title = titleLine
//       .replace(/^#\s+/, "")
//       .trim();
//   }

//   // Subtitle
//   const subtitleLine = lines.find((line) =>
//     /^##\s+/.test(line)
//   );

//   if (subtitleLine) {
//     subtitle = subtitleLine
//       .replace(/^##\s+/, "")
//       .trim();
//   }

//   // Prepared For
//   const preparedForLine =
//     lines.find((line) =>
//       /^\*\*Prepared for:\*\*/i.test(line)
//     );

//   if (preparedForLine) {
//     preparedFor = preparedForLine
//       .replace(
//         /^\*\*Prepared for:\*\*/i,
//         ""
//       )
//       .trim();
//   }

//   // Prepared By
//   const preparedByLine =
//     lines.find((line) =>
//       /^\*\*Prepared by:\*\*/i.test(line)
//     );

//   if (preparedByLine) {
//     preparedBy = preparedByLine
//       .replace(
//         /^\*\*Prepared by:\*\*/i,
//         ""
//       )
//       .trim();
//   }

//   return {
//     title,
//     subtitle,
//     preparedFor,
//     preparedBy,
//   };
// }

// // ======================================================
// // MANUAL PAGE SPLIT
// // ======================================================

// function splitManualPages(markdown) {
//   return (markdown || "")
//     .split(/\n\s*---\s*\n/)
//     .map((page) => page.trim())
//     .filter(Boolean);
// }

// // ======================================================
// // MERMAID DIAGRAM
// // ======================================================

// function MermaidDiagram({ code }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     let cancelled = false;

//     async function renderDiagram() {
//       if (!containerRef.current || !code) {
//         return;
//       }

//       const id =
//         "mermaid-" +
//         Date.now() +
//         "-" +
//         Math.random()
//           .toString(36)
//           .substring(2, 8);

//       try {
//         const result =
//           await mermaid.render(id, code);

//         if (
//           !cancelled &&
//           containerRef.current
//         ) {
//           containerRef.current.innerHTML =
//             result.svg;
//         }
//       } catch (error) {
//         console.error(
//           "Mermaid rendering error:",
//           error
//         );

//         if (
//           !cancelled &&
//           containerRef.current
//         ) {
//           containerRef.current.innerHTML = "";

//           const errorBox =
//             document.createElement("pre");

//           errorBox.className =
//             "w-full whitespace-pre-wrap rounded-md border border-red-200 bg-red-50 p-2.5 text-[8px] text-red-600";

//           errorBox.textContent =
//             "Mermaid error:\n\n" + code;

//           containerRef.current.appendChild(
//             errorBox
//           );
//         }
//       }
//     }

//     renderDiagram();

//     return () => {
//       cancelled = true;
//     };
//   }, [code]);

//   return (
//     <div
//       ref={containerRef}
//       className="my-[15px] flex min-h-[120px] items-center justify-center overflow-hidden rounded-[10px] border border-slate-200 bg-slate-50 p-[14px]"
//     />
//   );
// }

// // ======================================================
// // MARKDOWN CONTENT
// // ======================================================

// function MarkdownContent({ content }) {
//   return (
//     <div className="text-[11px] leading-[1.65] text-slate-600">
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         components={{
//           h1: ({ children }) => (
//             <h1 className="mb-[15px] border-b-2 border-blue-600 pb-2 text-[27px] font-black uppercase leading-[1.15] tracking-[-0.025em] text-slate-900">
//               {children}
//             </h1>
//           ),

//           h2: ({ children }) => (
//             <h2 className="mb-2 mt-[21px] border-b border-slate-200 pb-[5px] text-[17px] font-extrabold leading-[1.25] text-slate-800">
//               {children}
//             </h2>
//           ),

//           h3: ({ children }) => (
//             <h3 className="mb-1.5 mt-[15px] text-[11px] font-black uppercase tracking-[0.08em] text-blue-600">
//               {children}
//             </h3>
//           ),

//           h4: ({ children }) => (
//             <h4 className="mb-1 mt-3 text-[11px] font-extrabold text-slate-700">
//               {children}
//             </h4>
//           ),

//           h5: ({ children }) => (
//             <h5 className="mb-1 mt-2.5 text-[10px] font-extrabold text-slate-600">
//               {children}
//             </h5>
//           ),

//           h6: ({ children }) => (
//             <h6 className="mb-1 mt-2.5 text-[10px] font-extrabold text-slate-600">
//               {children}
//             </h6>
//           ),

//           p: ({ children }) => (
//             <p className="mb-[9px]">
//               {children}
//             </p>
//           ),

//           strong: ({ children }) => (
//             <strong className="font-extrabold text-slate-800">
//               {children}
//             </strong>
//           ),

//           em: ({ children }) => (
//             <em className="text-slate-600">
//               {children}
//             </em>
//           ),

//           a: ({ href, children }) => (
//             <a
//               href={href}
//               target="_blank"
//               rel="noreferrer"
//               className="font-bold text-blue-600 underline"
//             >
//               {children}
//             </a>
//           ),

//           ul: ({ children }) => (
//             <ul className="mb-[11px] mt-[7px] list-disc pl-[21px]">
//               {children}
//             </ul>
//           ),

//           ol: ({ children }) => (
//             <ol className="mb-[11px] mt-[7px] list-decimal pl-[21px]">
//               {children}
//             </ol>
//           ),

//           li: ({ children }) => (
//             <li className="mb-1 pl-0.5">
//               {children}
//             </li>
//           ),

//           blockquote: ({ children }) => (
//             <blockquote className="my-3 rounded-r-lg border-l-4 border-blue-600 bg-blue-50 px-[13px] py-2.5 italic text-slate-600">
//               {children}
//             </blockquote>
//           ),

//           img: ({ src, alt }) => (
//             <figure className="my-[15px] text-center">
//               <img
//                 src={src}
//                 alt={
//                   alt || "Proposal image"
//                 }
//                 className="mx-auto block max-h-[260px] max-w-full rounded-[10px] border border-slate-200 object-contain shadow-[0_7px_20px_rgba(15,23,42,0.08)]"
//               />

//               {alt && (
//                 <figcaption className="mt-[5px] text-[8px] text-slate-400">
//                   {alt}
//                 </figcaption>
//               )}
//             </figure>
//           ),

//           table: ({ children }) => (
//             <div className="my-[14px] w-full overflow-hidden rounded-lg border border-slate-200">
//               <table className="w-full border-collapse bg-white text-[10px]">
//                 {children}
//               </table>
//             </div>
//           ),

//           thead: ({ children }) => (
//             <thead className="bg-slate-900 text-white">
//               {children}
//             </thead>
//           ),

//           tbody: ({ children }) => (
//             <tbody>{children}</tbody>
//           ),

//           tr: ({ children }) => (
//             <tr className="even:bg-slate-50">
//               {children}
//             </tr>
//           ),

//           th: ({ children }) => (
//             <th className="border-r border-slate-700 px-2 py-2 text-left text-[9px] font-extrabold">
//               {children}
//             </th>
//           ),

//           td: ({ children }) => (
//             <td className="border-t border-slate-200 px-2 py-2 text-slate-600">
//               {children}
//             </td>
//           ),

//           code: ({
//             inline,
//             className,
//             children,
//           }) => {
//             const language =
//               className
//                 ?.replace(
//                   "language-",
//                   ""
//                 )
//                 .trim() || "";

//             const codeText =
//               String(children).replace(
//                 /\n$/,
//                 ""
//               );

//             // Mermaid
//             if (
//               !inline &&
//               language === "mermaid"
//             ) {
//               return (
//                 <MermaidDiagram
//                   code={codeText}
//                 />
//               );
//             }

//             // Normal code block
//             if (!inline) {
//               return (
//                 <pre className="my-[13px] overflow-hidden whitespace-pre-wrap break-words rounded-[9px] bg-slate-900 p-[13px] font-mono text-[9px] leading-[1.6] text-slate-200">
//                   <code>
//                     {codeText}
//                   </code>
//                 </pre>
//               );
//             }

//             // Inline code
//             return (
//               <code className="rounded border border-blue-100 bg-blue-50 px-[5px] py-0.5 font-mono text-[9px] font-bold text-blue-600">
//                 {children}
//               </code>
//             );
//           },

//           hr: () => (
//             <hr className="my-[18px] h-px border-0 bg-slate-200" />
//           ),
//         }}
//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
// }

// // ======================================================
// // CURVED BLUE DESIGN
// // ======================================================

// function CurvedDesign() {
//   return (
//     <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-[150px] overflow-hidden">
//       <svg
//         viewBox="0 0 210 1123"
//         className="h-full w-[210px]"
//         preserveAspectRatio="none"
//       >
//         {/* Gray curve */}
//         <path
//           d="M20 -20 C130 130 150 300 85 470 C20 640 35 850 115 1140"
//           fill="none"
//           stroke="#cbd5e1"
//           strokeWidth="20"
//           strokeLinecap="round"
//           opacity="0.65"
//         />

//         {/* Blue curve */}
//         <path
//           d="M-10 -30 C115 140 140 300 72 480 C5 655 20 880 100 1145"
//           fill="none"
//           stroke="#2563eb"
//           strokeWidth="28"
//           strokeLinecap="round"
//           opacity="0.9"
//         />
//       </svg>
//     </div>
//   );
// }

// // ======================================================
// // COVER PAGE
// // ======================================================

// function CoverPage({
//   title,
//   subtitle,
//   preparedFor,
//   preparedBy,
// }) {
//   return (
//     <div
//       className="proposal-a4-page relative h-[1123px] w-[794px] overflow-hidden bg-white text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
//       data-pdf-page="true"
//     >
//       <CurvedDesign />

//       <div className="relative z-[2] flex h-full flex-col justify-between px-[65px] pb-[85px] pl-[150px] pt-[55px]">
//         <div className="mt-[10px]">

//           {/* ========================================
//               MARELAB LOGO - COVER
//           ======================================== */}

//           <div className="mb-5 flex items-center">
//             <img
//               src={marelabLogo}
//               alt="Marelab Services"
//               className="h-[44px] w-auto object-contain"
//             />
//           </div>

//           {/* Business Proposal Badge */}

//           <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-[7px] text-[9px] font-black uppercase tracking-[0.14em] text-blue-600">
//             <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

//             Business Proposal
//           </div>

//           {/* Title */}

//           <h1 className="mt-[20px] max-w-[510px] text-[54px] font-black uppercase leading-[1.02] tracking-[-0.04em] text-slate-900">
//             {title}
//           </h1>

//           {/* Blue line */}

//           <div className="mt-5 h-[5px] w-[85px] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />

//           {/* Subtitle */}

//           <p className="mt-5 max-w-[500px] text-[18px] font-semibold leading-7 text-slate-500">
//             {subtitle}
//           </p>

//           {/* ========================================
//               COVER IMAGE / COMPANY CARD
//           ======================================== */}

//           <div className="relative mt-[25px] h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-blue-900 shadow-[0_15px_40px_rgba(15,23,42,0.15)]">

//             {/* Background */}

//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(96,165,250,0.8),transparent_25%),linear-gradient(125deg,transparent_20%,rgba(255,255,255,0.08)_20%,transparent_21%,transparent_65%,rgba(255,255,255,0.08)_65%,transparent_66%)]" />

//             {/* Actual Marelab Logo */}

//             <div className="absolute right-8 top-8 opacity-30">
//               <img
//                 src={marelabLogo}
//                 alt=""
//                 className="h-[48px] w-auto object-contain brightness-0 invert"
//               />
//             </div>

//             {/* Card Text */}

//             <div className="absolute bottom-7 left-[30px] z-[2] flex flex-col gap-[5px] text-white">
//               <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-blue-200">
//                 Professional Proposal
//               </span>

//               <strong className="text-[15px]">
//                 {preparedBy}
//               </strong>
//             </div>
//           </div>

//           {/* ========================================
//               PRESENTED TO / BY
//           ======================================== */}

//           <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">

//             <div className="rounded-[10px] border border-slate-200 bg-slate-50 p-[14px]">
//               <small className="mb-[5px] block text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
//                 Presented To
//               </small>

//               <strong className="text-[13px] text-slate-700">
//                 {preparedFor}
//               </strong>
//             </div>

//             <div className="rounded-[10px] border border-blue-100 bg-blue-50 p-[14px]">
//               <small className="mb-[5px] block text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
//                 Presented By
//               </small>

//               <strong className="text-[13px] text-blue-600">
//                 {preparedBy}
//               </strong>
//             </div>
//           </div>
//         </div>

//         {/* Cover Footer */}

//         <div className="absolute bottom-0 left-[150px] right-[62px] flex h-12 items-center justify-between border-t border-slate-200 bg-white/95 text-[8px] font-extrabold uppercase tracking-[0.08em] text-slate-400">

//           <div className="flex items-center gap-[7px]">
//             <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

//             {preparedBy}
//           </div>

//           <span>PAGE 01</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ======================================================
// // CONTENT PAGE
// // ======================================================

// function ContentPage({
//   content,
//   pageNumber,
//   companyName,
// }) {
//   return (
//     <div
//       className="proposal-a4-page relative h-[1123px] w-[794px] overflow-hidden bg-white text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
//       data-pdf-page="true"
//     >
//       <CurvedDesign />

//       <div className="relative z-[2] h-full px-[62px] pb-20 pl-[150px] pt-12">

//         {/* ==========================================
//             CONTENT PAGE HEADER
//         ========================================== */}

//         <div className="mb-[18px] flex h-[48px] items-center justify-between border-b border-slate-200">

//           {/* Marelab Logo */}

//           <div className="flex items-center">
//             <img
//               src={marelabLogo}
//               alt="Marelab Services"
//               className="h-[34px] w-auto object-contain"
//             />
//           </div>

//           {/* Page */}

//           <div className="font-mono text-[9px] font-black text-slate-400">
//             PAGE{" "}
//             {String(pageNumber).padStart(
//               2,
//               "0"
//             )}
//           </div>
//         </div>

//         {/* ==========================================
//             CONTENT
//         ========================================== */}

//         <main className="proposal-markdown">
//           <MarkdownContent
//             content={content}
//           />
//         </main>

//         {/* ==========================================
//             FOOTER
//         ========================================== */}

//         <div className="absolute bottom-0 left-[150px] right-[62px] z-10 flex h-12 items-center justify-between border-t border-slate-200 bg-white/95 text-[8px] font-extrabold uppercase tracking-[0.08em] text-slate-400">

//           <div className="flex items-center gap-[7px]">
//             <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

//             {companyName}
//           </div>

//           <div>
//             PAGE{" "}
//             {String(pageNumber).padStart(
//               2,
//               "0"
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ======================================================
// // MAIN PREVIEW
// // ======================================================

// function ProposalPreview({
//   markdown,
//   companyName = "Your Company",
//   TemplateComponent,
// }) {
//   const [zoom, setZoom] = useState(0.72);

//   const downloadRef = useRef(null);

//   // ====================================================
//   // FINAL MARKDOWN
//   // ====================================================

//   const finalMarkdown = useMemo(
//     () =>
//       replaceCompanyName(
//         markdown || "",
//         companyName
//       ),
//     [markdown, companyName]
//   );

//   // ====================================================
//   // COVER DATA
//   // ====================================================

//   const coverData = useMemo(
//     () =>
//       getCoverData(
//         markdown || "",
//         companyName
//       ),
//     [markdown, companyName]
//   );

//   // ====================================================
//   // PAGES
//   // ====================================================

//   const pages = useMemo(
//     () =>
//       splitManualPages(
//         finalMarkdown
//       ),
//     [finalMarkdown]
//   );

//   const contentPages =
//     pages.length > 1
//       ? pages.slice(1)
//       : [];

//   const totalPages =
//     contentPages.length + 1;

//   // ====================================================
//   // ZOOM
//   // ====================================================

//   const decreaseZoom = () => {
//     setZoom((value) =>
//       Math.max(
//         0.45,
//         Number(
//           (value - 0.05).toFixed(2)
//         )
//       )
//     );
//   };

//   const increaseZoom = () => {
//     setZoom((value) =>
//       Math.min(
//         1.2,
//         Number(
//           (value + 0.05).toFixed(2)
//         )
//       )
//     );
//   };

//   // ====================================================
//   // DOWNLOAD PDF
//   // ====================================================

//   const handleDownload = async () => {
//     if (!downloadRef.current) {
//       alert(
//         "Proposal pages not found."
//       );
//       return;
//     }

//     const pages =
//       downloadRef.current.querySelectorAll(
//         ".proposal-a4-page"
//       );

//     if (!pages.length) {
//       alert(
//         "Proposal pages not found."
//       );
//       return;
//     }

//     try {
//       // ------
//       // Create PDF
//       // -----------------------------------------------

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//         compress: true,
//       });

//       // -----------------------------------------------
//       // Capture each A4 page separately
//       // This prevents black/blank pages.
//       // -----------------------------------------------

//       for (
//         let i = 0;
//         i < pages.length;
//         i++
//       ) {
//         const originalPage =
//           pages[i];

//         // ---------------------------------------------
//         // Temporary container
//         // ---------------------------------------------

//         const tempContainer =
//           document.createElement("div");

//         tempContainer.style.position =
//           "fixed";

//         tempContainer.style.left =
//           "-10000px";

//         tempContainer.style.top = "0";

//         tempContainer.style.width =
//           "794px";

//         tempContainer.style.height =
//           "1123px";

//         tempContainer.style.background =
//           "#ffffff";

//         tempContainer.style.overflow =
//           "hidden";

//         tempContainer.style.zIndex =
//           "-99999";

//         // ---------------------------------------------
//         // Clone page
//         // ---------------------------------------------

//         const clonedPage =
//           originalPage.cloneNode(
//             true
//           );

//         clonedPage.style.width =
//           "794px";

//         clonedPage.style.height =
//           "1123px";

//         clonedPage.style.minHeight =
//           "1123px";

//         clonedPage.style.maxHeight =
//           "1123px";

//         clonedPage.style.transform =
//           "none";

//         clonedPage.style.transformOrigin =
//           "top left";

//         clonedPage.style.position =
//           "relative";

//         clonedPage.style.left = "0";

//         clonedPage.style.top = "0";

//         clonedPage.style.margin = "0";

//         clonedPage.style.boxShadow =
//           "none";

//         clonedPage.style.background =
//           "#ffffff";

//         clonedPage.style.overflow =
//           "hidden";

//         clonedPage.style.animation =
//           "none";

//         clonedPage.style.transition =
//           "none";

//         tempContainer.appendChild(
//           clonedPage
//         );

//         document.body.appendChild(
//           tempContainer
//         );

//         // ---------------------------------------------
//         // Wait for browser
//         // ---------------------------------------------

//         await new Promise(
//           (resolve) =>
//             setTimeout(resolve, 200)
//         );

//         // ---------------------------------------------
//         // Capture
//         // ---------------------------------------------

//         const canvas =
//           await html2canvas(
//             clonedPage,
//             {
//               width: 794,
//               height: 1123,

//               windowWidth: 794,
//               windowHeight: 1123,

//               scale: 2,

//               backgroundColor:
//                 "#ffffff",

//               useCORS: true,

//               allowTaint: true,

//               imageTimeout: 15000,

//               logging: false,

//               scrollX: 0,

//               scrollY: 0,
//             }
//           );

//         // ---------------------------------------------
//         // Remove temporary container
//         // ---------------------------------------------

//         document.body.removeChild(
//           tempContainer
//         );

//         // ---------------------------------------------
//         // Canvas image
//         // ---------------------------------------------

//         const image =
//           canvas.toDataURL(
//             "image/jpeg",
//             0.95
//           );

//         // ---------------------------------------------
//         // Add PDF page
//         // ---------------------------------------------

//         if (i > 0) {
//           pdf.addPage();
//         }

//         pdf.addImage(
//           image,
//           "JPEG",
//           0,
//           0,
//           210,
//           297,
//           undefined,
//           "FAST"
//         );
//       }

//       // -----------------------------------------------
//       // Download
//       // -----------------------------------------------

//       pdf.save(
//         "business-proposal.pdf"
//       );
//     } catch (error) {
//       console.error(
//         "PDF Download Error:",
//         error
//       );

//       alert(
//         "PDF download failed. Please check the browser console."
//       );
//     }
//   };

//   // ====================================================
//   // RETURN
//   // ====================================================

//   return (
//   <div className="proposal-preview">

//     {/* Preview Controls */}
//     <div className="proposal-controls">

//       <div className="proposal-page-count">
//         <strong>{totalPages}</strong> pages
//       </div>

//       <div className="proposal-divider" />

//       <div className="proposal-zoom-controls">

//         <button
//           type="button"
//           onClick={decreaseZoom}
//         >
//           −
//         </button>

//         <span>
//           {Math.round(zoom * 100)}%
//         </span>

//         <button
//           type="button"
//           onClick={increaseZoom}
//         >
//           +
//         </button>

//       </div>

//       <button
//         type="button"
//         onClick={() => setZoom(0.72)}
//         className="proposal-reset"
//       >
//         Reset
//       </button>

//       <button
//         type="button"
//         onClick={handleDownload}
//         className="proposal-download"
//       >
//         Download PDF
//       </button>

//     </div>

//     {/* Document */}
//     <div className="proposal-document-wrapper">

//       <div
//         ref={downloadRef}
//         className="proposal-document"
//         style={{
//           transform: `scale(${zoom})`,
//           marginBottom: `${1123 * (zoom - 1)}px`,
//         }}
//       >

//         {TemplateComponent ? (
//           <TemplateComponent>
//             <MarkdownContent
//               content={finalMarkdown}
//             />
//           </TemplateComponent>
//         ) : (
//           <>
//             <CoverPage
//               title={coverData.title}
//               subtitle={coverData.subtitle}
//               preparedFor={coverData.preparedFor}
//               preparedBy={coverData.preparedBy}
//             />

//             {contentPages.map(
//               (pageContent, index) => (
//                 <ContentPage
//                   key={`content-page-${index}`}
//                   content={pageContent}
//                   pageNumber={index + 2}
//                   companyName={
//                     companyName || "Your Company"
//                   }
//                 />
//               )
//             )}

//             {contentPages.length === 0 && (
//               <ContentPage
//                 content={`## Start Your Proposal

// Add your proposal content in the editor.

// ### Tip

// Use **+ Topic** to add a new section and **+ Page Break** to create a new A4 page.`}
//                 pageNumber={2}
//                 companyName={
//                   companyName || "Your Company"
//                 }
//               />
//             )}
//           </>
//         )}

//       </div>

//     </div>

//   </div>
// );
// }

// export default ProposalPreview;

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

/* =========================================================
   A4 PAGE SETTINGS
========================================================= */

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

/*
  We use a safe content height.

  This is intentionally conservative because different
  templates have different header/footer sizes.
*/
const MAX_CONTENT_HEIGHT = 790;

/* =========================================================
   MERMAID
========================================================= */

function MermaidDiagram({ code }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (!code?.trim()) {
        setSvg("");
        return;
      }

      try {
        setError("");

        const id =
          `mermaid-${Date.now()}-` +
          Math.random().toString(36).slice(2);

        const result = await mermaid.render(id, code);

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);

        if (!cancelled) {
          setError(
            "Unable to render Mermaid diagram. Please check the Mermaid syntax."
          );
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <div className="my-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-5 rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-400">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      className="my-5 flex justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/* =========================================================
   MARKDOWN CONTENT
========================================================= */

function MarkdownContent({ content = "" }) {
  const safeContent =
    typeof content === "string"
      ? content
      : String(content ?? "");

  return (
    <div className="proposal-markdown max-w-none break-words text-[15px] leading-7 text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) => {
          if (!url) return "";

          if (url.startsWith("data:image/")) {
            return url;
          }

          if (
            url.startsWith("/") ||
            url.startsWith("http://") ||
            url.startsWith("https://")
          ) {
            return url;
          }

          return "";
        }}
        components={{
          /* =================================================
             IMAGE
          ================================================= */

          img: ({ src, alt, title }) => {
            if (!src) return null;

            return (
              <div className="my-5 flex w-full justify-center">
                <img
                  src={src}
                  alt={alt || "Proposal image"}
                  title={title || ""}
                  className="block max-h-[360px] max-w-full rounded-xl object-contain shadow-sm"
                />
              </div>
            );
          },

          /* =================================================
             HEADINGS
          ================================================= */

          h1: ({ children }) => (
            <h1 className="mb-4 mt-2 text-3xl font-bold leading-tight text-slate-900">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-2xl font-bold leading-tight text-slate-900">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-xl font-semibold text-slate-900">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mb-2 mt-4 text-lg font-semibold text-slate-900">
              {children}
            </h4>
          ),

          /* =================================================
             PARAGRAPH
          ================================================= */

          p: ({ children }) => (
            <p className="mb-3 leading-7 text-slate-700">
              {children}
            </p>
          ),

          /* =================================================
             LIST
          ================================================= */

          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1 pl-6">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1 pl-6">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-7">
              {children}
            </li>
          ),

          /* =================================================
             LINK
          ================================================= */

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {children}
            </a>
          ),

          /* =================================================
             TEXT
          ================================================= */

          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic">
              {children}
            </em>
          ),

          /* =================================================
             HR
          ================================================= */

          hr: () => (
            <hr className="my-6 border-slate-300" />
          ),

          /* =================================================
             BLOCKQUOTE
          ================================================= */

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-blue-500 bg-slate-50 px-5 py-3 italic text-slate-600">
              {children}
            </blockquote>
          ),

          /* =================================================
             TABLE
          ================================================= */

          table: ({ children }) => (
            <div className="my-4 w-full overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-slate-100">
              {children}
            </thead>
          ),

          tbody: ({ children }) => (
            <tbody>{children}</tbody>
          ),

          tr: ({ children }) => (
            <tr className="even:bg-slate-50">
              {children}
            </tr>
          ),

          th: ({ children }) => (
            <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-900">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-slate-200 px-3 py-2">
              {children}
            </td>
          ),

          /* =================================================
             PRE / CODE
          ================================================= */

          pre: ({ children }) => {
            const child =
              React.Children.toArray(children)[0];

            if (
              React.isValidElement(child) &&
              child.type === "code"
            ) {
              const className =
                child.props?.className || "";

              const match =
                /language-(\w+)/.exec(className);

              const language =
                match?.[1] || "";

              if (language === "mermaid") {
                const codeText = String(
                  child.props?.children ?? ""
                ).replace(/\n$/, "");

                return (
                  <MermaidDiagram
                    code={codeText}
                  />
                );
              }
            }

            return (
              <pre className="my-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-900 p-4 text-sm leading-6 text-white">
                {children}
              </pre>
            );
          },

          code: ({
            className,
            children,
            ...props
          }) => {
            const safeChildren = String(
              children ?? ""
            );

            const isInline =
              !className ||
              !className.includes("language-");

            if (isInline) {
              return (
                <code
                  className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-blue-700"
                  {...props}
                >
                  {safeChildren}
                </code>
              );
            }

            return (
              <code
                className={className}
                {...props}
              >
                {safeChildren}
              </code>
            );
          },
        }}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  );
}

/* =========================================================
   SPLIT MARKDOWN BLOCKS
========================================================= */

function splitMarkdownBlocks(markdown) {
  if (!markdown?.trim()) {
    return [];
  }

  /*
    Split ONLY on a line containing ---
  */
  const sections = markdown
    .split(/\n\s*---\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  const blocks = [];

  sections.forEach((section, sectionIndex) => {
    const lines = section.split("\n");

    let currentBlock = [];
    let insideCodeBlock = false;

    lines.forEach((line) => {
      const isCodeFence =
        line.trim().startsWith("```");

      if (isCodeFence) {
        currentBlock.push(line);
        insideCodeBlock = !insideCodeBlock;
        return;
      }

      if (insideCodeBlock) {
        currentBlock.push(line);
        return;
      }

      if (line.trim() === "") {
        if (currentBlock.length > 0) {
          blocks.push({
            content: currentBlock
              .join("\n")
              .trim(),
            forceBreak: false,
          });

          currentBlock = [];
        }
      } else {
        currentBlock.push(line);
      }
    });

    if (currentBlock.length > 0) {
      blocks.push({
        content: currentBlock
          .join("\n")
          .trim(),
        forceBreak: false,
      });
    }

    /*
      The LAST block of this section must cause
      the NEXT section to start on a new page.
    */
    if (
      sectionIndex <
        sections.length - 1 &&
      blocks.length > 0
    ) {
      blocks[blocks.length - 1].forceBreak =
        true;
    }
  });

  return blocks.filter(
    (block) => block.content
  );
}

/* =========================================================
   CREATE PAGES
========================================================= */

function createPagesFromBlocks(
  blocks,
  heights,
  maxHeight
) {
  const pages = [];

  let currentPage = [];
  let currentHeight = 0;

  blocks.forEach((block, index) => {
    const blockHeight =
      heights[index] || 0;

    /*
      If adding this block would exceed
      available content space, start a new page.
    */
    if (
      currentPage.length > 0 &&
      currentHeight + blockHeight >
        maxHeight
    ) {
      pages.push(
        currentPage
          .map((item) => item.content)
          .join("\n\n")
      );

      currentPage = [];
      currentHeight = 0;
    }

    /*
      Add block.
    */
    currentPage.push(block);
    currentHeight += blockHeight;

    /*
      Manual --- page break.

      IMPORTANT:
      The block stays on the current page.
      The NEXT block starts on a new page.
    */
    if (block.forceBreak) {
      pages.push(
        currentPage
          .map((item) => item.content)
          .join("\n\n")
      );

      currentPage = [];
      currentHeight = 0;
    }
  });

  if (currentPage.length > 0) {
    pages.push(
      currentPage
        .map((item) => item.content)
        .join("\n\n")
    );
  }

  return pages;
}

/* =========================================================
   COVER DATA
========================================================= */

function getCoverData(
  markdown,
  companyName
) {
  const lines = (markdown || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let title = "Business Proposal";

  const heading = lines.find((line) =>
    /^#\s+/.test(line)
  );

  if (heading) {
    title = heading
      .replace(/^#\s+/, "")
      .trim();
  }

  return {
    title,
    companyName:
      companyName?.trim() || "Marelab",
    subtitle:
      "Professional Business Proposal",
  };
}

/* =========================================================
   COVER
========================================================= */

function CoverContent({ data }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
        {data.companyName}
      </p>

      <h1 className="max-w-[650px] text-5xl font-bold leading-tight text-slate-900">
        {data.title}
      </h1>

      <p className="mt-6 text-lg text-slate-500">
        {data.subtitle}
      </p>

      <div className="mt-10 h-1 w-24 rounded-full bg-blue-600" />
    </div>
  );
}

/* =========================================================
   WAIT FOR IMAGES
========================================================= */

function waitForImages(container) {
  const images = Array.from(
    container.querySelectorAll("img")
  );

  if (!images.length) {
    return Promise.resolve();
  }

  return Promise.all(
    images.map((img) => {
      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function ProposalPreview({
  markdown = "",
  companyName = "Marelab",
  TemplateComponent,
}) {
  const [isDownloading, setIsDownloading] =
    useState(false);

  const [automaticPages, setAutomaticPages] =
    useState([]);

  const [previewScale, setPreviewScale] =
    useState(1);

  const proposalPagesRef =
    useRef(null);

  const previewViewportRef =
    useRef(null);

  const measurementRef =
    useRef(null);

  /* =======================================================
     BLOCKS
  ======================================================= */

  const blocks = useMemo(
    () =>
      splitMarkdownBlocks(markdown),
    [markdown]
  );

  /* =======================================================
     COVER
  ======================================================= */

  const coverData = useMemo(
    () =>
      getCoverData(
        markdown,
        companyName
      ),
    [markdown, companyName]
  );

  /* =======================================================
     RESPONSIVE SCALE
  ======================================================= */

  useEffect(() => {
    const viewport =
      previewViewportRef.current;

    if (!viewport) return;

    const updateScale = () => {
      const availableWidth =
        viewport.clientWidth - 32;

      if (availableWidth <= 0) return;

      const scale =
        availableWidth / PAGE_WIDTH;

      setPreviewScale(
        Math.min(
          1,
          Math.max(0.35, scale)
        )
      );
    };

    updateScale();

    const observer =
      new ResizeObserver(updateScale);

    observer.observe(viewport);

    window.addEventListener(
      "resize",
      updateScale
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        updateScale
      );
    };
  }, []);

  /* =======================================================
     AUTOMATIC PAGINATION
  ======================================================= */

  useEffect(() => {
    if (!blocks.length) {
      setAutomaticPages([]);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(() => {
      const elements =
        measurementRef.current?.querySelectorAll(
          ".markdown-measure-block"
        ) || [];

      const heights = Array.from(
        elements
      ).map(
        (element) =>
          element.getBoundingClientRect()
            .height
      );

      const newPages =
        createPagesFromBlocks(
          blocks,
          heights,
          MAX_CONTENT_HEIGHT
        );

      if (!cancelled) {
        setAutomaticPages(
          newPages
        );
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [blocks]);

  /* =======================================================
     TEMPLATE CHECK
  ======================================================= */

  if (
    typeof TemplateComponent !==
    "function"
  ) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-2xl bg-white p-10">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">
            Template Component Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please check templateData.js
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     CONTENT PAGES
  ======================================================= */

  const contentPages =
    automaticPages.length > 0
      ? automaticPages
      : [""];

  const totalPages =
    contentPages.length + 1;

  /* =======================================================
     PDF DOWNLOAD
  ======================================================= */

  const handleDownloadPDF =
    async () => {
      if (isDownloading) return;

      try {
        setIsDownloading(true);

        const container =
          proposalPagesRef.current;

        if (!container) {
          throw new Error(
            "Proposal pages container not found."
          );
        }

        const pageElements =
          Array.from(
            container.querySelectorAll(
              '[data-proposal-page="true"]'
            )
          );

        if (!pageElements.length) {
          throw new Error(
            "No proposal pages found."
          );
        }

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
        });

        for (
          let index = 0;
          index < pageElements.length;
          index++
        ) {
          const page =
            pageElements[index];

          /*
            Save original styles.
          */

          const originalTransform =
            page.style.transform;

          const originalTransformOrigin =
            page.style.transformOrigin;

          const originalWidth =
            page.style.width;

          const originalHeight =
            page.style.height;

          /*
            Remove responsive scaling.
          */

          page.style.transform = "none";
          page.style.transformOrigin =
            "top left";

          page.style.width =
            `${PAGE_WIDTH}px`;

          page.style.height =
            `${PAGE_HEIGHT}px`;

          /*
            Allow browser to finish layout.
          */

          await new Promise((resolve) =>
            requestAnimationFrame(() =>
              requestAnimationFrame(resolve)
            )
          );

          await waitForImages(page);

          /*
            Capture exact A4 CSS page.
          */

          const canvas =
            await html2canvas(
              page,
              {
                width: PAGE_WIDTH,
                height: PAGE_HEIGHT,

                windowWidth:
                  PAGE_WIDTH,

                windowHeight:
                  PAGE_HEIGHT,

                scale: 2,

                useCORS: true,
                allowTaint: false,

                backgroundColor:
                  "#ffffff",

                logging: false,

                scrollX: 0,
                scrollY: 0,
              }
            );

          const imageData =
            canvas.toDataURL(
              "image/png"
            );

          if (index > 0) {
            pdf.addPage(
              "a4",
              "portrait"
            );
          }

          /*
            A4 = exactly 210 x 297 mm.
          */

          pdf.addImage(
            imageData,
            "PNG",
            0,
            0,
            210,
            297,
            undefined,
            "FAST"
          );

          /*
            Restore responsive preview.
          */

          page.style.transform =
            originalTransform;

          page.style.transformOrigin =
            originalTransformOrigin;

          page.style.width =
            originalWidth;

          page.style.height =
            originalHeight;
        }

        pdf.save(
          "business-proposal.pdf"
        );
      } catch (error) {
        console.error(
          "PDF download error:",
          error
        );

        alert(
          "PDF download failed. Please check the browser console."
        );
      } finally {
        setIsDownloading(false);
      }
    };

  /* =======================================================
     PAGE
  ======================================================= */

  const renderPage = (
    pageContent,
    pageNumber,
    isCover = false
  ) => {
    const scaledWidth =
      PAGE_WIDTH * previewScale;

    const scaledHeight =
      PAGE_HEIGHT * previewScale;

    return (
      <div
        key={`page-${pageNumber}`}
        className="relative shrink-0"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          data-proposal-page="true"
          data-page-number={pageNumber}
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${PAGE_WIDTH}px`,
            height: `${PAGE_HEIGHT}px`,
            transform: `scale(${previewScale})`,
          }}
        >
          <TemplateComponent
            pageNumber={pageNumber}
            totalPages={totalPages}
            isCover={isCover}
          >
            {isCover ? (
              <CoverContent
                data={coverData}
              />
            ) : (
              <div className="w-full">
                {pageContent ? (
                  <MarkdownContent
                    content={pageContent}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-slate-400">
                      Start typing your proposal
                      content in the editor.
                    </p>
                  </div>
                )}
              </div>
            )}
          </TemplateComponent>
        </div>
      </div>
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      {/* HEADER */}

      <div className="mb-4 flex w-full shrink-0 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Proposal Preview
          </h2>

          <p className="text-xs text-slate-500">
            {totalPages} page
            {totalPages !== 1
              ? "s"
              : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={
            handleDownloadPDF
          }
          disabled={isDownloading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDownloading
            ? "Generating PDF..."
            : "Download PDF"}
        </button>
      </div>

      {/* ===================================================
          HIDDEN MEASUREMENT AREA
      =================================================== */}

      <div
        ref={measurementRef}
        className="pointer-events-none fixed left-[-99999px] top-0"
        style={{
          width: `${PAGE_WIDTH - 112}px`,
        }}
      >
        {blocks.map(
          (block, index) => (
            <div
              key={index}
              className="markdown-measure-block"
            >
              <MarkdownContent
                content={block.content}
              />
            </div>
          )
        )}
      </div>

      {/* ===================================================
          PREVIEW
      =================================================== */}

      <div
        ref={previewViewportRef}
        className="min-h-0 w-full flex-1 overflow-auto rounded-xl border border-slate-200 bg-slate-200 p-4"
      >
        <div
          ref={proposalPagesRef}
          className="flex w-full flex-col items-center gap-6"
        >
          {/* COVER */}

          {renderPage(
            "",
            1,
            true
          )}

          {/* CONTENT */}

          {contentPages.map(
            (
              pageContent,
              index
            ) =>
              renderPage(
                pageContent,
                index + 2,
                false
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProposalPreview;