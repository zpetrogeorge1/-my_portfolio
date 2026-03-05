import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/* ── Section label helper ── */
function SectionLabel({ children, dark }) {
  return (
    <p
      style={{
        fontSize: 10.5,
        fontFamily: "'DM Mono',monospace",
        color: dark ? "#555" : "#bbb",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontWeight: 500,
      }}
    >
      {children}
    </p>
  );
}

/* ── Modal Portal ── */
function ProjectModal({ p, dark, fg, muted, dim, onClose }) {
  const D = dark;
  const [imgError, setImgError] = useState({});
  const [lightbox, setLightbox] = useState(null); // index of enlarged photo
  const photos = p.photos || [];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
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
        background: D ? "rgba(0,0,0,0.80)" : "rgba(0,0,0,0.45)",
        backdropFilter: "blur(8px)",
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
          from { opacity: 0; transform: translateY(22px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: ${D ? "#2a2a2a" : "#ddd"};
          border-radius: 99px;
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-scroll"
        style={{
          width: "100%", maxWidth: 600,
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: 18,
          background: D ? "#0c0c0c" : "#fff",
          border: D ? "1px solid #252525" : "1px solid #e0e0e0",
          boxShadow: D
            ? "0 32px 100px rgba(0,0,0,0.8)"
            : "0 32px 100px rgba(0,0,0,0.14)",
          animation: "modalSlideUp .24s cubic-bezier(.4,0,.2,1) both",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "26px 26px 22px",
            borderBottom: D ? "1px solid #1c1c1c" : "1px solid #efefef",
            display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            {/* Emoji badge */}
            <div
              style={{
                width: 54, height: 54, borderRadius: 13, flexShrink: 0,
                background: D ? "#161616" : "#f4f4f4",
                border: D ? "1px solid #282828" : "1px solid #e4e4e4",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
              }}
            >
              {p.emoji}
            </div>

            <div style={{ paddingTop: 2 }}>
              {/* Title — high contrast */}
              <h2
                style={{
                  fontSize: 18, fontWeight: 700,
                  fontFamily: "'Geist','DM Sans',sans-serif",
                  letterSpacing: "-0.025em",
                  color: D ? "#f2f2f2" : "#080808",
                  marginBottom: 8, lineHeight: 1.2,
                }}
              >
                {p.title}
              </h2>

              {/* Date — readable pill */}
              {p.period && (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11.5,
                    fontFamily: "'DM Mono',monospace",
                    color: D ? "#c8c8c8" : "#2a2a2a",
                    background: D ? "#1e1e1e" : "#efefef",
                    border: D ? "1px solid #303030" : "1px solid #d8d8d8",
                    borderRadius: 6,
                    padding: "3px 10px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {p.period}
                </span>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: D ? "#181818" : "#f4f4f4",
              border: D ? "1px solid #282828" : "1px solid #e4e4e4",
              borderRadius: 8,
              width: 34, height: 34,
              cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: D ? "#777" : "#999",
              fontSize: 15, lineHeight: 1,
              transition: "color .15s, background .15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = D ? "#e8e8e8" : "#111";
              e.currentTarget.style.background = D ? "#252525" : "#e8e8e8";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = D ? "#777" : "#999";
              e.currentTarget.style.background = D ? "#181818" : "#f4f4f4";
            }}
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Sponsor */}
          {p.sponsor && (
            <div>
              <SectionLabel dark={D}>Sponsor / Context</SectionLabel>
              <p style={{
                fontSize: 14, marginTop: 6,
                color: D ? "#c8c8c8" : "#1e1e1e",
                fontFamily: "'Geist','DM Sans',sans-serif",
              }}>
                {p.sponsor}
              </p>
            </div>
          )}

          {/* Overview */}
          <div>
            <SectionLabel dark={D}>Overview</SectionLabel>
            <p style={{
              fontSize: 14, lineHeight: 1.75, marginTop: 6,
              color: D ? "#c0c0c0" : "#222",
              fontFamily: "'Geist','DM Sans',sans-serif",
            }}>
              {p.longDescription || p.description}
            </p>
          </div>

          {/* ── Photo Gallery ── */}
          <div>
            <SectionLabel dark={D}>Photos</SectionLabel>
            {photos.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: photos.length === 1 ? "1fr" : "1fr 1fr",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                {photos.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => !imgError[i] && setLightbox(i)}
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      background: D ? "#111" : "#f7f7f7",
                      border: D ? "1px solid #222" : "1px solid #e4e4e4",
                      aspectRatio: photos.length === 1 ? "16/9" : "4/3",
                      cursor: imgError[i] ? "default" : "zoom-in",
                      position: "relative",
                    }}
                  >
                    {!imgError[i] ? (
                      <img
                        src={src}
                        alt={`${p.title} photo ${i + 1}`}
                        onError={() => setImgError(e => ({ ...e, [i]: true }))}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .25s ease", }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 26, opacity: 0.2 }}>🖼</span>
                        <span style={{ fontSize: 11, marginTop: 6, fontFamily: "'DM Mono',monospace", color: D ? "#363636" : "#ccc" }}>Failed to load</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                  {[0, 1].map(i => (
                    <div
                      key={i}
                      style={{
                        borderRadius: 10,
                        background: D ? "#111" : "#f7f7f7",
                        border: D ? "1.5px dashed #252525" : "1.5px dashed #ddd",
                        aspectRatio: "4/3",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 26, opacity: 0.2 }}>🖼</span>
                      <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: D ? "#363636" : "#ccc" }}>Photo {i + 1}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, marginTop: 8, fontFamily: "'DM Mono',monospace", color: D ? "#363636" : "#c0c0c0" }}>
                  Add a <code>photos: [url1, url2]</code> field to this project in index.js
                </p>
              </>
            )}
          </div>

          {/* Highlights */}
          {p.highlights && p.highlights.length > 0 && (
            <div>
              <SectionLabel dark={D}>Key Highlights</SectionLabel>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {p.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 13.5, lineHeight: 1.65,
                      color: D ? "#c0c0c0" : "#222",
                      fontFamily: "'Geist','DM Sans',sans-serif",
                      paddingLeft: 18, position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: D ? "#555" : "#bbb" }}>•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {(p.skills || p.tech) && (
            <div>
              <SectionLabel dark={D}>Skills & Technologies</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
                {(p.skills || p.tech).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12, padding: "4px 11px", borderRadius: 99,
                      background: D ? "#181818" : "#f0f0f0",
                      color: D ? "#aaa" : "#444",
                      border: D ? "1px solid #272727" : "1px solid #e0e0e0",
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

      {/* ── Lightbox ── */}
      {lightbox !== null && createPortal(
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1100,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
            animation: "modalFadeIn .15s ease both",
            cursor: "zoom-out",
          }}
        >
          {/* Prev / Next arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + photos.length) % photos.length); }}
                style={{
                  position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 10, width: 42, height: 42, cursor: "pointer",
                  color: "#ccc", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                ‹
              </button>
              <button
                onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % photos.length); }}
                style={{
                  position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 10, width: 42, height: 42, cursor: "pointer",
                  color: "#ccc", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                ›
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={photos[lightbox]}
            alt={`${p.title} photo ${lightbox + 1}`}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "90vw", maxHeight: "88vh",
              borderRadius: 12,
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              objectFit: "contain",
              animation: "modalSlideUp .2s cubic-bezier(.4,0,.2,1) both",
              cursor: "default",
            }}
          />

          {/* Close hint */}
          <p style={{
            position: "absolute", bottom: 18,
            fontSize: 11, fontFamily: "'DM Mono',monospace",
            color: "rgba(255,255,255,0.3)",
            pointerEvents: "none",
          }}>
            click outside or press Esc to close
          </p>
        </div>,
        document.body
      )}
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
            <span style={{ fontSize: 9, display: "inline-block", transition: "transform .2s", transform: techOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
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