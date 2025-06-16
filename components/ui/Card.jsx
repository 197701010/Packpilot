"use client";
export function Card({ children, ...props }) {
  return <div {...props} className={`bg-white rounded-xl p-4 shadow ${props.className || ""}`}>{children}</div>;
}

export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
