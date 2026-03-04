export default function Hero({ fg, muted }) {
  const lines = [
    ["⚀", "Full-Stack Developer & AI Engineer — Building intelligent web experiences."],
    ["⚁", "Specializing in Next.js, TypeScript, and LangChain for AI-powered apps."],
    ["⚂", "Creating next-gen digital products that think, adapt, and deliver impact."],
  ];

  return (
    <section style={{ maxWidth: 672, margin: "0 auto", padding: "144px 24px 88px" }}>
      <h1
        style={{
          fontSize: "clamp(1.9rem,4.5vw,2.5rem)", fontWeight: 600,
          fontFamily: "'Geist','DM Sans',sans-serif",
          letterSpacing: "-0.03em", color: fg,
          marginBottom: 22, lineHeight: 1.15,
          animation: "fadeUp .65s cubic-bezier(.4,0,.2,1) both",
        }}
      >
        Rishav Agarwal
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {lines.map(([ico, txt], i) => (
          <p
            key={i}
            style={{
              fontSize: 14.5, color: muted, lineHeight: 1.6,
              fontFamily: "'Geist','DM Sans',sans-serif",
              animation: `fadeUp .65s cubic-bezier(.4,0,.2,1) ${0.08 + i * 0.09}s both`,
            }}
          >
            <span style={{ marginRight: 8, opacity: 0.6 }}>{ico}</span>
            {txt}
          </p>
        ))}
      </div>
    </section>
  );
}
