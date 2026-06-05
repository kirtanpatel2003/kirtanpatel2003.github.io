import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiLinux,
  SiKalilinux,
  SiGit,
  SiArduino,
  SiOpenjdk,
  SiScikitlearn,
  SiStreamlit,
  SiSocketdotio,
  SiTensorflow,
} from "react-icons/si";
import ProfileCard from "./components/Components/ProfileCard/ProfileCard.jsx";
import LogoLoop from "./components/Animations/LogoLoop/LogoLoop.jsx";
import Terminal from "./components/Terminal";
import GlobeDots from "./components/GlobeDots";
import "./components/Animations/LogoLoop/LogoLoop.css";
import "./components/htb.css";

const RESUME_URL = "/KirtanPatel_CV.pdf";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "opensource", label: "Open Source" },
  { id: "htb", label: "Hack The Box" },
  { id: "contact", label: "Contact" },
];

const techLogos = [
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiOpenjdk />, title: "Java", href: "https://dev.java" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiFlask />, title: "Flask", href: "https://flask.palletsprojects.com" },
  { node: <SiSocketdotio />, title: "Socket.IO", href: "https://socket.io" },
  { node: <SiStreamlit />, title: "Streamlit", href: "https://streamlit.io" },
  { node: <SiScikitlearn />, title: "scikit-learn", href: "https://scikit-learn.org" },
  { node: <SiTensorflow />, title: "TensorFlow.js", href: "https://www.tensorflow.org/js" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://postgresql.org" },
  { node: <SiMysql />, title: "MySQL", href: "https://mysql.com" },
  { node: <SiDocker />, title: "Docker", href: "https://docker.com" },
  { node: <SiLinux />, title: "Linux", href: "https://kernel.org" },
  { node: <SiKalilinux />, title: "Kali Linux", href: "https://kali.org" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiArduino />, title: "Arduino", href: "https://arduino.cc" },
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
    period: "Dec 2024 – Present",
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
    period: "Aug 2022 – Dec 2024",
    bullets: [
      "Assisted professors with classroom equipment issues including projectors, audio systems, and lecture capture setups to ensure uninterrupted instruction.",
      "Set up and configured computer labs for courses and campus events.",
      "Trained and mentored incoming support specialists, building their ability to independently resolve classroom technology issues.",
      "Provided printer support and maintenance across assigned campus locations.",
    ],
  },
];

const projectEntries = [
  {
    title: "Red Co-Author",
    status: "In Progress",
    meta: "Python · Ollama · Streamlit · scikit-learn · Laminar",
    tags: ["Python", "LLM Security", "Red Team", "ML"],
    href: "https://github.com/kirtanpatel2003/Red_Co-Author",
    featured: true,
    body: "A fully-local red-team and defensive monitor stack for the Co-Authoring Jailbreak (CoJP) LLM vulnerability. Automates a two-armed attack pipeline — direct prompt vs CoJP-framed prompt — across multiple local target models orchestrated through Ollama, scoring both responses with a separate judge model on a 1–5 harmfulness rubric. A defensive monitor trained on the attack dataset (nomic-embed-text embeddings + scikit-learn logistic regression) is evaluated for generalization on held-out AdvBench and HarDBench splits and benchmarked against a zero-shot llama3 baseline — all surfaced through a Streamlit dashboard with ASR-by-target heatmaps and ROC curves.",
  },
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
    title: "Curio",
    repo: "urban-toolkit/curio",
    role: "Credited Contributor",
    meta: "Python · Flask · Socket.IO · React · TypeScript",
    href: "https://github.com/urban-toolkit/curio",
    collabHref: "https://github.com/urban-toolkit/curio/blob/main/docs/COLLABORATION.md",
    tags: ["Socket.IO", "Real-Time", "Collaboration", "Open Source"],
    body: "Designed and built a real-time, multi-device collaboration layer for Curio — a dataflow framework for urban visual analytics — letting multiple users edit the same workflow together over a shared network. Built the sync model on Socket.IO: live per-user presence with color coding, per-node soft locks with “Editing: name” badges, accept/decline code-change proposals with first-accept-wins conflict resolution, and execution-output propagation across collaborators. The whole feature is gated behind an opt-in --collab flag so default single-user mode is untouched.",
    note: "Maintainers adopted the prototype into a collaboration-revised feature branch; the event vocabulary and proposal/lock model ship in the released feature, with credit by name in the project's official COLLABORATION.md.",
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

/* Mouse-follow spotlight glow on interactive cards */
const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
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
    <div>
      <span>
        {value}
        {stat.suffix}
      </span>
      <small>{stat.label}</small>
    </div>
  );
}

const HackTheBoxSection = () => {
  const profileUrl = "https://app.hackthebox.com/profile/2477480";
  const rank = "Hacker";

  return (
    <div className="htb-wrapper positionRelative">
      <div className="htb-header">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="htb-link">
          <h2 className="htb-title">Hack The Box — My Profile</h2>
        </a>

        <span className="htb-rank">Rank: {rank}</span>

        <div className="htb-stats">
          <table>
            <thead>
              <tr>
                <th>GLOBAL RANKING</th>
                <th>USER OWNS</th>
                <th>SYSTEM OWNS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#745</td>
                <td>15</td>
                <td>13</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <a className="htb-cta" href={profileUrl} target="_blank" rel="noopener noreferrer">
        Visit Hack The Box Profile
      </a>
    </div>
  );
};

function App() {
  const [logs, setLogs] = useState(["whoami → kirtan.patel", "loading profile..."]);
  const [progress, setProgress] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const handleNav = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setLogs((prev) => [...prev, `navigate --section ${id}`]);
  }, []);

  /* Scroll-progress bar */
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
    <div className="app-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="aurora" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <GlobeDots />

      <header className="global-nav">
        <div className="nav-brand">
          <span>KP</span>
          <small>DEV · SECURITY</small>
        </div>
        <nav>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleNav(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Résumé
        </a>
      </header>

      <main className="page-shell">
        {/* ── Hero ── */}
        <section id="hero" className="section hero-section">
          <div className="hero-copy">
            <span className="status-chip">
              <span className="status-dot" />
              Currently building <strong>Red Co-Author</strong> · LLM red-team stack
            </span>
            <p className="eyebrow">Full-Stack Developer · Security Practitioner · MS CS @ UIC</p>
            <h1>
              Building <span className="gradient-text">secure software</span> and systems that actually work.
            </h1>
            <p>
              I'm Kirtan Patel — graduate CS student at UIC with hands-on experience in full-stack
              development, IT operations, and offensive/defensive security. I ship automation, build
              internal tooling, and keep systems running.
            </p>
            <div className="hero-actions">
              <button onClick={() => handleNav("projects")}>View projects</button>
              <a href="mailto:official.kirtan13@gmail.com">Get in touch</a>
            </div>
            <div className="hero-stats" ref={statsRef}>
              {heroStats.map((stat) => (
                <HeroStat key={stat.label} stat={stat} active={statsVisible} />
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <ProfileCard
              name="Kirtan Patel"
              title="Developer & Security Practitioner"
              handle="@kirtanpatel13"
              status="Online"
              contactText="Mail"
              avatarUrl="/profile-no-bg.png"
              iconUrl="/bgicon.png"
              showUserInfo
              showBehindGradient={false}
              enableTilt
            />
          </div>
        </section>

        {/* ── Stack ── */}
        <section id="skills" className="section skills-section">
          <div className="section-header reveal">
            <p className="eyebrow">Stack</p>
            <h2>Languages, frameworks & tools</h2>
            <p>
              A pragmatic toolkit spanning full-stack web, local LLM orchestration, and offensive
              security — picked for the job, not the hype.
            </p>
          </div>
          <div className="skill-matrix reveal">
            {skillGroups.map((group) => (
              <div key={group.label} className="skill-card" onMouseMove={handleSpotlight}>
                <h4>{group.label}</h4>
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="logo-loop-wrap reveal">
            <LogoLoop
              logos={techLogos}
              speed={110}
              direction="left"
              logoHeight={44}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#03050b"
              ariaLabel="Technology stack"
            />
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section experience-section">
          <div className="section-header reveal">
            <p className="eyebrow">Experience</p>
            <h2>Where I've worked</h2>
            <p>
              3+ years supporting technology infrastructure at UIC, from front-line classroom
              support to managing campus-wide IT operations.
            </p>
          </div>
          <div className="experience-timeline">
            {workExperience.map((job) => (
              <div
                key={job.role}
                className="experience-card reveal"
                onMouseMove={handleSpotlight}
              >
                <div className="experience-card-header">
                  <div className="experience-role-info">
                    <h3>{job.role}</h3>
                    <p className="experience-org">{job.org}</p>
                  </div>
                  <div className="experience-meta">
                    <span className="experience-period">{job.period}</span>
                    <span className="experience-location">{job.location}</span>
                  </div>
                </div>
                <ul className="experience-bullets">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="section projects-section">
          <div className="section-header reveal">
            <p className="eyebrow">Projects</p>
            <h2>Things I've built</h2>
            <p>
              From cryptography implemented byte-by-byte to LLM red-teaming and IoT sensor fusion —
              each project is a deep dive into a different problem space.
            </p>
          </div>
          <div className="projects-grid">
            {projectEntries.map((project) => (
              <article
                key={project.title}
                className={`project-card reveal${project.featured ? " is-featured" : ""}`}
                onMouseMove={handleSpotlight}
              >
                <div className="project-card-top">
                  <h3>{project.title}</h3>
                  {project.status && <span className="project-status">{project.status}</span>}
                </div>
                <p className="project-meta">{project.meta}</p>
                <p className="project-body">{project.body}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.href && (
                  <div className="project-links">
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      View on GitHub ↗
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ── Open Source ── */}
        <section id="opensource" className="section opensource-section">
          <div className="section-header reveal">
            <p className="eyebrow">Open Source</p>
            <h2>Contributing in the open</h2>
            <p>
              Shipping features into real projects used by other people — and getting credited for
              it in the docs.
            </p>
          </div>
          <div className="opensource-grid">
            {openSourceEntries.map((entry) => (
              <div
                key={entry.title}
                className="opensource-card reveal"
                onMouseMove={handleSpotlight}
              >
                <div className="opensource-card-top">
                  <div>
                    <h3>
                      <a href={entry.href} target="_blank" rel="noopener noreferrer">
                        {entry.title}
                      </a>
                    </h3>
                    <p className="opensource-repo">{entry.repo}</p>
                  </div>
                  <span className="opensource-role">{entry.role}</span>
                </div>
                <p className="project-meta">{entry.meta}</p>
                <p className="project-body">{entry.body}</p>
                <p className="opensource-note">{entry.note}</p>
                <div className="project-tags">
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="opensource-links">
                  <a href={entry.href} target="_blank" rel="noopener noreferrer">
                    View repository ↗
                  </a>
                  {entry.collabHref && (
                    <a href={entry.collabHref} target="_blank" rel="noopener noreferrer">
                      Read COLLABORATION.md ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HTB ── */}
        <section id="htb" className="section htb-section">
          <div className="section-header reveal">
            <p className="eyebrow">Proof of work</p>
            <h2>Hack The Box casefiles</h2>
            <p>
              Offensive labs keep my defensive instincts sharp. Active machines honed across
              network, web, and binary exploitation categories.
            </p>
          </div>
          <div className="reveal">
            <HackTheBoxSection />
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certs" className="section certs-section">
          <div className="section-header reveal">
            <p className="eyebrow">Certifications</p>
            <h2>Credentials & coursework</h2>
            <p>Continuous learning across security, networking, and AI.</p>
          </div>
          <div className="certs-grid">
            {certifications.map((cert) => (
              <div key={cert.name} className="cert-card reveal" onMouseMove={handleSpotlight}>
                <div className="cert-dot" />
                <div>
                  <h4>{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section contact-section">
          <div className="section-header reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let's work together.</h2>
            <p>Open to roles, research collabs, and consulting engagements.</p>
          </div>
          <div className="contact-grid">
            {contactDetails.map((item) => (
              <a
                key={item.label}
                className="contact-card reveal"
                href={item.href}
                target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
                onMouseMove={handleSpotlight}
              >
                <span>{item.label}</span>
                <p>{item.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── Terminal ── */}
        <section id="terminal" className="section terminal-section">
          <div className="section-header reveal">
            <p className="eyebrow">Live Terminal</p>
            <h2>Command log</h2>
            <p>Click nav links to append to the command history.</p>
          </div>
          <div className="reveal">
            <Terminal logs={logs} />
          </div>
        </section>
      </main>

      <footer className="global-footer">
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
      </footer>
    </div>
  );
}

export default App;
