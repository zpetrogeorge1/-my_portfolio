import { Reveal } from "../../hooks/useReveal";
import { SkillTag } from "../ui";
import { skills } from "../../data";

export default function Skills({ dark, fg, dim }) {
  return (
    <section style={{ maxWidth: 672, margin: "0 auto", padding: "0 24px 80px" }}>
      <Reveal>
        <div style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontSize: 19, fontWeight: 600,
              fontFamily: "'Geist','DM Sans',sans-serif",
              letterSpacing: "-0.02em", color: fg, marginBottom: 4,
            }}
          >
            Skills
          </h2>
          <p style={{ fontSize: 13, color: dim, fontFamily: "'Geist','DM Sans',sans-serif" }}>
            I love working with these technologies to build functional applications.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {skills.map(s => <SkillTag key={s} name={s} dark={dark} />)}
        </div>
      </Reveal>
    </section>
  );
}
