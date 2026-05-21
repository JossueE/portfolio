# Jossue Espinoza — Portfolio

A modern, dynamic personal portfolio for **Jossue Espinoza**, Robotics & Autonomous Systems Engineer. Built with a premium, futuristic, **grayscale liquid-glass** aesthetic inspired by Apple Vision Pro / iOS, adapted for a robotics engineering portfolio.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom grayscale + glass design system
- **Framer Motion** for micro-interactions and reveal animations
- **Lucide React** icons
- Data-driven projects (`src/data/projects.ts`)
- Fully responsive: desktop, tablet, mobile
- Dark by default with optional grayscale light mode

## Project structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Metadata + OpenGraph + root layout
│   │   ├── page.tsx          # Composes all sections
│   │   └── globals.css       # Glass design tokens & utilities
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── FloatingShapes.tsx
│   │   ├── FloatingKeywords.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── Skills.tsx
│   │   ├── SkillBadge.tsx
│   │   ├── Pipeline.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── GlassPanel.tsx
│   │   └── SectionHeader.tsx
│   ├── data/
│   │   ├── projects.ts       # All projects in one place
│   │   └── skills.ts         # Grouped skills
│   └── lib/
│       └── utils.ts          # cn(), YouTube helpers
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Featured Projects

All projects are rendered dynamically from `src/data/projects.ts`. Each one has:

- Title, tagline, description
- Categories: `AI · Planning · Control · Simulation · Robotics`
- Tags / technologies
- GitHub link(s)
- YouTube demo + thumbnail / embedded player
- Modal detail view with **Problem / Solution / Architecture / Contribution / Tech / Learnings / Pipeline**

Current projects included:

1. **Local LLM for Robots** — Offline voice intelligence pipeline (Wake Word → STT → LLM → TTS).
2. **Path Planning Dynamic & NMPC Controller** — ROS 2 stack: ROI filtering, clustering, occupancy grids, tree-based A\*, Lanelet2, NMPC with CasADi + IPOPT.
3. **Autonomous Robot Simulation** — ROS 2 Jazzy + Gazebo Harmonic, LiDAR/IMU, FAST-LIO, SLAM.
4. **Puzzlebot — Line Follower Car** — Team project with line follower, vision, and control, recognized by Manchester Robotics.

To add a new project, just append a new entry to the `projects` array in `src/data/projects.ts` — the UI will pick it up automatically (cards, filters, modal, search).

## Design system

- **Palette:** strictly grayscale — black, white, silver, graphite, frosted gray.
- **Glass:** `GlassPanel` component with backdrop blur, soft inner highlight, border edge, noise texture, sheen on hover.
- **Background:** floating blurred glass shapes, drifting orbs, subtle grid, noise texture, animated keywords.
- **Typography:** large display titles, tight tracking, clean body text, mono labels.
- **Motion:** Framer Motion for staggered reveals; reduced-motion friendly.

## Run locally

Requirements: **Node 18+** (Node 22 confirmed working) and **npm**.

```bash
# from the project root
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Customization tips

- Swap projects in `src/data/projects.ts`.
- Adjust skill groups in `src/data/skills.ts`.
- Tweak the grayscale tokens and glass tokens in `tailwind.config.ts` and `src/app/globals.css`.
- The navbar includes a grayscale light-mode toggle; both modes stay strictly monochrome.

## SEO

`src/app/layout.tsx` defines:

- Title: *Jossue Espinoza | Robotics & Autonomous Systems Portfolio*
- Description: *Portfolio of Jossue Espinoza, focused on ROS 2, autonomous robots, simulation, path planning, NMPC control, SLAM, and local AI for robotics.*
- OpenGraph + Twitter metadata
- Themed viewport for light/dark
