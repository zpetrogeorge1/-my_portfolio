# Rishav Portfolio — File Structure

```
src/
├── App.jsx                          # Root component — layout & theme state
│
├── data/
│   └── index.js                     # All static content (projects, experiences, PRs, skills)
│
├── hooks/
│   └── useReveal.js                 # useReveal hook + <Reveal> scroll-animation wrapper
│
└── components/
    ├── StarField.jsx                # Animated canvas background (stars / particle network)
    ├── Nav.jsx                      # Fixed top navigation bar
    ├── ProjectCard.jsx              # Individual project card with tech stack toggle
    ├── ui.jsx                       # Shared primitives: <Badge> and <SkillTag>
    │
    └── sections/
        ├── Hero.jsx                 # Hero headline + taglines
        ├── Projects.jsx             # Projects grid section
        ├── Experiences.jsx          # Work experience timeline
        ├── ProofOfWork.jsx          # PR tabs + list
        ├── Skills.jsx               # Skills pill grid
        └── ContactFooter.jsx        # "Get in touch" CTA + footer
```

## To update content
Edit **`src/data/index.js`** — projects, experiences, PRs, and skills all live there.

## To tweak the background
Edit **`src/components/StarField.jsx`** — `drawDark()` controls the star field, `drawLight()` controls the particle network.

## To change theme colours
The `theme` object in **`src/App.jsx`** defines `fg`, `muted`, and `dim` — update those to retheme the whole site.
