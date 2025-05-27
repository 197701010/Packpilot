"use client";
export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 rounded ${props.className || ""}`}
    />
  );
}
