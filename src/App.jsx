import { useState } from "react";

import StarField   from "./components/StarField";
import Nav         from "./components/Nav";
import Hero        from "./components/sections/Hero";
import Projects    from "./components/sections/Projects";
import Experiences from "./components/sections/Experiences";
import Skills      from "./components/sections/Skills";
import { Contact, Footer } from "./components/sections/ContactFooter";

export default function App() {
  const [dark, setDark] = useState(true);
  const D = dark;

  // Shared theme tokens passed down to sections
  const theme = {
    dark,
    fg:    D ? "#efefef" : "#0a0a0a",
    muted: D ? "#888"   : "#666",
    dim:   D ? "#555"   : "#aaa",
  };

  return (
    <div
      style={{
        background: D ? "#090909" : "#ffffff",
        color: theme.fg,
        minHeight: "100vh",
        transition: "background .3s, color .3s",
        position: "relative",
      }}
    >
      {/* ── Animated canvas background ── */}
      <StarField dark={D} />

      {/* ── Vignette overlay — keeps content readable over the background ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: D
            ? "radial-gradient(ellipse 90% 55% at 50% 0%, transparent 15%, rgba(9,9,9,0.6) 75%, rgba(9,9,9,0.96) 100%)"
            : "radial-gradient(ellipse 90% 55% at 50% 0%, transparent 15%, rgba(255,255,255,0.55) 75%, rgba(255,255,255,0.97) 100%)",
          transition: "background .35s",
        }}
      />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html  { scroll-behavior: smooth; }
          body  { -webkit-font-smoothing: antialiased; }
          ::-webkit-scrollbar       { width: 3px; }
          ::-webkit-scrollbar-thumb { background: ${D ? "#252525" : "#ddd"}; border-radius: 99px; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>

        <Nav dark={D} setDark={setDark} />

        <Hero        {...theme} />
        <Projects    {...theme} />
        <Experiences {...theme} />
        <Skills      {...theme} />
        <Contact     {...theme} />
        <Footer      dark={D}  />
      </div>
    </div>
  );
}
