import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/* ── Modal Portal ── */
function ProjectModal({ p, dark, fg, muted, dim, onClose }) {
  const D = dark;

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    // Prevent body scroll while modal open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: D ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "modalFadeIn .18s ease both",
      }}
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 580,
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: 16,
          background: D ? "#0d0d0d" : "#fff",
          border: D ? "1px solid #222" : "1px solid #e4e4e4",
          boxShadow: D
            ? "0 24px 80px rgba(0,0,0,0.7)"
            : "0 24px 80px rgba(0,0,0,0.12)",
          animation: "modalSlideUp .22s cubic-bezier(.4,0,.2,1) both",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "28px 28px 20px",
            borderBottom: D ? "1px solid #181818" : "1px solid #f0f0f0",
            display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                background: D ? "#141414" : "#f5f5f5",
                border: D ? "1px solid #222" : "1px solid #e8e8e8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26,
              }}
            >
              {p.emoji}
            </div>
            <div>
              <h2
                style={{
                  fontSize: 17, fontWeight: 600,
                  fontFamily: "'Geist','DM Sans',sans-serif",
                  letterSpacing: "-0.02em", color: fg,
                  marginBottom: 4,
                }}
              >
                {p.title}
              </h2>
              {p.period && (
                <p style={{ fontSize: 12, color: dim, fontFamily: "'DM Mono',monospace" }}>
                  {p.period}
                </p>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: D ? "#181818" : "#f5f5f5",
              border: D ? "1px solid #242424" : "1px solid #e8e8e8",
              borderRadius: 8,
              width: 32, height: 32,
              cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: D ? "#666" : "#999",
              fontSize: 16, lineHeight: 1,
              transition: "color .15s, background .15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = D ? "#ccc" : "#333";
              e.currentTarget.style.background = D ? "#222" : "#eee";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = D ? "#666" : "#999";
              e.currentTarget.style.background = D ? "#181818" : "#f5f5f5";
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 22 }}>

          {/* Sponsor / context */}
          {p.sponsor && (
            <div>
              <p
                style={{
                  fontSize: 11.5, color: dim,
                  fontFamily: "'DM Mono',monospace",
                  marginBottom: 2,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}
              >
                Sponsor / Context
              </p>
              <p style={{ fontSize: 13.5, color: muted, fontFamily: "'Geist','DM Sans',sans-serif" }}>
                {p.sponsor}
              </p>
            </div>
          )}

          {/* Overview */}
          <div>
            <p
              style={{
                fontSize: 11.5, color: dim,
                fontFamily: "'DM Mono',monospace",
                marginBottom: 8,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}
            >
              Overview
            </p>
            <p
              style={{
                fontSize: 14, color: muted,
                fontFamily: "'Geist','DM Sans',sans-serif",
                lineHeight: 1.7,
              }}
            >
              {p.longDescription || p.description}
            </p>
          </div>

          {/* Highlights */}
          {p.highlights && p.highlights.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 11.5, color: dim,
                  fontFamily: "'DM Mono',monospace",
                  marginBottom: 10,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}
              >
                Key Highlights
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 13.5, color: muted,
                      fontFamily: "'Geist','DM Sans',sans-serif",
                      lineHeight: 1.6,
                      paddingLeft: 18, position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute", left: 0,
                        color: D ? "#444" : "#bbb",
                      }}
                    >
                      •
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {(p.skills || p.tech) && (
            <div>
              <p
                style={{
                  fontSize: 11.5, color: dim,
                  fontFamily: "'DM Mono',monospace",
                  marginBottom: 10,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}
              >
                Skills & Technologies
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {(p.skills || p.tech).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12, padding: "4px 11px", borderRadius: 99,
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
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Project Card ── */
export default function ProjectCard({ p, dark, fg, muted, dim }) {
  const [hov,       setHov]       = useState(false);
  const [techOpen,  setTechOpen]  = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const D = dark;

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 12,
          border: D
            ? hov ? "1px solid #303030" : "1px solid #1a1a1a"
            : hov ? "1px solid #c8c8c8" : "1px solid #ebebeb",
          background: D ? (hov ? "#0e0e0e" : "#0a0a0a") : (hov ? "#fafafa" : "#fff"),
          overflow: "hidden",
          transition: "border-color .2s, box-shadow .2s, transform .2s",
          boxShadow: hov
            ? D ? "0 4px 28px rgba(0,0,0,.55)" : "0 4px 28px rgba(0,0,0,.09)"
            : "none",
          transform: hov ? "translateY(-2px)" : "none",
          cursor: "pointer",
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
            position: "relative",
          }}
        >
          {p.emoji}
          {/* "View details" hint on hover */}
          <div
            style={{
              position: "absolute", bottom: 10, right: 12,
              fontSize: 11, color: D ? "#444" : "#bbb",
              fontFamily: "'DM Mono',monospace",
              opacity: hov ? 1 : 0,
              transition: "opacity .2s",
            }}
          >
            click to expand →
          </div>
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
            onClick={(e) => { e.stopPropagation(); setTechOpen(o => !o); }}
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
                transform: techOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          </button>

          {techOpen && (
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

      {/* Modal */}
      {modalOpen && (
        <ProjectModal
          p={p}
          dark={dark}
          fg={fg}
          muted={muted}
          dim={dim}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}