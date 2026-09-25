function splitMarkdownBlocks(markdown) {
  const lines = (markdown || "").split("\n");

  const blocks = [];
  let current = [];
  let insideCode = false;
  let codeLanguage = "";

  const pushBlock = () => {
    const value = current.join("\n").trim();

    if (value) {
      blocks.push(value);
    }

    current = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!insideCode) {
        insideCode = true;
        codeLanguage = line;
        current.push(line);
        continue;
      }

      current.push(line);
      insideCode = false;
      codeLanguage = "";
      pushBlock();
      continue;
    }

    if (insideCode) {
      current.push(line);
      continue;
    }

    if (
      line.trim() === "" &&
      current.length > 0
    ) {
      pushBlock();
      continue;
    }

    current.push(line);
  }

  pushBlock();

  return blocks;
}

export function createMarkdownPages(
  markdown,
  maxBlocksPerPage = 7
) {
  const blocks =
    splitMarkdownBlocks(markdown);

  const pages = [];

  let currentPage = [];

  blocks.forEach((block) => {
    currentPage.push(block);

    if (
      currentPage.length >=
      maxBlocksPerPage
    ) {
      pages.push(
        currentPage.join("\n\n")
      );

      currentPage = [];
    }
  });

  if (currentPage.length) {
    pages.push(
      currentPage.join("\n\n")
    );
  }

  return pages;
}