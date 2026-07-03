import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

const RESUME_URL = "/KirtanPatel_CV.pdf";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "opensource", label: "Open Source" },
  { id: "projects", label: "Projects" },
  { id: "htb", label: "Hack The Box" },
  { id: "contact", label: "Contact" },
];

const skillGroups = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "SQL"] },
  { label: "Frameworks", items: ["React", "Node.js", "Express.js", "Next.js", "Flask", "JavaFX"] },
  { label: "ML / LLM", items: ["scikit-learn", "Ollama", "Streamlit", "TensorFlow.js"] },
  { label: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { label: "Tooling", items: ["Git", "Docker", "Linux", "Postman", "Vercel"] },
  { label: "Security", items: ["Wireshark", "Burp Suite", "Nmap", "Metasploit", "Kali Linux"] },
];

const workExperience = [
  {
    role: "IT Helpdesk Support Manager",
    org: "Technology Solutions, Office of the Vice Chancellor for Innovation — UIC",
    location: "Chicago, IL",
    period: "Dec 2024 - Present",
    bullets: [
      "Serve as tier-2 helpdesk support, handling escalated tickets in TeamDynamix (TDX) covering classroom network setup, AV systems, and campus-wide technology issues.",
      "Diagnose and repair laptops and client devices; provide direct support to faculty, staff, and students across campus.",
      "Interviewed 8 of 21 candidates and authored troubleshooting documentation adopted across the support team.",
      "Manage 30 printers across East Campus; streamlined operations to 24 active units, reducing average downtime from 6 units to 1 and saving thousands annually.",
    ],
  },
  {
    role: "Classroom Technology Support Specialist",
    org: "Technology Solutions, Office of the Vice Chancellor for Innovation — UIC",
    location: "Chicago, IL",
    period: "Aug 2022 - Dec 2024",
    bullets: [
      "Assisted professors with classroom equipment issues including projectors, audio systems, and lecture capture setups to ensure uninterrupted instruction.",
      "Set up and configured computer labs for courses and campus events.",
      "Trained and mentored incoming support specialists, building their ability to independently resolve classroom technology issues.",
      "Provided printer support and maintenance across assigned campus locations.",
    ],
  },
];

const projectEntries = [
  // {
  //   title: "llm-thorn",
  //   status: "PyPI Package",
  //   meta: "Python · FastAPI · Pydantic · SQLite · Docker",
  //   tags: ["Python", "LLM Security", "Open Source", "DevSecOps"],
  //   href: "https://github.com/kirtanpatel2003/llm-thorn",
  //   featured: true,
  //   body: "Open-source runtime semantic security layer for LLM apps — a reverse proxy that inspects every request and response through layered detection (heuristic pattern matching, semantic intent classification, multi-turn context risk scoring, output analysis), governed by a YAML policy-as-code engine and backed by a tamper-evident, hash-chained audit log. Backend-agnostic across OpenAI, Anthropic, and local Ollama, so it drops in front of any OpenAI-compatible endpoint with no app changes. Published to PyPI via trusted OIDC publishing with full CI/CD, CodeQL analysis, and secret scanning — runs entirely locally with zero data leaving the machine.",
  // },
  {
    title: "Hunter",
    status: "In Progress",
    meta: "Python · Textual · Ollama · SQLite · httpx",
    tags: ["Python", "AI Security", "Pentesting", "LLM"],
    body: "Local-first AI assistant for authorized penetration testing that treats every AI-generated claim as a hypothesis, not ground truth — findings are cross-checked token-by-token against raw tool output before being reported, with anything unproven quarantined instead. Runs a full scope → recon → enumerate → report workflow, guided or autonomous, entirely offline via Ollama.",
  },
  // {
  //   title: "Red Co-Author",
  //   meta: "Python · Ollama · Streamlit · scikit-learn · Laminar",
  //   tags: ["Python", "LLM Security", "Open Source", "Red Team", "ML"],
  //   href: "https://github.com/kirtanpatel2003/Red_Co-Author",
  //   featured: true,
  //   body: "A fully-local red-team and defensive monitor stack for the Co-Authoring Jailbreak (CoJP) LLM vulnerability. Automates a two-armed attack pipeline — direct prompt vs CoJP-framed prompt — across multiple local target models orchestrated through Ollama, scoring both responses with a separate judge model on a 1-5 harmfulness rubric. A defensive monitor trained on the attack dataset (nomic-embed-text embeddings + scikit-learn logistic regression) is evaluated for generalization on held-out AdvBench and HarDBench splits and benchmarked against a zero-shot llama3 baseline — all surfaced through a Streamlit dashboard with ASR-by-target heatmaps and ROC curves.",
  // },
  {
    title: "Mini Tor Anonymity Network",
    meta: "Python · TCP Sockets · Curve25519 · AES-256-GCM · HKDF · SHA-256",
    tags: ["Python", "Cryptography", "Networking", "Security"],
    href: "https://github.com/kirtanpatel2003/CS588-Tor-Browser",
    featured: true,
    body: "Tor's three-hop onion routing protocol rebuilt from scratch as six independent processes (directory, guard/middle/exit relays, client, destination) over real TCP, with telescoping EXTEND cells so the client only ever connects to the guard. The entire cryptographic stack is pure Python with no third-party crypto libraries — SHA-256, HMAC, HKDF, X25519 DH via Montgomery ladder, AES-256, AES-256-GCM — each verified against published NIST and IETF test vectors.",
  },
  {
    title: "DiffFence",
    meta: "2026 · Python · OSV.dev · Ollama",
    tags: ["Python", "Security", "CLI", "DevSecOps"],
    href: "https://github.com/kirtanpatel2003/DiffFence",
    featured: true,
    body: "Local-first Python CLI acting as a diff-aware security gate, scanning code changes for vulnerabilities before a push or merge. Baseline-on-first-run logic surfaces only new findings, keeping developer focus on the incremental risk introduced by each change.",
  },
  {
    title: "TrailBack",
    meta: "Arduino · ReactJS · BoxMap API · BMP280 · MPU6050",
    tags: ["Arduino", "ReactJS", "Sensor Fusion", "Navigation"],
    body: "GPS-free navigation device for trekkers using sensor fusion across a pressure sensor, magnetometer, and accelerometer-gyroscope to calculate heading, altitude, and displacement. Online mode anchors to the BoxMap API; offline mode runs with no coordinates or internet at all.",
  },
  {
    title: "KeyTracker",
    meta: "2026 · Next.js · MongoDB · Vercel",
    tags: ["Next.js", "MongoDB", "Vercel", "Full-Stack"],
    body: "Barcode-based key checkout system for UIC Technology Solutions enabling real-time availability tracking. Implements audit logging, conflict detection (409 responses for double-checkouts), and mismatch flagging to maintain reliable access control.",
  },
  {
    title: "FaceWay — AI Kiosk",
    meta: "2025 · ReactJS · Express.js · face-api.js · TensorFlow.js",
    tags: ["React", "TensorFlow.js", "Face Recognition", "Express"],
    href: "https://github.com/kirtanpatel2003/FaceWay",
    body: "Kiosk application with face-recognition login using face-api.js and TensorFlow.js, eliminating manual input by automatically identifying users on approach. Dynamically adjusts the UI based on user history and displays account-linked points in real time.",
  },
  {
    title: "Email Summarizer + Telegram Bot",
    meta: "2025 · Python · Ollama · Telegram API",
    tags: ["Python", "Ollama", "LLM", "Automation"],
    body: "Fetches unread emails, summarizes content with a locally-run Mistral model via Ollama, and assigns priority levels. Delivers prioritized summaries to a Telegram bot — no cloud-based LLM services required.",
  },
  {
    title: "WeatherGenie",
    meta: "2024 · ReactJS · OpenWeather API · Arduino",
    tags: ["React", "Arduino", "API Integration", "IoT"],
    href: "https://github.com/kirtanpatel2003/UncommonHacks-25",
    body: "Interactive weather forecasting platform combining Arduino-powered local sensor data with OpenWeather API global forecasts, delivering room-level precision for temperature, humidity, and environmental analytics with interactive visualizations.",
  },
];

const openSourceEntries = [
  {
    title: "llm-thorn",
    repo: "kirtanpatel2003/llm-thorn",
    role: "Author & Maintainer",
    meta: "Python · FastAPI · Pydantic · SQLite · Docker",
    tags: ["Python", "LLM Security", "PyPI", "Open Source"],
    body: "My first published PyPI package — an open-source runtime semantic security layer that sits in front of any LLM as a reverse proxy. MIT licensed with a clean BaseLayer plugin interface so new detectors can ship as independent packages, plus full CI/CD stood up from scratch: automated releases to PyPI via trusted OIDC publishing, CodeQL static analysis, dependency review, and gitleaks secret scanning.",
    note: "Built to grow into an ecosystem rather than stay a single tool — the thesis is that every team shipping an LLM product will eventually need semantic security the way every web server needs a firewall.",
    links: [
      { label: "View repository ↗", href: "https://github.com/kirtanpatel2003/llm-thorn" },
      { label: "View on PyPI ↗", href: "https://pypi.org/project/llm-thorn/" },
    ],
  },
  {
    title: "Red Co-Author",
    repo: "kirtanpatel2003/Red_Co-Author",
    role: "Author",
    meta: "Python · Ollama · Streamlit · scikit-learn · Laminar",
    tags: ["Python", "LLM Security", "Red Team", "Open Source"],
    body: "Open-source red-team and defensive monitor stack for the Co-Authoring Jailbreak (CoJP) LLM vulnerability. The complete stack — two-armed attack pipeline, judge-model scoring, monitor training, and held-out benchmark evaluation — is published under MIT so every result is reproducible locally, end to end, with no cloud dependencies.",
    links: [
      { label: "View repository ↗", href: "https://github.com/kirtanpatel2003/Red_Co-Author" },
    ],
  },
  {
    title: "Curio",
    repo: "urban-toolkit/curio",
    role: "Credited Contributor",
    meta: "Python · Flask · Socket.IO · React · TypeScript",
    tags: ["Socket.IO", "Real-Time", "Collaboration", "Open Source"],
    body: "Designed and built a real-time, multi-device collaboration layer for Curio — a dataflow framework for urban visual analytics — letting multiple users edit the same workflow together over a shared network. Built the sync model on Socket.IO: live per-user presence with color coding, per-node soft locks with “Editing: name” badges, accept/decline code-change proposals with first-accept-wins conflict resolution, and execution-output propagation across collaborators. The whole feature is gated behind an opt-in --collab flag so default single-user mode is untouched.",
    note: "Maintainers adopted the prototype into a collaboration-revised feature branch; the event vocabulary and proposal/lock model ship in the released feature, with credit by name in the project's official COLLABORATION.md.",
    links: [
      { label: "View repository ↗", href: "https://github.com/urban-toolkit/curio" },
      {
        label: "Read COLLABORATION.md ↗",
        href: "https://github.com/urban-toolkit/curio/blob/main/docs/COLLABORATION.md",
      },
    ],
  },
];

const certifications = [
  { name: "Foundations of Cybersecurity", issuer: "Google — Coursera", date: "Oct 2024" },
  { name: "Introduction to Networking", issuer: "NVIDIA — Coursera", date: "Oct 2024" },
  { name: "ChatGPT Prompt Engineering for Developers", issuer: "OpenAI — DeepLearning.AI", date: "May 2024" },
  { name: "Human Research — Social & Behavioral Research", issuer: "CITI Program — UIC", date: "Sep 2024" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kirtanpatel2003" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kirtanpatel13" },
  { label: "Hack The Box", href: "https://app.hackthebox.com/profile/2477480" },
  { label: "Email", href: "mailto:official.kirtan13@gmail.com" },
  { label: "Résumé", href: RESUME_URL },
];

const heroStats = [
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "HTB Machines Owned", value: 28, suffix: "+" },
  { label: "Years at UIC Tech", value: 3, suffix: "+" },
];

const contactDetails = [
  { label: "Email", value: "official.kirtan13@gmail.com", href: "mailto:official.kirtan13@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/kirtanpatel13", href: "https://www.linkedin.com/in/kirtanpatel13" },
  { label: "GitHub", value: "github.com/kirtanpatel2003", href: "https://github.com/kirtanpatel2003" },
];

const htbProfile = {
  rank: "Skilled",
  stats: [
    { label: "Level", value: "37" },
    { label: "User Owns", value: "20" },
    { label: "System Owns", value: "18" },
  ],
};

/* Animated count-up that triggers when the element enters view */
function useCountUp(target, active) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value;
}

function HeroStat({ stat, active }) {
  const value = useCountUp(stat.value, active);
  return (
    <div className="stat">
      <span className="stat-value">
        {value}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

function SectionHead({ no, eyebrow, title, children }) {
  return (
    <header className="sec-head reveal">
      <span className="sec-no">
        {no} — {eyebrow}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

function App() {
  const [progress, setProgress] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const handleNav = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /* Scroll-progress hairline */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(Math.max(scrolled, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal-on-scroll for any element tagged .reveal */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Trigger hero stat counters once in view */
  useEffect(() => {
    if (!statsRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="site">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="glow" aria-hidden="true" />

      <header className="nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => handleNav("hero")}>
            Kirtan Patel
            <span className="brand-sub">dev / security</span>
          </button>
          <nav className="nav-links">
            {navLinks.slice(1).map((link) => (
              <button key={link.id} onClick={() => handleNav(link.id)}>
                {link.label}
              </button>
            ))}
          </nav>
          <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
        </div>
      </header>

      <main className="container">
        {/* ── Hero ── */}
        <section id="hero" className="hero">
          <p className="status-line reveal is-visible">
            <span className="status-dot" />
            <span>
              Open to roles — currently building <strong>Red Co-Author</strong>, an LLM red-team
              stack
            </span>
          </p>
          <h1 className="reveal is-visible">
            Building <em>secure software</em>
            <br />
            and systems that <em>actually&nbsp;work.</em>
          </h1>
          <p className="lede reveal is-visible">
            I'm Kirtan Patel — graduate CS student at UIC with hands-on experience in full-stack
            development, IT operations, and offensive/defensive security. I ship automation, build
            internal tooling, and keep systems running.
          </p>
          <div className="hero-actions reveal is-visible">
            <button className="link-accent" onClick={() => handleNav("opensource")}>
              View projects →
            </button>
            <a className="link-quiet" href="mailto:official.kirtan13@gmail.com">
              Get in touch
            </a>
          </div>
          <div className="hero-stats" ref={statsRef}>
            {heroStats.map((stat) => (
              <HeroStat key={stat.label} stat={stat} active={statsVisible} />
            ))}
          </div>
        </section>

        {/* ── Stack ── */}
        <section id="skills" className="section">
          <SectionHead no="01" eyebrow="Stack" title="Languages, frameworks & tools">
            A pragmatic toolkit spanning full-stack web, local LLM orchestration, and offensive
            security — picked for the job, not the hype.
          </SectionHead>
          <dl className="skill-rows">
            {skillGroups.map((group) => (
              <div key={group.label} className="skill-row reveal">
                <dt>{group.label}</dt>
                <dd>
                  {group.items.map((item, i) => (
                    <span key={item}>
                      {item}
                      {i < group.items.length - 1 && <i className="sep">·</i>}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section">
          <SectionHead no="02" eyebrow="Experience" title="Where I've worked">
            3+ years supporting technology infrastructure at UIC, from front-line classroom support
            to managing campus-wide IT operations.
          </SectionHead>
          <div className="xp-list">
            {workExperience.map((job) => (
              <article key={job.role} className="xp-row reveal">
                <div className="xp-side">
                  <span className="xp-period">{job.period}</span>
                  <span className="xp-location">{job.location}</span>
                </div>
                <div className="xp-main">
                  <h3>{job.role}</h3>
                  <p className="xp-org">{job.org}</p>
                  <ul>
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Open Source ── */}
        <section id="opensource" className="section">
          <SectionHead no="03" eyebrow="Open Source" title="Contributing in the open">
            From my own security tooling published on PyPI to credited features in other teams'
            projects — building in public, end to end.
          </SectionHead>
          {openSourceEntries.map((entry) => (
            <article key={entry.title} className="oss-row reveal">
              <div className="oss-top">
                <div>
                  <h3>
                    <a href={entry.links[0].href} target="_blank" rel="noopener noreferrer">
                      {entry.title}
                    </a>
                  </h3>
                  <p className="oss-repo">{entry.repo}</p>
                </div>
                <span className="oss-role">{entry.role}</span>
              </div>
              <p className="proj-meta">{entry.meta}</p>
              <p className="proj-body">{entry.body}</p>
              {entry.note && <blockquote className="oss-note">{entry.note}</blockquote>}
              <p className="proj-tags">{entry.tags.join(" · ")}</p>
              <div className="oss-links">
                {entry.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="section">
          <SectionHead no="04" eyebrow="Projects" title="Things I've built">
            From cryptography implemented byte-by-byte to LLM red-teaming and IoT sensor fusion —
            each project is a deep dive into a different problem space.
          </SectionHead>
          <div className="proj-list">
            {projectEntries.map((project, idx) => (
              <article
                key={project.title}
                className={`proj-row reveal${project.featured ? " featured" : ""}`}
              >
                <span className="proj-idx">{String(idx + 1).padStart(2, "0")}</span>
                <div className="proj-main">
                  <div className="proj-top">
                    <h3>{project.title}</h3>
                    {project.status && <span className="proj-status">[{project.status}]</span>}
                  </div>
                  <p className="proj-meta">{project.meta}</p>
                  <p className="proj-body">{project.body}</p>
                  <p className="proj-tags">{project.tags.join(" · ")}</p>
                  {project.href && (
                    <a
                      className="proj-link"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>



        {/* ── Hack The Box ── */}
        <section id="htb" className="section">
          <SectionHead no="05" eyebrow="Proof of work" title="Hack The Box casefiles">
            Offensive labs keep my defensive instincts sharp. Active machines honed across network,
            web, and binary exploitation categories.
          </SectionHead>
          <div className="htb-strip reveal">
            <div className="htb-rank">
              <span className="stat-label">Rank</span>
              <span className="htb-rank-value">{htbProfile.rank}</span>
            </div>
            {htbProfile.stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certs" className="section">
          <SectionHead no="06" eyebrow="Certifications" title="Credentials & coursework">
            Continuous learning across security, networking, and AI.
          </SectionHead>
          <div className="cert-list">
            {certifications.map((cert) => (
              <div key={cert.name} className="cert-row reveal">
                <div>
                  <h4>{cert.name}</h4>
                  <p>{cert.issuer}</p>
                </div>
                <span className="cert-date">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section contact">
          <SectionHead no="07" eyebrow="Contact" title={<>Let's work <em>together.</em></>}>
            Open to roles, research collabs, and consulting engagements.
          </SectionHead>
          <a className="contact-email reveal" href="mailto:official.kirtan13@gmail.com">
            official.kirtan13@gmail.com
          </a>
          <div className="contact-rows reveal">
            {contactDetails.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
              >
                <span>{item.label}</span>
                <p>{item.value}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <h4>Kirtan Patel</h4>
            <p>Chicago, IL · Available remotely and on-site.</p>
          </div>
          <div className="footer-links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
