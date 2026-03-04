import { Reveal } from "../../hooks/useReveal";
import ProjectCard from "../ProjectCard";
import { projects } from "../../data";

export default function Projects({ dark, fg, muted, dim }) {
  return (
    <section id="projects" style={{ maxWidth: 672, margin: "0 auto", padding: "0 24px 80px" }}>
      <Reveal>
        <h2
          style={{
            fontSize: 19, fontWeight: 600,
            fontFamily: "'Geist','DM Sans',sans-serif",
            letterSpacing: "-0.02em", color: fg, marginBottom: 20,
          }}
        >
          Projects
        </h2>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <ProjectCard p={p} dark={dark} fg={fg} muted={muted} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href="#"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5, marginTop: 18,
            fontSize: 13, color: dim, textDecoration: "none",
            fontFamily: "'Geist','DM Sans',sans-serif",
            transition: "color .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = fg}
          onMouseLeave={e => e.currentTarget.style.color = dim}
        >
          View all projects <span style={{ fontSize: 10 }}>→</span>
        </a>
      </Reveal>
    </section>
  );
}
