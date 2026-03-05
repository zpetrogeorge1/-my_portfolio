import { Reveal } from "../../hooks/useReveal";

export function Contact({ dark, fg, muted }) {
  const D = dark;
  return (
    <section style={{ maxWidth: 672, margin: "0 auto", padding: "0 24px 96px" }}>
      <Reveal>
        <div>
          <h2
            style={{
              fontSize: 19, fontWeight: 600,
              fontFamily: "'Geist','DM Sans',sans-serif",
              letterSpacing: "-0.02em", color: fg, marginBottom: 8,
            }}
          >
            Get in touch
          </h2>
          <p
            style={{
              fontSize: 14, color: muted,
              fontFamily: "'Geist','DM Sans',sans-serif",
              lineHeight: 1.65, marginBottom: 20,
            }}
          >
            Hi there — I'm currently open to contribute to develop your dream to real world existence!
          </p>
          <a
            href="https://calendar.app.google/kZU5QPwgGMV2WzSA9"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              fontSize: 13.5, fontWeight: 500, padding: "8px 20px", borderRadius: 8,
              background: D ? "#f0f0f0" : "#111",
              color: D ? "#000" : "#fff",
              textDecoration: "none",
              fontFamily: "'Geist','DM Sans',sans-serif",
              transition: "opacity .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Book a call
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer({ dark }) {
  const D = dark;
  return (
    <footer
      style={{
        borderTop: D ? "1px solid #141414" : "1px solid #f0f0f0",
        padding: "18px 24px", textAlign: "center",
        fontSize: 12, color: D ? "#333" : "#ccc",
        fontFamily: "'Geist','DM Sans',sans-serif",
      }}
    >
      Built with love by{" "}
      <a
        href="https://x.com/Yrishavjs"
        target="_blank"
        rel="noreferrer"
        style={{ color: D ? "#555" : "#aaa", textDecoration: "underline" }}
      >
        Zachary Petrogeorge
      </a>
    </footer>
  );
}
