import { useState } from "react";

export default function ProjectCard({ p, dark, fg, muted }) {
  const [hov,  setHov]  = useState(false);
  const [open, setOpen] = useState(false);
  const D = dark;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 12,
        border: D
          ? hov ? "1px solid #282828" : "1px solid #1a1a1a"
          : hov ? "1px solid #d4d4d4" : "1px solid #ebebeb",
        background: D ? (hov ? "#0e0e0e" : "#0a0a0a") : (hov ? "#fafafa" : "#fff"),
        overflow: "hidden",
        transition: "border-color .2s, box-shadow .2s",
        boxShadow: hov
          ? D ? "0 4px 24px rgba(0,0,0,.5)" : "0 4px 24px rgba(0,0,0,.07)"
          : "none",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: 160,
          background: D ? "#0f0f0f" : "#f5f5f5",
          borderBottom: D ? "1px solid #1a1a1a" : "1px solid #ebebeb",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 56, userSelect: "none",
        }}
      >
        {p.emoji}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px" }}>
        <h3
          style={{
            fontSize: 15.5, fontWeight: 600,
            fontFamily: "'Geist','DM Sans',sans-serif",
            color: fg, letterSpacing: "-0.015em", marginBottom: 8,
          }}
        >
          {p.title}
        </h3>

        <p
          style={{
            fontSize: 13.5, color: muted,
            fontFamily: "'Geist','DM Sans',sans-serif",
            lineHeight: 1.65, marginBottom: 14,
          }}
        >
          {p.description}
        </p>

        {/* Tech stack toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontSize: 12, color: D ? "#444" : "#bbb",
            fontFamily: "'Geist','DM Sans',sans-serif",
            display: "flex", alignItems: "center", gap: 5,
            transition: "color .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = D ? "#888" : "#666"}
          onMouseLeave={e => e.currentTarget.style.color = D ? "#444" : "#bbb"}
        >
          Tech Stack{" "}
          <span
            style={{
              fontSize: 9, display: "inline-block",
              transition: "transform .2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>

        {open && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
            {p.tech.map(t => (
              <span
                key={t}
                style={{
                  fontSize: 11.5, padding: "2px 9px", borderRadius: 99,
                  background: D ? "#181818" : "#f0f0f0",
                  color: D ? "#888" : "#555",
                  border: D ? "1px solid #242424" : "1px solid #e4e4e4",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
