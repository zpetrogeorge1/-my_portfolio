import { Reveal } from "../../hooks/useReveal";
import { experiences } from "../../data";

export default function Experiences({ dark, fg, muted, dim }) {
  const D = dark;

  return (
    <section style={{ maxWidth: 672, margin: "0 auto", padding: "0 24px 80px" }}>
      <Reveal>
        <h2
          style={{
            fontSize: 19, fontWeight: 600,
            fontFamily: "'Geist','DM Sans',sans-serif",
            letterSpacing: "-0.02em", color: fg, marginBottom: 28,
          }}
        >
          Experiences
        </h2>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.08}>
            <div>
              <a
                href={exp.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 11.5, color: dim,
                  fontFamily: "'DM Mono',monospace",
                  textDecoration: "none", transition: "color .15s",
                }}
                onMouseEnter={e => e.target.style.color = muted}
                onMouseLeave={e => e.target.style.color = dim}
              >
                {exp.company}
              </a>

              <h3
                style={{
                  fontSize: 15, fontWeight: 500,
                  fontFamily: "'Geist','DM Sans',sans-serif",
                  color: fg, margin: "4px 0 3px", letterSpacing: "-0.01em",
                }}
              >
                {exp.role}{" "}
                <span style={{ color: D ? "#444" : "#bbb", fontWeight: 400 }}>
                  | {exp.period}
                </span>
              </h3>

              <p style={{ fontSize: 12, color: dim, fontFamily: "'DM Mono',monospace", marginBottom: 14 }}>
                📍 {exp.location}
              </p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      fontSize: 13.5, color: muted,
                      fontFamily: "'Geist','DM Sans',sans-serif",
                      lineHeight: 1.65, paddingLeft: 16, position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: D ? "#333" : "#ccc" }}>•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
