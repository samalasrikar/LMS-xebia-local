import React from "react";
import { FileText, Video, AlignLeft, BookOpen } from "lucide-react";

export const getContentType = (sub) => {
  if (!sub?.content) return null;
  if (sub.content.pdfUrl) return "pdf";
  if (sub.content.videoUrl) return "video";
  if (sub.content.content) return "text";
  return null;
};

export const getContentLabel = (sub) => {
  const t = getContentType(sub);
  if (t === "pdf") return "PDF";
  if (t === "video") return "Video";
  if (t === "text") return "Article";
  return "No content";
};

export const getContentIcon = (sub, size = 13) => {
  const t = getContentType(sub);
  if (t === "pdf") return React.createElement(FileText, { size });
  if (t === "video") return React.createElement(Video, { size });
  if (t === "text") return React.createElement(AlignLeft, { size });
  return React.createElement(BookOpen, { size });
};

export const getEmbedInfo = (url) => {
  if (!url) return null;
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      let vId = host.includes("youtu.be") ? parsedUrl.pathname.substring(1) : parsedUrl.searchParams.get("v");
      if (vId) return { type: "youtube", url: `https://www.youtube.com/embed/${vId}` };
    }
    if (host.includes("vimeo.com")) {
      const vId = parsedUrl.pathname.substring(1);
      if (vId) return { type: "vimeo", url: `https://player.vimeo.com/video/${vId}` };
    }
    return { type: "direct", url };
  } catch {
    return null;
  }
};
