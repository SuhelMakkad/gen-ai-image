import { tryCatch } from "./try-catch";

export const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const handleDownload = async (imageUrl: string) => {
  if (!imageUrl) return;

  const [response] = await tryCatch(fetch(imageUrl));
  if (!response) return;

  const [blob] = await tryCatch(response.blob());
  if (!blob) return;

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `generated-image-${Date.now()}.png`;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
