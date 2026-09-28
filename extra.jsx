const handleImageUpload = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const imageMarkdown = `![${file.name}](${reader.result})`;

    const nextMarkdown = `${markdown || ""}\n\n${imageMarkdown}\n`;

    if (typeof setMarkdown === "function") {
      setMarkdown(nextMarkdown);
    } else if (typeof onChange === "function") {
      onChange(nextMarkdown);
    }
  };

  reader.readAsDataURL(file);

  event.target.value = "";
};