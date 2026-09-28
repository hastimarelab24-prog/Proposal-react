import React, { useRef } from "react";

function MarkdownEditor({
  markdown = "",
  setMarkdown,
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
    }
  };

  /* OPEN IMAGE PICKER */
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  /* IMAGE UPLOAD */
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imageMarkdown=`![${file.name}](${reader.result})`;
      const nextMarkdown=`${markdown || ""} \n\n${imageMarkdown}\n`
      if(typeof setMarkdown==="function"){
        setMarkdown(nextMarkdown);
      }else if(typeof onChange==="function"){
        onChange(nextMarkdown);
      }

      
    };

    
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">

      {/* HIDDEN IMAGE INPUT */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* HEADER */}
      <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 bg-white p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">

        {/* TITLE */}
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
            Markdown Editor
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Write your proposal using Markdown
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">

          {/* ADD IMAGE */}
          <button
            type="button"
            onClick={handleImageClick}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-2 text-xs font-medium text-white transition hover:bg-blue-700 active:scale-[0.98] sm:px-4 sm:py-2 sm:text-sm"
          >
            <span>🖼️</span>
            <span className="truncate">
              Add Image
            </span>
          </button>

          {/* RESET */}
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-slate-300 px-2.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:px-3 sm:text-sm"
          >
            Reset
          </button>

          {/* CLEAR */}
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-red-200 px-2.5 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 active:scale-[0.98] sm:px-3 sm:text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-2 py-2 scrollbar-thin">

        <button
          type="button"
          onClick={handleImageClick}
          className="flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 sm:text-sm"
        >
          <span>🖼️</span>
          <span>Image</span>
        </button>

      </div>

      {/* EDITOR */}
      <div className="min-h-0 flex-1 bg-slate-950">

        <textarea
          ref={textareaRef}
          value={editorValue}
          onChange={(event) =>
            updateMarkdown(event.target.value)
          }
          spellCheck={false}
          placeholder="Write your proposal in Markdown..."
          className="block h-full min-h-[280px] w-full resize-none overflow-auto bg-slate-950 px-3 py-4 font-mono text-xs leading-6 text-white outline-none placeholder:text-slate-500 sm:px-5 sm:py-5 sm:text-sm"
        />

      </div>
    </div>
  );
}

export default MarkdownEditor;
