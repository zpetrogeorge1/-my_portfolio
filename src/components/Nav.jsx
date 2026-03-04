import { useState, useEffect } from "react";

export default function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
        background: dark
          ? scrolled ? "rgba(8,8,8,0.88)" : "transparent"
          : scrolled ? "rgba(255,255,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "saturate(1.8) blur(14px)" : "none",
        borderBottom: scrolled
          ? dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)"
          : "1px solid transparent",
        transition: "background .3s, border-color .3s",
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
        <div
          style={{
            width: 26, height: 26, borderRadius: "50%",
            background: dark ? "#222" : "#e8e8e8",
            border: dark ? "1.5px solid #333" : "1.5px solid #ccc",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, overflow: "hidden", flexShrink: 0,
          }}
        >
          🧑‍💻
        </div>
        <span
          style={{
            fontSize: 13.5, fontWeight: 500,
            color: dark ? "#d8d8d8" : "#111",
            fontFamily: "'Geist','DM Sans',sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Rishav
        </span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {[["Projects", "#projects"], ["Contact", "https://cal.com/rishab-agarwal/30min"]].map(([label, href]) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: 13, color: dark ? "#777" : "#666",
              textDecoration: "none", padding: "4px 10px", borderRadius: 6,
              fontFamily: "'Geist','DM Sans',sans-serif",
              transition: "color .15s, background .15s",
            }}
            onMouseEnter={e => {
              e.target.style.color      = dark ? "#e8e8e8" : "#111";
              e.target.style.background = dark ? "#181818" : "#f3f3f3";
            }}
            onMouseLeave={e => {
              e.target.style.color      = dark ? "#777" : "#666";
              e.target.style.background = "transparent";
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
            color: dark ? "#555" : "#888", fontSize: 13,
            padding: "4px 8px", borderRadius: 6,
            lineHeight: 1, transition: "color .15s",
          }}
        >
          {dark ? "☀" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
