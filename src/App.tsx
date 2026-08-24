import { useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Clock3, Code2, ExternalLink, Mail, MapPin, Menu, Send, X } from 'lucide-react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import portraitImage from '@assets/Preply_pfp_1787494207196.jpeg';
import navAvatar from '@assets/nav_avatar.png';
import dataAnalysisCertificate from '@assets/Data_Analysis_certificate.png';
import pythonCertificate from '@assets/Python_IBM_certificate.png';
import googleAiCertificate from '@assets/Google_AI_Professional_certificate.png';
import ciscoCertificate from '@assets/IT_Essentials_certificate.png';
import ciscoPdf from '@assets/IT_Essentials_certificate.pdf';
import dataAnalysisPdf from '@assets/Data_Analysis_1787494624723.pdf';
import pythonPdf from '@assets/Python_IBM_1787494624724.pdf';
import googleAiPdf from '@assets/Google_AI_Professional_1787494624725.pdf';

const queryClient = new QueryClient();

type Skill = { name: string; group: string; level: string; width: string; detail: string; applied: string };
type Project = { number: string; category: string; title: string; description: string; meta: string[]; featured?: boolean; href: string };

const socials = [
  { label: 'GitHub', href: 'https://github.com/Arham-Suhail', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arham-suhail7', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/arrrh_am', icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1DS3J7fALx/', icon: FaFacebookF },
];

const skills: Skill[] = [
  { name: 'JavaScript / TypeScript', group: 'Languages', level: 'Proficient', width: '84%', detail: 'ES6+, async/await, typed interfaces, and component-driven frontend logic.', applied: 'Portfolio site, QuantumChat, Lasani Pizza Time' },
  { name: 'Python', group: 'Languages', level: 'Intermediate', width: '68%', detail: 'Data handling, scripting, and applied ML fundamentals from IBM coursework.', applied: 'Regression models, data analysis notebooks' },
  { name: 'C++', group: 'Languages', level: 'Intermediate', width: '64%', detail: 'Core data structures, algorithms, and manual memory handling.', applied: 'Comflix-DSA' },
  { name: 'SQL', group: 'Languages', level: 'Intermediate', width: '61%', detail: 'Relational schema design, joins, and query writing.', applied: 'Coursework and backend data modeling' },
  { name: 'React', group: 'Frontend', level: 'Proficient', width: '83%', detail: 'Component architecture, hooks, and state management for real interfaces.', applied: 'Portfolio site, QuantumChat, Lasani Pizza Time' },
  { name: 'Tailwind CSS', group: 'Frontend', level: 'Proficient', width: '81%', detail: 'Utility-first styling for fast, consistent, responsive UI.', applied: 'Portfolio site, Lasani Pizza Time' },
  { name: 'HTML / CSS', group: 'Frontend', level: 'Proficient', width: '87%', detail: 'Semantic markup and layout fundamentals underneath every framework.', applied: 'Roha Beauty Salon, all frontend work' },
  { name: 'Node.js / Express', group: 'Backend', level: 'Intermediate', width: '70%', detail: 'REST APIs, server logic, and middleware for full-stack apps.', applied: 'Lasani Pizza Time, QuantumChat backend' },
  { name: 'MongoDB', group: 'Backend', level: 'Intermediate', width: '66%', detail: 'Schema design and querying with MongoDB Atlas as the persistence layer.', applied: 'QuantumChat' },
  { name: 'Pandas / scikit-learn', group: 'AI / ML', level: 'Intermediate', width: '57%', detail: 'Data cleaning, regression pipelines, and model evaluation.', applied: 'IBM ML coursework, medical insurance dataset project' },
  { name: 'RAG systems', group: 'AI / ML', level: 'Beginner', width: '28%', detail: 'Learning how retrieval-augmented generation grounds LLM outputs in real data.', applied: 'Currently studying, not yet shipped' },
  { name: 'LLMs', group: 'AI / ML', level: 'Beginner', width: '28%', detail: 'Understanding how large language models work beneath the API layer.', applied: 'Currently studying, not yet shipped' },
  { name: 'Automations', group: 'AI / ML', level: 'Beginner', width: '28%', detail: 'Workflow automation connecting APIs and AI models.', applied: 'LinkedIn post automation via Make.com and Gemini API' },
  { name: 'Agentic AI', group: 'AI / ML', level: 'Beginner', width: '28%', detail: 'Exploring autonomous agents that can plan and act, not just respond.', applied: 'Currently studying, not yet shipped' },
  { name: 'Git / GitHub', group: 'Tools', level: 'Proficient', width: '78%', detail: 'Branching, pull requests, and collaborative version control.', applied: 'Every project, plus open-source contributions' },
  { name: 'GitHub Actions', group: 'Tools', level: 'Beginner', width: '35%', detail: 'Basic CI/CD workflows for automated builds and checks.', applied: 'Early experimentation' },
];

const projects: Project[] = [
  {
    number: '01',
    category: 'C++ / DSA',
    title: 'Comflix-DSA',
    description: 'A focused C++ playground for learning how data structures behave in the real world, from searching and sorting to graph traversal.',
    meta: ['C++', 'Algorithms', 'GitHub'],
    featured: true,
    href: 'https://github.com/Arham-Suhail',
  },
  {
    number: '02',
    category: 'Full-stack system',
    title: 'QuantumChat',
    description: 'Real-time chat built end-to-end with a forked client and server, WebStorm, and MongoDB Atlas as its persistence layer.',
    meta: ['MERN', 'Real-time', 'MongoDB Atlas'],
    href: 'https://github.com/Arham-Suhail',
  },
  {
    number: '03',
    category: 'Client project',
    title: 'Lasani Pizza Time',
    description: 'A paid restaurant build with a WhatsApp order flow, admin dashboard, and Replit DB quietly doing the work behind the scenes.',
    meta: ['React', 'Express', 'Replit DB'],
    href: 'https://github.com/Arham-Suhail',
  },
  {
    number: '04',
    category: 'Web / local business',
    title: 'Roha Beauty Salon',
    description: 'A light, static site for a home-based salon in Islamabad. Google Sheets keeps prices and deals live without a heavy CMS.',
    meta: ['Static', 'Google Sheets', 'WhatsApp'],
    href: 'https://github.com/Arham-Suhail',
  },
  {
    number: '05',
    category: 'AI / ML',
    title: 'Medical Insurance Price Predictor',
    description: 'A regression pipeline predicting insurance charges from a real dataset, covering everything from simple linear regression to polynomial and Ridge models.',
    meta: ['Python', 'Pandas', 'Scikit-learn', 'Regression'],
    href: 'https://github.com/Arham-Suhail/medical-insurance-price-prediction',
  },
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${delay} ${className}`}>{children}</div>;
}

function Socials({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <div className={variant === 'light' ? 'contact-socials' : 'hero-socials'} aria-label="Social links">
      {socials.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}>
          <Icon size={variant === 'light' ? 17 : 16} />
        </a>
      ))}
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['About', '#about'], ['Stack', '#stack'], ['Work', '#work'], ['Experience', '#experience'], ['Certs', '#certifications']];
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="wordmark" href="#top" onClick={navigate} data-testid="link-wordmark">
          <img className="wordmark-avatar" src={navAvatar} alt="Arham Suhail" />
          arham<span>.</span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={label} href={href} onClick={navigate} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
        </nav>
        <a className="nav-cta" href="#contact" onClick={navigate} data-testid="link-nav-connect">Connect <ArrowUpRight size={14} /></a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="hero" id="top" data-testid="section-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker eyebrow">SWE · Islamabad, Pakistan</div>
          <h1 className="hero-title display"><span>Arham</span><br /><span className="outline">Suhail</span><span className="accent">.</span></h1>
          <p className="hero-description">Full Stack Developer building AI/ML systems using LLMs, RAG, and autonomous agents.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo('#work')} data-testid="button-view-work">View work <ArrowDown size={15} /></button>
            <button className="button button-ghost" onClick={() => scrollTo('#contact')} data-testid="button-get-in-touch">Get in touch <ArrowUpRight size={15} /></button>
          </div>
          <Socials />
        </div>
        <div className="portrait-wrap" aria-label="Portrait of Arham Suhail">
          <div className="hero-stamp"><i /> currently building</div>
          <div className="portrait" data-testid="img-portrait"><img src={portraitImage} alt="Arham Suhail" /></div>
          <div className="portrait-label">portrait / Arham Suhail</div>
        </div>
      </div>
      <div className="scroll-note">scroll to explore</div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about" data-testid="section-about">
      <div className="container about-grid">
        <Reveal>
          <div className="eyebrow">01 / the context</div>
          <h2 className="section-heading display">Making things<br /><em>make sense.</em></h2>
        </Reveal>
        <Reveal className="about-side" delay="delay-2">
          <p className="mono">Software engineer, builder, tutor</p>
          <div className="about-copy">
            <p>Software Engineering student at <strong>COMSATS University Islamabad</strong>. Three semesters in, 3.8 CGPA, and more interested in what I can build than what I can memorize.</p>
            <p>Full-stack is my practical base: React, Node, MongoDB, shipped to real users, including a client's restaurant site with a live WhatsApp order system. AI and ML is next. Not surface-level integration, but the actual systems: LLMs, RAG, autonomous agents.</p>
            <p>I tutor too, mostly Data Structures and Algorithms. Explaining something well is a good way to find out if you actually understand it.</p>
          </div>
          <div className="fact-grid context-meta">
            <div className="fact"><strong>3.8</strong><span>Current CGPA</span></div>
            <div className="fact"><strong>SP25</strong><span>BSE cohort</span></div>
            <div className="fact"><strong>UTC+5</strong><span>Local time</span></div>
          </div>
          <div className="location-mark"><MapPin size={15} /> Islamabad, Pakistan</div>
        </Reveal>
      </div>
    </section>
  );
}

function Stack() {
  const filters = ['All', 'Languages', 'Frontend', 'Backend', 'AI / ML', 'Tools'];
  const [filter, setFilter] = useState('All');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const shown = useMemo(() => filter === 'All' ? skills : skills.filter(skill => skill.group === filter), [filter]);
  const active = skills.find(skill => skill.name === activeSkill) ?? null;
  return (
    <section className="section dark-section" id="stack" data-testid="section-stack">
      <div className="container">
        <Reveal className="skills-top">
          <div><div className="eyebrow">02 / the stack</div><h2 className="section-heading display">Tools for the<br /><em>next version.</em></h2></div>
          <p className="section-intro">These are the tools I reach for when I want to turn an idea into something people can actually use. I am still learning, but I know what I can build with them.</p>
        </Reveal>
        <Reveal delay="delay-1">
          <div className="filter-row" role="tablist" aria-label="Filter skills">
            {filters.map(item => <button key={item} className={`filter ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}
          </div>
        </Reveal>
        <div className={`skills-grid ${filter !== 'All' ? 'filtered' : ''}`}>
          {shown.map((skill, index) => (
            <Reveal key={skill.name} delay={index % 4 === 1 ? 'delay-1' : index % 4 === 2 ? 'delay-2' : index % 4 === 3 ? 'delay-3' : ''}>
              <article
                className={`skill-card ${activeSkill === skill.name ? 'active' : ''}`}
                onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                role="button"
                tabIndex={0}
                onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActiveSkill(activeSkill === skill.name ? null : skill.name); } }}
                data-testid={`card-skill-${skill.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}
              >
                <span className="skill-index">{String(index + 1).padStart(2, '0')} / {skill.group}</span>
                <h3>{skill.name}</h3>
                <div className="skill-level">{skill.level}</div>
                <div className="level-bar" aria-hidden="true"><span style={{ width: skill.width }} /></div>
              </article>
            </Reveal>
          ))}
        </div>
        {active && (
          <div className="skill-detail" data-testid="panel-skill-detail">
            <div className="skill-detail-top">
              <span className="skill-detail-tag">{active.group} · {active.level}</span>
              <button className="skill-detail-close" onClick={() => setActiveSkill(null)} data-testid="button-close-skill-detail">Close details <X size={14} /></button>
            </div>
            <h3>{active.name}</h3>
            <p className="skill-detail-desc">{active.detail}</p>
            <div className="skill-detail-applied"><Check size={14} /> Applied in: {active.applied}</div>
          </div>
        )}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects" id="work" data-testid="section-projects">
      <div className="container">
        <Reveal className="projects-head">
          <div><div className="eyebrow">03 / selected work</div><h2 className="section-heading display">Small systems.<br /><em>Real stakes.</em></h2></div>
          <p className="section-intro">A mix of coursework, client work, and side projects. Different briefs, same goal: build carefully, learn fast, and ship something useful.</p>
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.title} className={`project-card ${project.featured ? 'featured' : ''}`} delay={index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}>
              <article data-testid={`card-project-${project.number}`}>
                <div className="project-card-top"><span className="project-category">{project.number} / {project.category}</span>{project.featured && <span className="featured-label">featured</span>}</div>
                <h3 className="display">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-footer"><div className="project-meta">{project.meta.map(item => <span key={item}>{item}</span>)}</div><a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} data-testid={`link-project-${project.number}`}><ExternalLink size={19} /></a></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    ['Completed', 'CS Tutor', 'Global Tech Private Limited', 'Teaching'],
    ['Ongoing', 'CS Tutor', 'Preply', 'Teaching'],
    ['2026', 'AI Internship', 'Code Alpha', 'Internship'],
    ['Ongoing', 'A-Level Sociology', 'Cambridge 9699 study support', 'Mentoring'],
  ];
  return (
    <section className="section experience" id="experience" data-testid="section-experience">
      <div className="container">
        <Reveal><div className="eyebrow">04 / in the field</div><h2 className="section-heading display">Learning by<br /><em>showing up.</em></h2></Reveal>
        <div className="timeline">
          {items.map(([year, title, place, kind], index) => <Reveal key={`${title}-${place}`} delay={index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}><div className="timeline-item" data-testid={`row-experience-${index}`}><span className="timeline-year">{year}</span><div className="timeline-copy"><h3>{title}</h3><p>{place}</p></div><span className="timeline-kind">{kind}</span></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certs = [
    { number: '01', title: 'Google AI Professional Certificate', desc: 'Seven courses covering the foundations and practical shape of modern AI.', status: 'Completed', image: googleAiCertificate, href: googleAiPdf },
    { number: '02', title: 'IBM Python for Data Science, AI & Development', desc: 'The start of a deliberate sequence: Python, data, ML, then deeper systems.', status: 'Completed', image: pythonCertificate, href: pythonPdf },
    { number: '03', title: 'IBM Data Analysis with Python', desc: 'Turning raw data into something you can reason about.', status: 'Completed', image: dataAnalysisCertificate, href: dataAnalysisPdf },
    { number: '04', title: 'IBM Machine Learning with Python', desc: 'The next step in the sequence, currently in progress and grounded in practical models.', status: 'In progress' },
    { number: '05', title: 'Cisco IT Essentials', desc: 'Solid fundamentals for the systems underneath the code.', status: 'Completed', image: ciscoCertificate, href: ciscoPdf },
  ];
  return (
    <section className="section certs" id="certifications" data-testid="section-certifications">
      <div className="container">
        <Reveal><div className="eyebrow">05 / the runway</div><h2 className="section-heading display">Keep the<br /><em>curiosity on.</em></h2></Reveal>
        <div className="cert-grid">
          {certs.map(({ number, title, desc, status, image, href }, index) => <Reveal key={title} delay={index % 2 ? 'delay-1' : ''}><article className={`cert-card ${index > 0 ? 'side' : ''}`} data-testid={`card-certification-${number}`}><div className="cert-no">{number}</div>{image && href ? <a className="cert-photo" href={href} target="_blank" rel="noreferrer" aria-label={`Open ${title}`}><img src={image} alt={`${title} certificate`} /></a> : <div className="cert-photo" aria-label={`${title} photo placeholder`}>certificate<br />image slot</div>}<h3>{title}</h3><p>{desc}</p><div className="learning-line"><span className="cert-status">{status}</span></div></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', organization: '', message: '', email: '' });

  // Pageclip form endpoint (arham-portfolio site, Default form)
  const PAGECLIP_FORM_ACTION = 'https://send.pageclip.co/MEieM50Y02y20v53fD6O8gMxjxfK2ozT';

  useEffect(() => {
    if (document.querySelector('script[data-pageclip]')) return;
    const script = document.createElement('script');
    script.src = 'https://s.pageclip.co/v1/pageclip.js';
    script.async = true;
    script.setAttribute('data-pageclip', 'true');
    document.body.appendChild(script);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const formEl = event.currentTarget;
      const formData = new FormData(formEl);
      const response = await fetch(PAGECLIP_FORM_ACTION, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: '', organization: '', message: '', email: '' });
      } else {
        console.error('Pageclip submission failed', await response.text());
        alert('Something went wrong sending your message. Please try again or reach out directly via email/socials.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong sending your message. Please try again or reach out directly via email/socials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact" id="contact" data-testid="section-contact">
      <div className="container contact-grid">
        <Reveal>
          <div className="eyebrow">06 / open channel</div>
          <h2 className="section-heading display">Let's build something<br /><em>worth shipping.</em></h2>
          <p className="contact-intro">Tell me what you are building, learning, or stuck on. I am always interested in thoughtful work and the people behind it.</p>
          <div className="contact-details">
            <div className="contact-detail"><Clock3 size={16} /><div><small>Response time</small><strong>Usually within 24 hours</strong></div></div>
            <div className="contact-detail"><Code2 size={16} /><div><small>Current focus</small><strong>Full-stack systems + applied AI</strong></div></div>
            <div className="contact-detail"><Mail size={16} /><div><small>Direct line</small><strong>Open to a thoughtful conversation</strong></div></div>
          </div>
          <Socials variant="light" />
        </Reveal>
        <Reveal delay="delay-2">
          <div className="contact-form">
            {sent ? (
              <div className="form-success" data-testid="status-contact-success"><Check size={28} /><h3>Message received.</h3><p>Thanks for reaching out, {form.name || 'friend'}. I'll get back to you within 24 hours.</p><button className="button button-ghost" onClick={() => { setSent(false); setForm({ name: '', organization: '', message: '', email: '' }); }} data-testid="button-send-another">Send another note <ChevronRight size={14} /></button></div>
            ) : (
              <form onSubmit={submit} action={PAGECLIP_FORM_ACTION} className="pageclip-form" data-testid="form-contact">
                <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="What should I call you?" required data-testid="input-contact-name" /></div>
                <div className="form-field"><label htmlFor="email">Your email</label><input id="email" name="email" type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="Where should I reply?" required data-testid="input-contact-email" /></div>
                <div className="form-field"><label htmlFor="organization">Organization <span>(optional)</span></label><input id="organization" name="organization" value={form.organization} onChange={event => setForm({ ...form, organization: event.target.value })} placeholder="Where are you building from?" data-testid="input-contact-organization" /></div>
                <div className="form-field"><label htmlFor="message">The brief</label><textarea id="message" name="message" value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="A few words about the problem..." required data-testid="input-contact-message" /></div>
                <button type="submit" className="button button-primary pageclip-form__submit" disabled={submitting} data-testid="button-submit-contact"><span>{submitting ? 'Sending…' : 'Send message'}</span> <Send size={15} /></button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="container footer"><span>Made by Arham Suhail<span style={{ color: 'var(--orange)' }}>.</span></span><span>All rights reserved · Pakistan · 2026</span><a href="#top" data-testid="link-back-to-top">Back to top <ArrowUpRight size={12} /></a></footer>;
}

function Home() {
  return <div className="site-shell"><Header /><main><Hero /><About /><Stack /><Projects /><Experience /><Certifications /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;