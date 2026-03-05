import { useState, useEffect } from "react";
import myPhoto from "../assets/profile.jpg";
export default function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const D = dark;

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: scrolled ? 52 : 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "0 24px" : "0 32px",
        background: scrolled
          ? D ? "rgba(8,8,8,0.88)" : "rgba(255,255,255,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(1.8) blur(16px)" : "none",
        borderBottom: scrolled
          ? D ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)"
          : "1px solid transparent",
        transition: "height .35s cubic-bezier(.4,0,.2,1), padding .35s cubic-bezier(.4,0,.2,1), background .3s, border-color .3s, backdrop-filter .3s",
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div
          style={{
            width: scrolled ? 28 : 36,
            height: scrolled ? 28 : 36,
            borderRadius: "50%",
            background: D ? "#222" : "#e8e8e8",
            border: D ? "1.5px solid #333" : "1.5px solid #ccc",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: scrolled ? 14 : 18,
            overflow: "hidden", flexShrink: 0,
            transition: "width .35s cubic-bezier(.4,0,.2,1), height .35s cubic-bezier(.4,0,.2,1), font-size .35s cubic-bezier(.4,0,.2,1)",
          }}
        >
            <img
             src={myPhoto}
             alt="Zach Petrogeorge"
             style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
             />
        </div>
        <span
          style={{
            fontSize: scrolled ? 13.5 : 16,
            fontWeight: scrolled ? 500 : 600,
            color: D ? "#d8d8d8" : "#111",
            fontFamily: "'Geist','DM Sans',sans-serif",
            letterSpacing: scrolled ? "-0.01em" : "-0.02em",
            transition: "font-size .35s cubic-bezier(.4,0,.2,1), font-weight .35s, letter-spacing .35s",
          }}
        >
          Zach Petrogeorge
        </span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: scrolled ? 2 : 6, transition: "gap .35s" }}>
        {[["Projects", "#projects"], ["Contact", "https://cal.com/rishab-agarwal/30min"]].map(([label, href]) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: scrolled ? 13 : 14,
              color: D ? "#777" : "#666",
              textDecoration: "none",
              padding: scrolled ? "4px 10px" : "6px 13px",
              borderRadius: 7,
              fontFamily: "'Geist','DM Sans',sans-serif",
              transition: "color .15s, background .15s, font-size .35s, padding .35s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color      = D ? "#e8e8e8" : "#111";
              e.currentTarget.style.background = D ? "#181818" : "#f3f3f3";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color      = D ? "#777" : "#666";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {label}
          </a>
        ))}

        <button
          onClick={() => setDark(d => !d)}
          title="Toggle theme"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: D ? "#555" : "#888",
            fontSize: scrolled ? 13 : 15,
            padding: scrolled ? "4px 8px" : "6px 10px",
            borderRadius: 6,
            lineHeight: 1,
            transition: "color .15s, font-size .35s, padding .35s",
          }}
        >
          {D ? "☀" : "🌙"}
        </button>
      </div>
    </nav>
  );
}