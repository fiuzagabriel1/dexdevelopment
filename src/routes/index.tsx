import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, ExternalLink, Instagram, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import dexLogo from "@/assets/dex-logo.png.asset.json";
import happyTeeth from "@/assets/happy-teeth-preview.png.asset.json";
import ultramed from "@/assets/ultramed-preview.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DEX Web Development — Digital Experiences Built With Purpose" },
      { name: "description", content: "DEX Web Development creates modern, responsive and custom websites for businesses ready to stand out online." },
      { property: "og:title", content: "DEX Web Development — Digital Experiences Built With Purpose" },
      { property: "og:description", content: "DEX Web Development creates modern, responsive and custom websites for businesses ready to stand out online." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navItems = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const projects = [
  { number: "01", title: "Happy Teeth Dental Group", category: "Healthcare / Dental", url: "https://happyteethdentalgroup.lovable.app/", image: happyTeeth.url },
  { number: "02", title: "Ultramed Hospitalar", category: "Healthcare", url: "https://ultramedhospitalar.lovable.app/", image: ultramed.url },
];

const services = ["WEB DESIGN", "WEB DEVELOPMENT", "WEBSITE REDESIGN", "RESPONSIVE EXPERIENCES", "LANDING PAGES", "CUSTOM DIGITAL EXPERIENCES"];
const process = [
  ["DISCOVER", "We understand your business, audience and goals."],
  ["DESIGN", "We create the visual direction and user experience."],
  ["DEVELOP", "We turn the concept into a responsive digital experience."],
  ["LAUNCH", "We refine, test and prepare everything for launch."],
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  business: z.string().trim().max(100),
  email: z.string().trim().email("Please enter a valid email.").max(160),
  details: z.string().trim().min(10, "Please share a little more about your project.").max(1500),
});

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let x = -100, y = -100, rx = -100, ry = -100;
    const move = (event: globalThis.MouseEvent) => { x = event.clientX; y = event.clientY; };
    const tick = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move); frame = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(frame); };
  }, []);
  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring"><span>VIEW</span></div></>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a href="#top" className="brand" aria-label="DEX Web Development, back to top"><img src={dexLogo.url} alt="DEX Web Development" /></a>
    <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}<a className="nav-cta" href="#contact">LET&apos;S TALK <ArrowRight /></a></nav>
    <Button variant="ghost" size="icon" className="menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowRight /></a>)}<a href="#contact" onClick={() => setOpen(false)}>LET&apos;S TALK<ArrowRight /></a></nav>}
  </header>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current; if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { element.classList.add("is-visible"); observer.unobserve(element); } }, { threshold: 0.14 });
    observer.observe(element); return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const card = useRef<HTMLAnchorElement>(null);
  const onMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches || !card.current) return;
    const rect = card.current.getBoundingClientRect();
    card.current.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - .5) * -2.2}deg`);
    card.current.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 2.2}deg`);
  };
  return <a ref={card} onMouseMove={onMove} onMouseLeave={() => { card.current?.style.setProperty("--rx", "0deg"); card.current?.style.setProperty("--ry", "0deg"); }} href={project.url} target="_blank" rel="noopener noreferrer" className="project-card cursor-view" aria-label={`View ${project.title} website`}>
    <div className="project-meta"><div><span>PROJECT {project.number}</span><h3>{project.title}</h3></div><div className="project-category">{project.category}<ExternalLink /></div></div>
    <div className="browser-frame"><div className="browser-bar"><div><i /><i /><i /></div><span>{new URL(project.url).hostname}</span></div><div className="project-image"><img src={project.image} alt={`${project.title} website preview`} /><div className="project-overlay"><span>VIEW LIVE SITE <ArrowRight /></span></div></div></div>
  </a>;
}

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const result = formSchema.safeParse(Object.fromEntries(form));
    if (!result.success) { setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]))); return; }
    setErrors({}); setStatus("loading"); window.setTimeout(() => setStatus("success"), 850);
  };
  if (status === "success") return <div className="success-message" role="status"><span><Check /></span><h3>Message received.</h3><p>Thanks for reaching out. We&apos;ll be in touch soon.</p></div>;
  return <form onSubmit={submit} noValidate>
    <div className="field-row"><label>Name<input name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} /></label><label>Business<input name="business" autoComplete="organization" placeholder="Company or brand" /></label></div>
    {errors.name && <p className="field-error">{errors.name}</p>}
    <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} /></label>{errors.email && <p className="field-error">{errors.email}</p>}
    <label>Project details<textarea name="details" rows={5} placeholder="Tell us what you're building, your goals and timeline." aria-invalid={!!errors.details} /></label>{errors.details && <p className="field-error">{errors.details}</p>}
    <Button type="submit" className="submit-button" disabled={status === "loading"}>{status === "loading" ? <span className="loader" /> : <>START A CONVERSATION <ArrowRight /></>}</Button>
  </form>;
}

function Index() {
  return <div id="top" className="site-shell"><Cursor /><Header />
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="grid-bg" /><div className="hero-glow" />
        <div className="hero-kicker"><span /> INDEPENDENT DIGITAL STUDIO</div>
        <h1 id="hero-title">WE BUILD<br /><span>DIGITAL</span><br />EXPERIENCES.</h1>
        <div className="hero-bottom"><p>Websites designed, developed and built for businesses that want to stand out.</p><div className="hero-actions"><a href="#work" className="primary-link">VIEW OUR WORK <ArrowRight /></a><a href="#contact" className="secondary-link">START A PROJECT <ArrowRight /></a></div></div>
        <a href="#manifesto" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown /></a>
      </section>

      <section id="manifesto" className="manifesto section-pad"><Reveal><span className="section-label">01 / MANIFESTO</span><h2>YOUR WEBSITE IS<br />MORE THAN A <em>URL.</em></h2><p>It&apos;s your first impression, your digital storefront, and one of the most important touchpoints between your business and your customers.</p></Reveal></section>

      <section id="work" className="work section-pad"><Reveal className="section-heading"><div><span className="section-label">02 / PORTFOLIO</span><h2>SELECTED WORK</h2></div><p>A selection of digital experiences designed and developed by DEX.</p></Reveal><div className="projects">{projects.map((project) => <Reveal key={project.number}><ProjectCard project={project} /></Reveal>)}</div></section>

      <section id="about" className="about section-pad"><Reveal><span className="section-label">03 / STUDIO</span><div className="about-grid"><h2>ABOUT DEX</h2><div><p className="lead">DEX Web Development is a digital studio focused on building modern, responsive and purposeful websites for businesses ready to improve their online presence.</p><p>We combine design, development and user experience to create digital experiences that are clear, modern and built around each business.</p></div></div></Reveal></section>

      <section className="team section-pad"><Reveal><span className="section-label">04 / TEAM</span><h2>THE PEOPLE<br />BEHIND DEX</h2></Reveal><div className="team-grid">{[1,2].map((n) => <Reveal key={n}><article className="person-card"><div className="avatar-placeholder" aria-label="Partner photo placeholder"><div className="avatar-head" /><div className="avatar-body" /><span>PHOTO / 0{n}</span></div><div className="person-info"><h3>[Nome do sócio]</h3><p>Co-Founder / Web Developer</p></div></article></Reveal>)}</div></section>

      <section className="services section-pad"><Reveal className="section-heading"><div><span className="section-label">05 / CAPABILITIES</span><h2>WHAT WE DO</h2></div><p>Strategy, design and development—built as one connected process.</p></Reveal><div className="service-list">{services.map((service, i) => <Reveal key={service}><div className="service-item"><span>{String(i + 1).padStart(2,"0")}</span><h3>{service}</h3><ArrowRight /></div></Reveal>)}</div></section>

      <section className="process section-pad"><Reveal><span className="section-label">06 / PROCESS</span><h2>HOW WE WORK</h2></Reveal><div className="timeline">{process.map(([title, text], i) => <Reveal key={title}><article><span>{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></article></Reveal>)}</div></section>

      <section className="statement"><Reveal><p>GOOD DESIGN GETS <span>ATTENTION.</span><br />GREAT EXPERIENCES KEEP IT.</p></Reveal></section>

      <section id="contact" className="contact section-pad"><Reveal><span className="section-label">07 / CONTACT</span><h2>LET&apos;S BUILD<br /><span>SOMETHING.</span></h2><p className="contact-intro">Have a project in mind? Tell us what you&apos;re building.</p></Reveal><div className="contact-grid"><Reveal><ContactForm /></Reveal><Reveal><aside className="contact-details"><span className="details-title">DIRECT CONTACT</span><a href="mailto:hello@dexwebdevelopment.com"><Mail /> <span><small>EMAIL</small>hello@dexwebdevelopment.com</span></a><a href="https://wa.me/000000000000" target="_blank" rel="noopener noreferrer"><MessageCircle /> <span><small>WHATSAPP</small>Configure number</span></a><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><Instagram /> <span><small>INSTAGRAM</small>@dexwebdevelopment</span></a><p>Contact details are ready to be configured with your final accounts.</p></aside></Reveal></div></section>

      <section className="final-cta"><div className="final-glow" /><Reveal><h2>LET&apos;S CREATE<br />WHAT&apos;S <span>NEXT.</span></h2><a className="primary-link" href="#contact">START A PROJECT <ArrowRight /></a></Reveal></section>
    </main>
    <footer><a href="#top" className="footer-brand"><img src={dexLogo.url} alt="DEX Web Development" /><span>Digital experiences built with purpose.</span></a><nav aria-label="Footer navigation">{navItems.map(item => <a key={item.label} href={item.href}>{item.label}</a>)}</nav><div className="footer-social"><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a><a href="https://wa.me/000000000000" target="_blank" rel="noopener noreferrer">WHATSAPP</a><a href="mailto:hello@dexwebdevelopment.com">EMAIL</a></div><p>© 2026 DEX Web Development. All rights reserved.</p></footer>
  </div>;
}