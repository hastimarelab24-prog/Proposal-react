// import React, {
//   useEffect,
//   useRef,
// } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import mermaid from "mermaid";

// mermaid.initialize({
//   startOnLoad: false,
//   theme: "neutral",
//   securityLevel: "loose",
// });

// function MermaidDiagram({ code }) {
//   const ref = useRef(null);

//   useEffect(() => {
//     let cancelled = false;

//     const renderDiagram = async () => {
//       if (!ref.current || !code) {
//         return;
//       }

//       const id = `mermaid-${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2)}`;

//       try {
//         const result = await mermaid.render(id, code);

//         if (!cancelled && ref.current) {
//           ref.current.innerHTML = result.svg;
//         }
//       } catch (error) {
//         console.error("Mermaid Render Error:", error);

//         if (!cancelled && ref.current) {
//           ref.current.innerHTML = "";

//           const pre = document.createElement("pre");
//           pre.className = "mermaid-error";
//           pre.textContent = `Mermaid error:\n\n${code}`;

//           ref.current.appendChild(pre);
//         }
//       }
//     };

//     renderDiagram();

//     return () => {
//       cancelled = true;
//     };
//   }, [code]);

//   return (
//     <div
//       ref={ref}
//       className="mermaid-diagram"
//     />
//   );
// }

// function ProposalPage({
//   pageNumber,
//   content,
//   type = "content",
// }) {
//   const isCover = type === "cover";

//   const coverData =
//     typeof content === "object"
//       ? content
//       : {};

//   const markdownContent =
//     typeof content === "string"
//       ? content
//       : "";

//   return (
//    <div>
//       {/* COVER */}
//       {isCover ? (
//         <div className="proposal-cover">
//           <div className="cover-top">
//             <div className="cover-badge">
//               <span />
//               {coverData.subtitle || "BUSINESS PROPOSAL"}
//             </div>
//             <h1>
//               {coverData.title || "BUSINESS PROPOSAL"}
//             </h1>
//             <div className="cover-line" />
//           </div>
//           <div className="cover-hero">
//             <div className="cover-hero-content">
//               <span>CORPORATE EXCELLENCE</span>
//               <strong>
//                 Strategic Partnership Proposal
//               </strong>
//             </div>
//           </div>
//           <div className="cover-details">
//             <div>
//               <small>PRESENTED TO</small>
//               <strong>
//                 {coverData.presentedTo || "Your Client"}
//               </strong>
//             </div>
//             <div>
//               <small>PRESENTED BY</small>
//               <strong>
//                 {coverData.presentedBy || "Your Company"}
//               </strong>
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* CONTENT PAGE */
//         <div className="proposal-content-page">
//           <div className="content-header">
//             <div className="content-brand">
//               YOUR COMPANY
//             </div>
//             <div className="content-page-number">
//               {String(pageNumber).padStart(2, "0")}
//             </div>
//           </div>
//           <div className="proposal-markdown">
//             <ReactMarkdown
//               remarkPlugins={[remarkGfm]}
//               components={{
//                 h1: ({ children }) => (
//                   <h1>{children}</h1>
//                 ),
//                 h2: ({ children }) => (
//                   <h2>{children}</h2>
//                 ),
//                 h3: ({ children }) => (
//                   <h3>{children}</h3>
//                 ),
//                 h4: ({ children }) => (
//                   <h4>{children}</h4>
//                 ),
//                 h5: ({ children }) => (
//                   <h5>{children}</h5>
//                 ),
//                 h6: ({ children }) => (
//                   <h6>{children}</h6>
//                 ),
//                 p: ({ children }) => (
//                   <p>{children}</p>
//                 ),
//                 ul: ({ children }) => (
//                   <ul>{children}</ul>
//                 ),
//                 ol: ({ children }) => (
//                   <ol>{children}</ol>
//                 ),
//                 li: ({ children }) => (
//                   <li>{children}</li>
//                 ),
//                 blockquote: ({ children }) => (
//                   <blockquote>
//                     {children}
//                   </blockquote>
//                 ),
//                 a: ({ href, children }) => (
//                   <a
//                     href={href}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     {children}
//                   </a>
//                 ),
//                 img: ({ src, alt }) => (
//                   <figure className="proposal-image">
//                     <img
//                       src={src}
//                       alt={alt || "Proposal image"}
//                     />
//                     {alt && (
//                       <figcaption>
//                         {alt}
//                       </figcaption>
//                     )}
//                   </figure>
//                 ),
//                 table: ({ children }) => (
//                   <div className="proposal-table-wrapper">
//                     <table>{children}</table>
//                   </div>
//                 ),
//                 thead: ({ children }) => (
//                   <thead>{children}</thead>
//                 ),
//                 tbody: ({ children }) => (
//                   <tbody>{children}</tbody>
//                 ),
//                 tr: ({ children }) => (
//                   <tr>{children}</tr>
//                 ),
//                 th: ({ children }) => (
//                   <th>{children}</th>
//                 ),
//                 td: ({ children }) => (
//                   <td>{children}</td>
//                 ),
//                 hr: () => <hr />,
//                 code: ({
//                   children,
//                   className,
//                 }) => {
//                   const match =
//                     /language-(\w+)/.exec(
//                       className || ""
//                     );

//                   const language = match?.[1];

//                   const code =
//                     String(children).replace(
//                       /\n$/,
//                       ""
//                     );

//                   if (language === "mermaid") {
//                     return (
//                       <MermaidDiagram
//                         code={code}
//                       />
//                     );
//                   }

//                   return (
//                     <pre className="proposal-code-block">
//                       <code>{children}</code>
//                     </pre>
//                   );
//                 },
//                 pre: ({ children }) => {
//                   return <>{children}</>;
//                 },
//               }}
//             >
//               {markdownContent}
//             </ReactMarkdown>
//           </div>
//         </div>
//       )}
//       {/* FOOTER */}
//       <footer className="proposal-footer">
//         <div>
//           <span className="footer-dot" />
//           <strong>PROPOSAL STUDIO</strong>
//         </div>
//         <span>
//           PAGE {String(pageNumber).padStart(2, "0")}
//         </span>
//       </footer>
//     </div>
//   );
// }

// export default ProposalPage;


import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";
import marelabLogo from "../assets/marelablogo.webp";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose",
});

function MermaidDiagram({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      if (!ref.current || !code) return;

      const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      try {
        const result = await mermaid.render(id, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = result.svg;
        }
      } catch (error) {
        console.error("Mermaid Render Error:", error);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = "";
          const pre = document.createElement("pre");
          pre.className = "mermaid-error";
          pre.textContent = `Mermaid error:\n\n${code}`;
          ref.current.appendChild(pre);
        }
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [code]);

  return <div ref={ref} className="mermaid-diagram overflow-x-auto my-4" />;
}

function MarkdownContent({ content }) {
  return (
    <div className="proposal-markdown break-words text-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-2 mt-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-3">{children}</h3>,
          p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-3 bg-slate-50 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {children}
            </a>
          ),
          /* IMAGE HANDLING FIX */
          img: ({ src, alt }) => (
            <figure className="proposal-image my-4 flex flex-col items-center justify-center">
              <img
                src={src}
                alt={alt || "Proposal image"}
                className="max-w-full max-h-[350px] object-contain rounded-lg border border-slate-200 shadow-sm"
              />
              {alt && <figcaption className="text-xs text-slate-500 mt-1 italic">{alt}</figcaption>}
            </figure>
          ),
          table: ({ children }) => (
            <div className="proposal-table-wrapper my-4 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-left text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => <th className="border border-slate-300 bg-slate-100 p-2 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-slate-300 p-2">{children}</td>,
          code: ({ children, className }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1];
            const codeText = String(children).replace(/\n$/, "");

            if (language === "mermaid") {
              return <MermaidDiagram code={codeText} />;
            }

            return (
              <pre className="proposal-code-block bg-slate-900 text-slate-100 p-3 rounded-md overflow-x-auto my-3 text-xs font-mono">
                <code>{codeText}</code>
              </pre>
            );
          },
          pre: ({ children }) => <>{children}</>,
          hr: () => <hr className="my-6 border-t-2 border-slate-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function ProposalPage({
  pageNumber,
  content,
  TemplateComponent,
  companyName = "Marelab Services",
}) {
  return (
    <div className="proposal-template-page min-h-[842px] flex flex-col justify-between bg-white p-8 border border-slate-200 shadow-md my-4">
      <TemplateComponent>
        {/* TEMPLATE HEADER */}
        <div className="template-logo mb-6">
          <img src={marelabLogo} alt="Marelab Services" className="h-10 object-contain" />
        </div>

        {/* CONTENT (With Flex-1 to prevent bottom content text hiding) */}
        <div className="template-content-area flex-1 overflow-y-auto max-h-[650px] pb-6">
          <MarkdownContent content={content} />
        </div>

        {/* FOOTER */}
        <div className="template-footer flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500 mt-auto">
          <div className="flex items-center gap-2">
            <span className="footer-dot w-2 h-2 rounded-full bg-blue-600 inline-block" />
            <strong>{companyName}</strong>
          </div>
          <span>PAGE {String(pageNumber).padStart(2, "0")}</span>
        </div>
      </TemplateComponent>
    </div>
  );
}

export default ProposalPage;