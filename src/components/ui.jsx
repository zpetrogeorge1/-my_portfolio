import { useState } from "react";

/* ── PR status badge ── */
export function Badge({ status }) {
  const map = {
    merged: { bg: "#1d1128", fg: "#c084fc", dot: "#a855f7" },
    open:   { bg: "#0c1e16", fg: "#4ade80", dot: "#22c55e" },
    closed: { bg: "#1e1010", fg: "#f87171", dot: "#ef4444" },
  };
  const s = map[status] || map.closed;

  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11.5, padding: "3px 10px", borderRadius: 99,
        background: s.bg, color: s.fg,
        fontFamily: "'DM Mono',monospace",
        flexShrink: 0,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}

/* ── Skill pill ── */
export function SkillTag({ name, dark }) {
  const [hov, setHov] = useState(false);

  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 13, padding: "5px 13px", borderRadius: 7,
        background: hov ? (dark ? "#1c1c1c" : "#ebebeb") : (dark ? "#111" : "#f6f6f6"),
        color: dark ? "#aaa" : "#444",
        border: dark ? "1px solid #222" : "1px solid #e4e4e4",
        fontFamily: "'Geist','DM Sans',sans-serif",
        cursor: "default",
        transition: "all .15s",
        transform: hov ? "translateY(-1px)" : "none",
        display: "inline-block",
      }}
    >
      {name}
    </span>
  );
}
