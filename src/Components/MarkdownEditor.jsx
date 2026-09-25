// import React, { useMemo, useRef, useState } from "react";

// function MarkdownEditor({
//   markdown,
//   setMarkdown,
//   onClear,
//   onReset,
// }) {
//   const textareaRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [wordCount, setWordCount] = useState(
//     markdown.trim()
//       ? markdown.trim().split(/\s+/).length
//       : 0
//   );

//   const updateMarkdown = (value) => {
//     setMarkdown(value);

//     const words = value.trim()
//       ? value.trim().split(/\s+/).length
//       : 0;

//     setWordCount(words);
//   };

//   const insertText = (before, after = "", placeholder = "text") => {
//     const textarea = textareaRef.current;

//     if (!textarea) {
//       updateMarkdown(markdown + before + placeholder + after);
//       return;
//     }

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;

//     const selectedText = markdown.substring(start, end);

//     const replacement =
//       selectedText || placeholder;

//     const newText =
//       markdown.substring(0, start) +
//       before +
//       replacement +
//       after +
//       markdown.substring(end);

//     updateMarkdown(newText);

//     requestAnimationFrame(() => {
//       textarea.focus();

//       const newStart =
//         start +
//         before.length;

//       const newEnd =
//         newStart +
//         replacement.length;

//       textarea.setSelectionRange(
//         newStart,
//         newEnd
//       );
//     });
//   };

//   const insertLine = (text) => {
//     const textarea = textareaRef.current;

//     if (!textarea) {
//       updateMarkdown(markdown + "\n" + text + "\n");
//       return;
//     }

//     const start = textarea.selectionStart;

//     const newText =
//       markdown.substring(0, start) +
//       text +
//       markdown.substring(start);

//     updateMarkdown(newText);

//     requestAnimationFrame(() => {
//       textarea.focus();

//       const position =
//         start + text.length;

//       textarea.setSelectionRange(
//         position,
//         position
//       );
//     });
//   };

//   const addTopic = () => {
//     const topic = `

// ## New Topic

// Write your topic content here.

// `;

//     updateMarkdown(markdown + topic);
//   };

//   const addPageBreak = () => {
//     const pageBreak = `

// ---

// `;

//     updateMarkdown(markdown + pageBreak);
//   };

//   const addImage = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       const imageMarkdown = `

// ![${file.name}](${reader.result})

// `;

//       updateMarkdown(markdown + imageMarkdown);
//     };

//     reader.readAsDataURL(file);

//     event.target.value = "";
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();

//       const textarea = textareaRef.current;

//       if (!textarea) return;

//       const start = textarea.selectionStart;
//       const end = textarea.selectionEnd;

//       const newText =
//         markdown.substring(0, start) +
//         "  " +
//         markdown.substring(end);

//       updateMarkdown(newText);

//       requestAnimationFrame(() => {
//         textarea.focus();
//         textarea.setSelectionRange(
//           start + 2,
//           start + 2
//         );
//       });
//     }
//   };

//   const lineNumbers = useMemo(() => {
//     const lines = markdown.split("\n").length;

//     return Array.from(
//       { length: Math.max(lines, 1) },
//       (_, index) => index + 1
//     );
//   }, [markdown]);

//   return (
//     <div className="flex h-[calc(100vh-235px)] min-h-[650px] flex-col overflow-hidden bg-slate-950">
//       {/* ===================================================
//           EDITOR TOP BAR
//       ==================================================== */}
//       <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-800 bg-[#020617] px-[13px]">
//         <div className="flex items-center gap-2.5">
//           <div className="flex gap-[5px]">
//             <span className="h-2 w-2 rounded-full bg-rose-400" />
//             <span className="h-2 w-2 rounded-full bg-amber-400" />
//             <span className="h-2 w-2 rounded-full bg-emerald-400" />
//           </div>

//           <span className="font-mono text-[11px] text-slate-400">
//             proposal.md
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={addTopic}
//             className="rounded-md bg-blue-600 px-[11px] py-[7px] text-[10px] font-extrabold text-white transition hover:bg-blue-700"
//           >
//             + Topic
//           </button>

//           <button
//             type="button"
//             onClick={addPageBreak}
//             className="rounded-md border border-slate-700 bg-slate-800 px-[11px] py-[7px] text-[10px] font-extrabold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//           >
//             + Page Break
//           </button>

//           <button
//             type="button"
//             onClick={addImage}
//             className="rounded-md bg-blue-600 px-[11px] py-[7px] text-[10px] font-extrabold text-white transition hover:bg-blue-700"
//           >
//             + Image
//           </button>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* ===================================================
//           MARKDOWN TOOLBAR
//       ==================================================== */}
//       <div className="flex shrink-0 flex-wrap items-center gap-[5px] border-b border-slate-800 bg-slate-900 p-2">
//         <button
//           type="button"
//           onClick={() =>
//             insertLine("# ", "")
//           }
//           title="Heading 1"
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           H1
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine("## ", "")
//           }
//           title="Heading 2"
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           H2
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine("### ", "")
//           }
//           title="Heading 3"
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           H3
//         </button>

//         <span className="mx-[3px] h-5 w-px bg-slate-700" />

//         <button
//           type="button"
//           onClick={() =>
//             insertText("**", "**", "bold text")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           B
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertText("*", "*", "italic text")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           I
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertText("`", "`", "code")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           Code
//         </button>

//         <span className="mx-[3px] h-5 w-px bg-slate-700" />

//         <button
//           type="button"
//           onClick={() =>
//             insertLine("- ")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           • List
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine("1. ")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           1.
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine("> ")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           Quote
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine("---")
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           HR
//         </button>

//         <span className="mx-[3px] h-5 w-px bg-slate-700" />

//         <button
//           type="button"
//           onClick={() =>
//             insertText(
//               "[",
//               "](https://example.com)",
//               "link"
//             )
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           Link
//         </button>

//         <button
//           type="button"
//           onClick={addImage}
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           Image
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine(
//               "```javascript\nconst proposal = {};\n```"
//             )
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           JS
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             insertLine(
//               "```mermaid\ngraph TD\nA[Start] --> B[End]\n```"
//             )
//           }
//           className="min-h-7 rounded-[5px] border border-[#26354d] bg-[#172033] px-2 font-mono text-[10px] font-bold text-slate-300 transition hover:border-blue-500 hover:bg-blue-900 hover:text-white"
//         >
//           Mermaid
//         </button>
//       </div>

//       {/* ===================================================
//           CODE AREA
//       ==================================================== */}
//       <div className="flex min-h-0 flex-1 overflow-hidden">
//         {/* Line Numbers */}
//         <div className="w-[45px] shrink-0 overflow-hidden border-r border-slate-800 bg-[#0b1120] px-2 py-[17px] text-right font-mono text-[11px] leading-[21px] text-slate-600 select-none">
//           {lineNumbers.map((number) => (
//             <span key={number} className="block">
//               {number}
//             </span>
//           ))}
//         </div>

//         {/* Textarea */}
//         <textarea
//           ref={textareaRef}
//           value={markdown}
//           onChange={(event) =>
//             updateMarkdown(event.target.value)
//           }
//           onKeyDown={handleKeyDown}
//           spellCheck={false}
//           className="h-full w-full resize-none border-0 bg-slate-900 px-4 py-[17px] font-mono text-xs leading-[21px] text-slate-200 outline-none selection:bg-blue-600 selection:text-white placeholder:text-slate-600"
//           placeholder="Write your proposal in Markdown..."
//         />
//       </div>

//       {/* ===================================================
//           STATUS BAR
//       ==================================================== */}
//       <div className="flex min-h-[30px] shrink-0 items-center justify-between border-t border-slate-800 bg-[#020617] px-3 font-mono text-[9px] text-slate-500">
//         <div className="flex gap-[14px]">
//           <span>Markdown</span>
//           <span>UTF-8</span>
//           <span>Spaces: 2</span>
//         </div>

//         <div className="flex gap-[14px]">
//           <span>
//             {markdown.length} chars
//           </span>

//           <span>
//             {wordCount} words
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={onClear}
//             className="rounded px-2 py-1 text-slate-400 transition hover:bg-red-950 hover:text-red-400"
//           >
//             Clear
//           </button>

//           <button
//             type="button"
//             onClick={onReset}
//             className="rounded px-2 py-1 text-blue-400 transition hover:bg-blue-950 hover:text-blue-300"
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MarkdownEditor;
// 




import React, { useRef } from "react";

function MarkdownEditor({
  markdown = "", setMarkdown,
  onChange,
  onClear,
  onReset,
}) {
  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);

  const editorValue = markdown || "";

  /* UPDATE MARKDOWN */
  const updateMarkdown = (newValue) => {
    if (typeof setMarkdown === "function") {
      setMarkdown(newValue);
      return;
    }

    if (typeof onChange === "function") {
      onChange(newValue);
      return;
    }
  };

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData = e.target?.result;
      if (!imageData) return;

      // Base64 Image Markdown Format
      const imageMarkdown = `![${file.name}](${imageData})`;

      const newValue = editorValue
        ? `${editorValue}\n\n${imageMarkdown}\n\n`
        : `${imageMarkdown}\n\n`;

      updateMarkdown(newValue);
    };

    reader.onerror = () => {
      alert("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);

 
    event.target.value = "";
  };

  /* INSERT TEXT HELPER */
  // const insertText = (before, after = "") => {
  //   const textarea = textareaRef.current;

  //   if (!textarea) {
  //     updateMarkdown(`${editorValue}${before}${after}`);
  //     return;
  //   }

  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;

  //   const selectedText = editorValue.substring(start, end);

  //   const newText =
  //     editorValue.substring(0, start) +
  //     before +
  //     selectedText +
  //     after +
  //     editorValue.substring(end);

  //   updateMarkdown(newText);

  //   setTimeout(() => {
  //     textarea.focus();
  //     const cursorPosition = start + before.length + selectedText.length + after.length;
  //     textarea.setSelectionRange(cursorPosition, cursorPosition);
  //   }, 0);
  // };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      
      {/* 3. HIDDEN FILE INPUT (આ હોવું ખુબ જરૂરી છે) */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Markdown Editor</h2>
          <p className="text-xs text-slate-500">Write your proposal using Markdown</p>
        </div>

        <div className="flex items-center gap-2">
          {/* TOP BAR IMAGE BUTTON */}
          <button
            type="button"
            onClick={handleImageClick}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            🖼️ Add Image
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-2 py-2">
        <button
          type="button"
          onClick={handleImageClick}
          className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
        >
          🖼️ Image
        </button>
      </div>

      {/* MARKDOWN TEXTAREA */}
      <div className="min-h-0 flex-1 bg-slate-950">
        <textarea
          ref={textareaRef}
          value={editorValue}
          onChange={(event) => updateMarkdown(event.target.value)}
          spellCheck={false}
          placeholder="Write your proposal in Markdown..."
          className="h-full w-full resize-none bg-slate-950 px-5 py-5 font-mono text-sm leading-6 text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

export default MarkdownEditor;