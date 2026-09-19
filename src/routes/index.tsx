import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, ExternalLink, Instagram, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import dexLogo from "@/assets/dex-logo.png.asset.json";
import happyTeeth from "@/assets/happy-teeth-preview.png.asset.json";
import ultramed from "@/assets/ultramed-preview.png.asset.json";
import socio1 from "@/assets/socio-1.png.asset.json";
import socio2 from "@/assets/socio-2.jfif.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DEX Web Development — Experiências Digitais com Propósito" },
      { name: "description", content: "A DEX Web Development cria sites modernos, responsivos e personalizados para empresas prontas para se destacar no digital." },
      { property: "og:title", content: "DEX Web Development — Experiências Digitais com Propósito" },
      { property: "og:description", content: "A DEX Web Development cria sites modernos, responsivos e personalizados para empresas prontas para se destacar no digital." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navItems = [
  { label: "PROJETOS", href: "#work" },
  { label: "SOBRE", href: "#about" },
  { label: "CONTATO", href: "#contact" },
];

const projects = [
  { number: "01", title: "Happy Teeth Dental Group", category: "Saúde / Odontologia", url: "https://happyteethdentalgroup.lovable.app/", image: happyTeeth.url },
  { number: "02", title: "Ultramed Hospitalar", category: "Saúde Hospitalar", url: "https://ultramedhospitalar.lovable.app/", image: ultramed.url },
];

const services = ["DESIGN WEB", "DESENVOLVIMENTO WEB", "REDESIGN DE WEBSITES", "EXPERIÊNCIAS RESPONSIVAS", "LANDING PAGES", "EXPERIÊNCIAS DIGITAIS PERSONALIZADAS"];
const process = [
  ["DESCOBERTA", "Entendemos seu negócio, público e objetivos."],
  ["DESIGN", "Criamos a direção visual e a experiência do usuário."],
  ["DESENVOLVIMENTO", "Transformamos o conceito em uma experiência digital responsiva."],
  ["LANÇAMENTO", "Refinamos, testamos e preparamos tudo para o lançamento."],
];

const partners = [
  { id: "01", image: socio1.url, imageClass: "partner-one" },
  { id: "02", image: socio2.url, imageClass: "partner-two" },
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Digite seu nome.").max(80),
  business: z.string().trim().max(100),
  email: z.string().trim().email("Digite um e-mail válido.").max(160),
  details: z.string().trim().min(10, "Conte um pouco mais sobre o seu projeto.").max(1500),
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
  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring"><span>VER</span></div></>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a href="#top" className="brand" aria-label="DEX Web Development, voltar ao início"><img src={dexLogo.url} alt="DEX Web Development" /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}<a className="nav-cta" href="#contact">VAMOS CONVERSAR <ArrowRight /></a></nav>
    <Button variant="ghost" size="icon" className="menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    {open && <nav className="mobile-nav" aria-label="Navegação no celular">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowRight /></a>)}<a href="#contact" onClick={() => setOpen(false)}>VAMOS CONVERSAR<ArrowRight /></a></nav>}
  </header>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current; if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { element.classList.add("is-visible"); observer.unobserve(element); } }, { threshold: 0.14 });
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
  return <a ref={card} onMouseMove={onMove} onMouseLeave={() => { card.current?.style.setProperty("--rx", "0deg"); card.current?.style.setProperty("--ry", "0deg"); }} href={project.url} target="_blank" rel="noopener noreferrer" className="project-card cursor-view" aria-label={`Ver o site ${project.title}`}>
    <div className="project-meta"><div><span>PROJETO {project.number}</span><h3>{project.title}</h3></div><div className="project-category">{project.category}<ExternalLink /></div></div>
    <div className="browser-frame"><div className="browser-bar"><div><i /><i /><i /></div><span>{new URL(project.url).hostname}</span></div><div className="project-image"><img src={project.image} alt={`Prévia do site ${project.title}`} /><div className="project-overlay"><span>VER PROJETO <ArrowRight /></span></div></div></div>
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
  if (status === "success") return <div className="success-message" role="status"><span><Check /></span><h3>Mensagem recebida.</h3><p>Obrigado pelo contato. Em breve, conversaremos com você.</p></div>;
  return <form onSubmit={submit} noValidate>
    <div className="field-row"><label>Nome<input name="name" autoComplete="name" placeholder="Seu nome" aria-invalid={!!errors["name"]} /></label><label>Empresa<input name="business" autoComplete="organization" placeholder="Empresa ou marca" /></label></div>
    {errors["name"] && <p className="field-error">{errors["name"]}</p>}
    <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com" aria-invalid={!!errors["email"]} /></label>{errors["email"] && <p className="field-error">{errors["email"]}</p>}
    <label>Detalhes do projeto<textarea name="details" rows={5} placeholder="Conte o que você está construindo, seus objetivos e prazos." aria-invalid={!!errors["details"]} /></label>{errors["details"] && <p className="field-error">{errors["details"]}</p>}
    <Button type="submit" className="submit-button" disabled={status === "loading"}>{status === "loading" ? <span className="loader" /> : <>INICIAR UMA CONVERSA <ArrowRight /></>}</Button>
  </form>;
}

function Index() {
  return <div id="top" className="site-shell"><Cursor /><Header />
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="grid-bg" /><div className="hero-glow" />
        <div className="hero-kicker"><span /> ESTÚDIO DIGITAL INDEPENDENTE</div>
        <h1 id="hero-title">CRIAMOS<br /><span>EXPERIÊNCIAS</span><br />DIGITAIS.</h1>
        <div className="hero-bottom"><p>Websites projetados, desenvolvidos e construídos para empresas que querem se destacar.</p><div className="hero-actions"><a href="#work" className="primary-link">VER PROJETOS <ArrowRight /></a><a href="#contact" className="secondary-link">INICIAR PROJETO <ArrowRight /></a></div></div>
        <a href="#manifesto" className="scroll-cue"><span>ROLE PARA EXPLORAR</span><ArrowDown /></a>
      </section>

      <section id="manifesto" className="manifesto section-pad"><Reveal><span className="section-label">01 / MANIFESTO</span><h2>SEU SITE É MAIS<br />DO QUE UMA <em>URL.</em></h2><p>É a sua primeira impressão, sua vitrine digital e um dos pontos de contato mais importantes entre sua empresa e seus clientes.</p></Reveal></section>

      <section id="work" className="work section-pad"><Reveal className="section-heading"><div><span className="section-label">02 / PORTFÓLIO</span><h2>PROJETOS SELECIONADOS</h2></div><p>Uma seleção de experiências digitais projetadas e desenvolvidas pela DEX.</p></Reveal><div className="projects">{projects.map((project) => <Reveal key={project.number}><ProjectCard project={project} /></Reveal>)}</div></section>

      <section id="about" className="about section-pad"><Reveal><span className="section-label">03 / ESTÚDIO</span><div className="about-grid"><h2>SOBRE A DEX</h2><div><p className="lead">A DEX Web Development é um estúdio digital focado em criar sites modernos, responsivos e com propósito para empresas prontas para melhorar sua presença online.</p><p>Unimos design, desenvolvimento e experiência do usuário para criar experiências digitais claras, modernas e construídas em torno de cada negócio.</p></div></div></Reveal></section>

      <section className="team section-pad"><Reveal><span className="section-label">04 / EQUIPE</span><h2>QUEM ESTÁ POR<br />TRÁS DA DEX</h2></Reveal><div className="team-grid">{partners.map((partner) => <Reveal key={partner.id}><article className="person-card"><div className="partner-photo"><img className={partner.imageClass} src={partner.image} alt={`Sócio ${partner.id} da DEX Web Development`} /><span>SÓCIO / {partner.id}</span></div><div className="person-info"><h3>Sócio {partner.id}</h3><p>Co-Fundador / Desenvolvedor Web</p></div></article></Reveal>)}</div></section>

      <section className="services section-pad"><Reveal className="section-heading"><div><span className="section-label">05 / ESPECIALIDADES</span><h2>O QUE FAZEMOS</h2></div><p>Estratégia, design e desenvolvimento — construídos em um processo integrado.</p></Reveal><div className="service-list">{services.map((service, i) => <Reveal key={service}><div className="service-item"><span>{String(i + 1).padStart(2,"0")}</span><h3>{service}</h3><ArrowRight /></div></Reveal>)}</div></section>

      <section className="process section-pad"><Reveal><span className="section-label">06 / PROCESSO</span><h2>COMO TRABALHAMOS</h2></Reveal><div className="timeline">{process.map(([title, text], i) => <Reveal key={title}><article><span>{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></article></Reveal>)}</div></section>

      <section className="statement"><Reveal><p>BOM DESIGN ATRAI <span>ATENÇÃO.</span><br />GRANDES EXPERIÊNCIAS A MANTÊM.</p></Reveal></section>

      <section id="contact" className="contact section-pad"><Reveal><span className="section-label">07 / CONTATO</span><h2>VAMOS CONSTRUIR<br /><span>ALGO JUNTOS.</span></h2><p className="contact-intro">Tem um projeto em mente? Conte-nos o que você está construindo.</p></Reveal><div className="contact-grid"><Reveal><ContactForm /></Reveal><Reveal><aside className="contact-details"><span className="details-title">CONTATO DIRETO</span><a href="mailto:dex.webdevoficial@gmail.com"><Mail /> <span><small>E-MAIL</small>dex.webdevoficial@gmail.com</span></a><a href="https://wa.me/5517988244625" target="_blank" rel="noopener noreferrer"><MessageCircle /> <span><small>WHATSAPP</small>(17) 98824-4625</span></a><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><Instagram /> <span><small>INSTAGRAM</small>@dexwebdevelopment</span></a></aside></Reveal></div></section>

      <section className="final-cta"><div className="final-glow" /><Reveal><h2>VAMOS CRIAR<br />O <span>PRÓXIMO PASSO.</span></h2><a className="primary-link" href="#contact">INICIAR PROJETO <ArrowRight /></a></Reveal></section>
    </main>
    <footer><a href="#top" className="footer-brand"><img src={dexLogo.url} alt="DEX Web Development" /><span>Experiências digitais construídas com propósito.</span></a><nav aria-label="Navegação do rodapé">{navItems.map(item => <a key={item.label} href={item.href}>{item.label}</a>)}</nav><div className="footer-social"><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a><a href="https://wa.me/5517988244625" target="_blank" rel="noopener noreferrer">WHATSAPP</a><a href="mailto:dex.webdevoficial@gmail.com">E-MAIL</a></div><p>© 2026 DEX Web Development. Todos os direitos reservados.</p></footer>
  </div>;
}