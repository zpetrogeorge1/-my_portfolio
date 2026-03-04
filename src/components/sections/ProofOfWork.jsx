import { useState } from "react";
import { Reveal } from "../../hooks/useReveal";
import { Badge } from "../ui";
import { allPRs } from "../../data";

const TAB_LABELS = { merged: "Merged contributions to open source", open: "Open pull requests", closed: "Closed pull requests" };

export default function ProofOfWork({ dark, fg, dim }) {
  const [prTab, setPrTab] = useState("merged");
  const D = dark;
  const filtered = allPRs.filter(p => p.status === prTab);

  return (
    <section style={{ maxWidth: 672, margin: "0 auto", padding: "0 24px 80px" }}>
      <Reveal>
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 19, fontWeight: 600,
              fontFamily: "'Geist','DM Sans',sans-serif",
              letterSpacing: "-0.02em", color: fg, marginBottom: 4,
            }}
          >
            Proof Of Work
          </h2>
          <p style={{ fontSize: 13, color: dim, fontFamily: "'Geist','DM Sans',sans-serif" }}>
            I love to create things which solve real world problems
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div>
          <h3
            style={{
              fontSize: 14.5, fontWeight: 500,
              fontFamily: "'Geist','DM Sans',sans-serif",
              color: fg, marginBottom: 10,
            }}
          >
            Pull Requests
          </h3>

          {/* Tab bar */}
          <div
            style={{
              display: "flex", gap: 1, marginBottom: 2,
              borderBottom: D ? "1px solid #161616" : "1px solid #eee",
            }}
          >
            {["merged", "open", "closed"].map(tab => (
              <button
                key={tab}
                onClick={() => setPrTab(tab)}
                style={{
                  fontSize: 12.5, padding: "6px 13px",
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "'Geist','DM Sans',sans-serif",
                  color: prTab === tab ? (D ? "#e0e0e0" : "#111") : (D ? "#444" : "#aaa"),
                  borderBottom: prTab === tab
                    ? `2px solid ${D ? "#e0e0e0" : "#111"}`
                    : "2px solid transparent",
                  fontWeight: prTab === tab ? 500 : 400,
                  marginBottom: "-1px",
                  transition: "color .15s, border-color .15s",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <p
            style={{
              fontSize: 11.5, color: D ? "#333" : "#ccc",
              fontFamily: "'Geist','DM Sans',sans-serif",
              padding: "8px 0 2px",
            }}
          >
            {TAB_LABELS[prTab]}
          </p>

          {/* PR list */}
          <div>
            {filtered.length === 0 ? (
              <p style={{ fontSize: 13, color: D ? "#333" : "#ccc", padding: "16px 0", fontFamily: "'Geist','DM Sans',sans-serif" }}>
                No {prTab} pull requests.
              </p>
            ) : (
              filtered.map(pr => (
                <div
                  key={pr.num}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 0", gap: 12,
                    borderBottom: D ? "1px solid #141414" : "1px solid #f2f2f2",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: dim, fontFamily: "'DM Mono',monospace", marginBottom: 3 }}>
                      {pr.repo}{" "}
                      <span style={{ color: D ? "#333" : "#ccc" }}>{pr.num}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: fg, fontFamily: "'Geist','DM Sans',sans-serif" }}>
                      {pr.title}
                    </div>
                  </div>
                  <Badge status={pr.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
