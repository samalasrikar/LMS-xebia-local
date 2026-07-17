import React from "react";
import * as LucideIcons from "lucide-react";

export default function CategoryIcon({ name, className = "", size = 20 }) {
  if (!name) return null;

  const IconComponent = LucideIcons[name];
  if (IconComponent) {
    return <IconComponent className={className} size={size} />;
  }

  // Fallback to text rendering (for emojis)
  return (
    <span 
      className={`select-none inline-flex items-center justify-center ${className}`} 
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      {name}
    </span>
  );
}
