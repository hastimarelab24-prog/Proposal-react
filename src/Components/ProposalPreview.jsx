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

/* 
   A4 PAGE SETTINGS
 */

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

/*
  We use a safe content height.

  This is intentionally conservative because different
  templates have different header/footer sizes.
*/
const MAX_CONTENT_HEIGHT = 790;

/* MERMAID */

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
          `mermaid-${Date.now()}-` + Math.random().toString(36).slice(2);

        const result = await mermaid.render(id, code);

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);

        if (!cancelled) {
          setError(
            "Unable to render Mermaid diagram. Please check the Mermaid syntax.",
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
      className="my-5 flex justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/* MARKDOWN CONTENT */

function MarkdownContent({ content = "" }) {
  const safeContent =
    typeof content === "string" ? content : String(content ?? "");

  return (
    <div className="proposal-markdown max-w-none break-words text-[14px] leading-7 text-slate-700 sm:text-[15px] sm:leading-7">
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
          //  IMAGE
          img: ({ src, alt, title }) => {
            if (!src) return null;

            return (
              <div className="my-5 flex w-full justify-center">
                <img
                  src={src}
                  alt={alt || "Proposal image"}
                  title={title || ""}
                  className="block max-h-[360px] max-w-full rounded-xl object-contain shadow-sm sm:max-h-[360px]"
                />
              </div>
            );
          },

          /*   HEADINGS */

          h1: ({ children }) => (
            <h1 className="mb-4 mt-2 text-3xl font-bold leading-tight text-slate-900 sm:mb-4 sm:text-3xl">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-2xl font-bold leading-tight text-slate-900 sm:mb-3 sm:mt-6 sm:text-2xl">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-xl font-semibold text-slate-900 sm:mt-5 sm:text-xl">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mb-2 mt-4 text-lg font-semibold text-slate-900 sm:mt-4 sm:text-lg">
              {children}
            </h4>
          ),

          /*   PARAGRAPH */

          p: ({ children }) => (
            <p className="mb-3 leading-7 text-slate-700 sm:leading-7">{children}</p>
          ),

          /*   LIST*/

          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1 pl-5 sm:pl-6">{children}</ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1 pl-5 sm:pl-6">{children}</ol>
          ),

          li: ({ children }) => <li className="leading-6 sm:leading-7">{children}</li>,

          /*  LINK */

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

          /*  TEXT */

          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">{children}</strong>
          ),

          em: ({ children }) => <em className="italic">{children}</em>,

          /*  HR */

          hr: () => <hr className="my-6 border-slate-300 sm:my-6" />,

          /*    BLOCKQUOTE  */

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-blue-500 bg-slate-50 px-5 py-3 italic text-slate-600 sm:px-5">
              {children}
            </blockquote>
          ),

          /* TABLE*/

          table: ({ children }) => (
            <div className="my-4 w-full overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-slate-100">{children}</thead>
          ),

          tbody: ({ children }) => <tbody>{children}</tbody>,

          tr: ({ children }) => (
            <tr className="even:bg-slate-50">{children}</tr>
          ),

          th: ({ children }) => (
            <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-900 sm:px-3">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-slate-200 px-3 py-2 sm:px-3">{children}</td>
          ),

          /* 
             PRE / CODE
           */

          pre: ({ children }) => {
            const child = React.Children.toArray(children)[0];

            if (React.isValidElement(child) && child.type === "code") {
              const className = child.props?.className || "";

              const match = /language-(\w+)/.exec(className);

              const language = match?.[1] || "";

              if (language === "mermaid") {
                const codeText = String(child.props?.children ?? "").replace(
                  /\n$/,
                  "",
                );

                return <MermaidDiagram code={codeText} />;
              }
            }

            return (
              <pre className="my-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-900 p-4 text-sm leading-6 text-white">
                {children}
              </pre>
            );
          },

          code: ({ className, children, ...props }) => {
            const safeChildren = String(children ?? "");

            const isInline = !className || !className.includes("language-");

            if (isInline) {
              return (
                <code
                  className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-blue-700 sm:text-sm"
                  {...props}
                >
                  {safeChildren}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
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

/*   SPLIT MARKDOWN BLOCKS*/

function splitMarkdownBlocks(markdown) {
  if (!markdown?.trim()) {
    return [];
  }

  /* Split ONLY on a line containing  */
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
      const isCodeFence = line.trim().startsWith("```");

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
            content: currentBlock.join("\n").trim(),
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
        content: currentBlock.join("\n").trim(),
        forceBreak: false,
      });
    }

    /*
      The LAST block of this section must cause
      the NEXT section to start on a new page.
    */
    if (sectionIndex < sections.length - 1 && blocks.length > 0) {
      blocks[blocks.length - 1].forceBreak = true;
    }
  });

  return blocks.filter((block) => block.content);
}

/* 
   CREATE PAGES
 */

function createPagesFromBlocks(blocks, heights, maxHeight) {
  const pages = [];

  let currentPage = [];
  let currentHeight = 0;

  blocks.forEach((block, index) => {
    const blockHeight = heights[index] || 0;

    /*
      If adding this block would exceed
      available content space, start a new page.
    */
    if (currentPage.length > 0 && currentHeight + blockHeight > maxHeight) {
      pages.push(currentPage.map((item) => item.content).join("\n\n"));

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
      pages.push(currentPage.map((item) => item.content).join("\n\n"));

      currentPage = [];
      currentHeight = 0;
    }
  });

  if (currentPage.length > 0) {
    pages.push(currentPage.map((item) => item.content).join("\n\n"));
  }

  return pages;
}

/*  COVER DATA*/

function getCoverData(markdown, companyName) {
  const lines = (markdown || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let title = "Business Proposal";

  const heading = lines.find((line) => /^#\s+/.test(line));

  if (heading) {
    title = heading.replace(/^#\s+/, "").trim();
  }

  return {
    title,
    companyName: companyName?.trim() || "Marelab",
    subtitle: "Professional Business Proposal",
  };
}

/* 
   COVER
 */

function CoverContent({ data }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center sm:px-10">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
        {data.companyName}
      </p>

      <h1 className="max-w-[650px] text-5xl font-bold leading-tight text-slate-900 sm:text-5xl">
        {data.title}
      </h1>

      <p className="mt-4 text-lg text-slate-500 sm:mt-6 sm:text-lg">{data.subtitle}</p>

      <div className="mt-7 h-1 w-24 rounded-full bg-blue-600 sm:mt-10 sm:w-24" />
    </div>
  );
}

/* 
   WAIT FOR IMAGES
 */

function waitForImages(container) {
  const images = Array.from(container.querySelectorAll("img"));

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
    }),
  );
}

/* 
   MAIN COMPONENT
 */

function ProposalPreview({
  markdown = "",
  companyName = "Marelab",
  TemplateComponent,
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const [automaticPages, setAutomaticPages] = useState([]);

  const [previewScale, setPreviewScale] = useState(1);

  const proposalPagesRef = useRef(null);

  const previewViewportRef = useRef(null);

  const measurementRef = useRef(null);

  /* 
     BLOCKS
   */

  const blocks = useMemo(() => splitMarkdownBlocks(markdown), [markdown]);

  /* 
     COVER
   */

  const coverData = useMemo(
    () => getCoverData(markdown, companyName),
    [markdown, companyName],
  );

  /* 
     RESPONSIVE SCALE
   */

  useEffect(() => {
    const viewport = previewViewportRef.current;

    if (!viewport) return;

    const updateScale = () => {
      const availableWidth = viewport.clientWidth - 32;

      if (availableWidth <= 0) return;

      const scale = availableWidth / PAGE_WIDTH;

      setPreviewScale(Math.min(1, Math.max(0.35, scale)));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);

    observer.observe(viewport);

    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();

      window.removeEventListener("resize", updateScale);
    };
  }, []);

  /* 
     AUTOMATIC PAGINATION
   */

  useEffect(() => {
    if (!blocks.length) {
      setAutomaticPages([]);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(() => {
      const elements =
        measurementRef.current?.querySelectorAll(".markdown-measure-block") ||
        [];

      const heights = Array.from(elements).map(
        (element) => element.getBoundingClientRect().height,
      );

      const newPages = createPagesFromBlocks(
        blocks,
        heights,
        MAX_CONTENT_HEIGHT,
      );

      if (!cancelled) {
        setAutomaticPages(newPages);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [blocks]);

  /* 
     TEMPLATE CHECK
   */

  if (typeof TemplateComponent !== "function") {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-2xl bg-white p-6 sm:p=10">
        <div className="text-center">
          <h2 className="text-lg font-bold text-red-600 sm:text-xl">
            Template Component Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please check templateData.js
          </p>
        </div>
      </div>
    );
  }

  /*  CONTENT PAGES*/

  const contentPages = automaticPages.length > 0 ? automaticPages : [""];

  const totalPages = contentPages.length + 1;

  /*   PDF DOWNLOAD*/


  const handleDownloadPDF = async () => {
    if (isDownloading) return;

    const previewContainer = proposalPagesRef.current;

    if (!previewContainer) {
      alert("Proposal pages not found.");
      return;
    }

    const pages = previewContainer.querySelectorAll(
      '[data-proposal-page="true"]',
    );

    if (!pages.length) {
      alert("Proposal pages not found.");
      return;
    }

    setIsDownloading(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      for (let i = 0; i < pages.length; i++) {
        const temp = document.createElement("div");
        const clonedPage = pages[i].cloneNode(true);

        temp.style.position = "fixed";
        temp.style.left = "-10000px";
        temp.style.top = "0";
        temp.style.width = `${PAGE_WIDTH}px`;
        temp.style.height = `${PAGE_HEIGHT}px`;
        temp.style.overflow = "hidden";
        temp.style.background = "#fff";

        clonedPage.style.width = `${PAGE_WIDTH}px`;
        clonedPage.style.height = `${PAGE_HEIGHT}px`;
        clonedPage.style.minHeight = `${PAGE_HEIGHT}px`;
        clonedPage.style.maxHeight = `${PAGE_HEIGHT}px`;
        clonedPage.style.transform = "none";
        clonedPage.style.margin = "0";
        clonedPage.style.boxShadow = "none";
        clonedPage.style.overflow = "hidden";

        temp.appendChild(clonedPage);
        document.body.appendChild(temp);

        await new Promise((resolve) => setTimeout(resolve, 250));

        await waitForImages(clonedPage);

        const canvas = await html2canvas(clonedPage, {
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          windowWidth: PAGE_WIDTH,
          windowHeight: PAGE_HEIGHT,
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          allowTaint: true,
          imageTimeout: 15000,
          logging: false,
          scrollX: 0,
          scrollY: 0,
        });

        document.body.removeChild(temp);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, 210, 297, undefined, "FAST",
        );
      }

      pdf.save("business-proposal.pdf");
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("PDF download failed. Please check the browser console.");
    } finally {
      setIsDownloading(false);
    }
  };
  /*    PAGE*/

  const renderPage = (pageContent, pageNumber, isCover = false) => {
    const scaledWidth = PAGE_WIDTH * previewScale;

    const scaledHeight = PAGE_HEIGHT * previewScale;

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
              <CoverContent data={coverData} />
            ) : (
              <div className="w-full  min-w-0">
                {pageContent ? (
                  <MarkdownContent content={pageContent} />
                ) : (
                  <div className="flex h-full items-center justify-center px-6">
                    <p className="text-slate-400">
                      Start typing your proposal content in the editor.
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

  /* 
     UI
   */

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      {/* HEADER */}

      <div className="mb-4 flex w-full shrink-0 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900 sm:text-lg">Proposal Preview</h2>

          <p className="text-xs text-slate-500">
            {totalPages} page
            {totalPages !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-5"
        >
          {isDownloading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      {/*      HIDDEN MEASUREMENT AREA*/}

      <div
        ref={measurementRef}
        className="pointer-events-none fixed left-[-99999px] top-0"
        style={{
          width: `${PAGE_WIDTH - 112}px`,
        }}
      >
        {blocks.map((block, index) => (
          <div key={index} className="markdown-measure-block">
            <MarkdownContent content={block.content} />
          </div>
        ))}
      </div>

      {/* 
          PREVIEW
       */}

      <div
        ref={previewViewportRef}
        className="min-h-0 w-full flex-1 overflow-auto rounded-xl border border-slate-200 bg-slate-200 p-2 sm:p-4"
      >
        <div
          ref={proposalPagesRef}
          className="flex w-full flex-col items-center gap-4 sm:gap-6"
        >
          {/* COVER */}

          {renderPage("", 1, true)}

          {/* CONTENT */}

          {contentPages.map((pageContent, index) =>
            renderPage(pageContent, index + 2, false),
          )}
        </div>
      </div>
    </div>
  );
}

export default ProposalPreview;
