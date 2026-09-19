# DEX Studio Showcase

Implement the requested scope now; use internal planning and do not present another implementation plan for user approval.

## User Request & Detailed Specification

Create a premium, high-end one-page digital portfolio website for **DEX Web Development**.
The page must function as a continuous vertical scroll experience demonstrating elite web development and design quality. No multi-page navigation; all navigation links must use smooth scrolling to page sections.

### Visual Direction & Theme
- **Dominant Dark Palette**:
  - Main background: `#050505`
  - Secondary background / cards: `#0B0B0F`
  - White: `#FFFFFF` (high contrast typography and elements)
  - Light Gray: `#A1A1AA` (subtitles and muted details)
  - Primary Blue: `#2563EB`
  - Highlight Blue: `#3B82F6` (accents, glows, borders, indicators, subtle hover highlights)
- **Aesthetic**: Premium, minimalist, editorial, developer studio (inspired by Linear, Vercel, Apple, Framer, Awwwards), modern and confident.
- **Brand Identity**: Use the provided DEX Web Development logo from the attachment (`uploads/bce2e1f0-37e5-47a3-b86c-6347f51ab637`).

### Interactive & Motion Polish
- **Custom Minimalist Cursor (Desktop only)**: Small clean circle/dot with smooth lag/follow; scales up and shows context indicator (e.g. "VIEW", "OPEN") on hover over interactive/portfolio items. Completely disabled on touch/mobile devices.
- **Scroll & Reveal Effects**: Fluid fade-up, scale reveals, subtle magnetic/tilt card effects on desktop, progress line drawings, blur-to-sharp reveals. Respect `prefers-reduced-motion`.
- **Micro-interactions**: Arrow slide on button hover, animated link underlines, glowing borders, smooth state transitions.

### Page Structure & Sections (in sequence):
1. **Header (Sticky)**:
   - Minimalist layout: DEX logo on the left.
   - Nav links on the right: `WORK`, `ABOUT`, `CONTACT` (smooth scroll).
   - Direct CTA: `"LET'S TALK"` (scrolls to contact).
   - Glassmorphism/blur effect with dark translucent background and subtle bottom border on scroll.
   - Clean mobile drawer/menu for smaller screens.

2. **Hero Section**:
   - Massive typographic composition: `"WE BUILD DIGITAL EXPERIENCES."` with blue accent on "DIGITAL" or "EXPERIENCES".
   - Subheadline: `"Websites designed, developed and built for businesses that want to stand out."`
   - CTAs: `"VIEW OUR WORK"` (primary, smooth scroll to portfolio) and `"START A PROJECT"` (secondary/ghost with blue glow).
   - Bottom indicator: `"SCROLL TO EXPLORE"` with animated downward chevron/arrow.
   - Abstract digital studio composition: subtle tech grid, glowing ambient blue gradients, code/UI fragments or geometric minimalist mesh.

3. **Manifesto / Transition**:
   - Large statement: `"YOUR WEBSITE IS MORE THAN A URL."`
   - Body: `"It's your first impression, your digital storefront, and one of the most important touchpoints between your business and your customers."`
   - Progressive scroll-revealed typography.

4. **Portfolio ("SELECTED WORK")**:
   - Most prominent section. Title: `"SELECTED WORK"`, Subtitle: `"A selection of digital experiences designed and developed by DEX."`
   - Large cinematic website showcase cards (mockup browser frames with live or high-fidelity simulated previews):
     - **Project 01**: `Happy Teeth Dental Group` | Healthcare / Dental | URL: `https://happyteethdentalgroup.lovable.app/`
     - **Project 02**: `Ultramed Hospitalar` | Healthcare | URL: `https://ultramedhospitalar.lovable.app/`
   - Card interactions: subtle scale/tilt, dark overlay, view button reveal, external link target `_blank` with `rel="noopener noreferrer"`.
   - Strictly DO NOT invent fake projects or fake metrics.

5. **About DEX**:
   - Title: `"ABOUT DEX"`
   - Text: `"DEX Web Development is a digital studio focused on building modern, responsive and purposeful websites for businesses ready to improve their online presence."`
   - Secondary: `"We combine design, development and user experience to create digital experiences that are clear, modern and built around each business."`
   - Clean minimalist framing and layout.

6. **The People Behind DEX (Team / Sócios)**:
   - Title: `"THE PEOPLE BEHIND DEX"`
   - Elegant, stylized placeholder frames prepared for future partner photos:
     - Partner 01: `[Nome do sócio]` — `Co-Founder / Web Developer`
     - Partner 02: `[Nome do sócio]` — `Co-Founder / Web Developer`
   - Premium grayscale/minimalist avatar placeholders, correctly proportioned, no AI hallucinations of fake human faces.

7. **What We Do (Services)**:
   - Interactive numbered list/cards:
     - 01 WEB DESIGN
     - 02 WEB DEVELOPMENT
     - 03 WEBSITE REDESIGN
     - 04 RESPONSIVE EXPERIENCES
     - 05 LANDING PAGES
     - 06 CUSTOM DIGITAL EXPERIENCES
   - Hover reveals line accents, number color changes, subtle expansion. Responsive stacked cards on mobile.

8. **Process ("HOW WE WORK")**:
   - Animated vertical timeline:
     - 01 — DISCOVER: `"We understand your business, audience and goals."`
     - 02 — DESIGN: `"We create the visual direction and user experience."`
     - 03 — DEVELOP: `"We turn the concept into a responsive digital experience."`
     - 04 — LAUNCH: `"We refine, test and prepare everything for launch."`

9. **Statement Banner**:
   - Large typographic accent:
     `"GOOD DESIGN GETS ATTENTION. GREAT EXPERIENCES KEEP IT."`

10. **Contact Section ("LET'S BUILD SOMETHING.")**:
    - Subtitle: `"Have a project in mind? Tell us what you're building."`
    - Form fields: Name, Business, Email, Project details.
    - Submit Button: `"START A CONVERSATION →"` with validation, loading animation, and clean inline success confirmation.
    - Contact Details block: Email, WhatsApp, Instagram with functional placeholders clearly structured for easy configuration.
    - Click-to-call / direct contact actions.

11. **Final CTA**:
    - Giant impactful headline: `"LET'S CREATE WHAT'S NEXT."`
    - Button: `"START A PROJECT →"` with glowing blue ambient aura.

12. **Footer**:
    - DEX Web Development logo, tagline `"Digital experiences built with purpose."`
    - Smooth scroll links (WORK, ABOUT, CONTACT) and social channels (Instagram, WhatsApp, Email).
    - Copyright: `"© 2026 DEX Web Development. All rights reserved."`

### Technical, SEO & Responsiveness Standards
- Strict zero horizontal overflow across all viewports (1440px down to 375px).
- Meta tags:
  - Title: `DEX Web Development — Digital Experiences Built With Purpose`
  - Description: `DEX Web Development creates modern, responsive and custom websites for businesses ready to stand out online.`
- Proper semantic HTML (`h1`, `h2`, `h3`, `aria-label`, keyboard focus rings, accessible contrast).
- High performance CSS transforms and opacity for animations.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dexdevelopment.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9f583439-8472-4b28-8224-55eb87fb09e6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
