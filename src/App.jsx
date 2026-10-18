import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Thorn from "./Thorn";

const RESUME_URL = "/KirtanPatel_CV.pdf";
const EMAIL = "official.kirtan13@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/kirtanpatel2003";
const GITHUB_URL = "https://github.com/kirtanpatel2003";
const HTB_URL = "https://app.hackthebox.com/profile/2477480";

const navLinks = [
  { id: "focus", label: "Focus" },
  { id: "opensource", label: "Open Source" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "htb", label: "Hack The Box" },
  { id: "contact", label: "Contact" },
];

const profileSpec = [
  { key: "Targeting", value: "Security Analyst", sub: "Forward Deployed Engineer" },
  { key: "Based in", value: "Chicago, IL", sub: "Remote or on-site" },
  {
    key: "Maintaining",
    value: "llm-thorn",
    href: "https://pypi.org/project/llm-thorn/",
    sub: "Open-source LLM security proxy on PyPI",
  },
  { key: "Building", value: "Hunter", sub: "Evidence-gated pentest assistant" },
  { key: "Education", value: "M.S. Computer Science, UIC", sub: "Dec 2026" },
];

const heroStats = [
  { label: "Years in IT Ops", value: "4+" },
  { label: "KeyTracker Users", value: "35+" },
  { label: "HTB Machines Rooted", value: "18" },
];

const focusAreas = [
  {
    icon: "shield",
    label: "Security Analysis",
    title: "Reading systems for where policy and behavior disagree.",
    body: "Detection, triage, and evidence. I care less about what a system is supposed to do than what it actually does, and I write findings that hold up when someone checks them.",
    proof: [
      {
        name: "Ethos OS",
        text: "Caught a research kernel granting file writes its own access-control policy denied, and traced the gap to enforcement wired for IPC but not file I/O.",
      },
      {
        name: "llm-thorn",
        text: "Layered detection on live LLM traffic, policy-as-code enforcement, and a tamper-evident, hash-chained audit log.",
      },
      {
        name: "Red Co-Author",
        text: "Trained a jailbreak detector and evaluated it on held-out AdvBench and HarDBench splits against a zero-shot baseline.",
      },
      {
        name: "Hunter",
        text: "Evidence-gated findings: no model claim reaches a report until it matches raw tool output.",
      },
    ],
  },
  {
    icon: "plug",
    label: "Forward Deployed Engineering",
    title: "Building inside other people's environments, and staying until it works.",
    body: "Four years in university IT taught me the job isn't done when it deploys. It's done when the person on the other end can use it without calling me back.",
    proof: [
      {
        name: "KeyTracker",
        text: "Built and deployed a key checkout system for the UIC Library Help Desk. 35+ users, in production since launch, no reported downtime.",
      },
      {
        name: "Curio",
        text: "Shipped real-time collaboration into another team's codebase; the maintainers adopted the design and credit it in their docs.",
      },
      {
        name: "llm-thorn",
        text: "Drops in front of any OpenAI-compatible endpoint with no app changes, whether the backend is OpenAI, Anthropic, or local Ollama.",
      },
      {
        name: "UIC Tech Solutions",
        text: "Tier-2 escalation on site with faculty, staff, and students. I co-write the team's troubleshooting docs and help hire and onboard new specialists.",
      },
    ],
  },
];

const openSourceEntries = [
  {
    title: "llm-thorn",
    repo: "kirtanpatel2003/llm-thorn",
    repoUrl: "https://github.com/kirtanpatel2003/llm-thorn",
    role: "Author & Maintainer",
    meta: "Python · FastAPI · httpx · Pydantic · SQLite · Docker",
    tags: ["Python", "LLM Security", "PyPI", "MIT"],
    body: "Runtime semantic security layer for LLM applications. It sits in front of any LLM as a reverse proxy and screens every request and response through layered detectors (heuristic, semantic intent, multi-turn context risk, and output analysis), governed by a YAML policy-as-code engine with five enforcement actions: allow, warn, block, redact, terminate. Every decision lands in a tamper-evident, hash-chained audit log with a CLI integrity check. CI/CD covers trusted OIDC publishing to PyPI, CodeQL, dependency review, and gitleaks secret scanning. Contributions welcome: new detectors plug in through the BaseLayer interface and ship as independent packages.",
    note: "The thesis: every team shipping an LLM product will eventually need semantic security the way every web server needs a firewall.",
    install: "pip install llm-thorn",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/llm-thorn/" },
      { label: "Issues", href: "https://github.com/kirtanpatel2003/llm-thorn/issues" },
    ],
  },
  {
    title: "Curio",
    repo: "urban-toolkit/curio",
    repoUrl: "https://github.com/urban-toolkit/curio",
    role: "Credited Contributor",
    meta: "Python · Flask · Socket.IO · React · TypeScript",
    tags: ["Socket.IO", "Real-Time", "Collaboration"],
    body: "Designed and built a real-time, multi-device collaboration layer for Curio, a dataflow framework for urban visual analytics, so multiple users can edit the same workflow over a shared network. The sync model runs on Socket.IO: live per-user presence with color coding, per-node soft locks with “Editing: name” badges, accept/decline code-change proposals with first-accept-wins conflict resolution, and execution-output propagation across collaborators. The feature sits behind an opt-in ‑‑collab flag, so default single-user mode is untouched.",
    note: "Maintainers adopted the prototype into a collaboration-revised branch. Its event vocabulary and proposal/lock model ship in the released feature, credited by name in the project's COLLABORATION.md.",
    links: [
      { label: "PR #112", href: "https://github.com/urban-toolkit/curio/pull/112" },
      {
        label: "COLLABORATION.md",
        href: "https://github.com/urban-toolkit/curio/blob/main/docs/COLLABORATION.md",
      },
    ],
  },
  {
    title: "Red Co-Author",
    repo: "kirtanpatel2003/Red_Co-Author",
    repoUrl: "https://github.com/kirtanpatel2003/Red_Co-Author",
    role: "Author",
    meta: "Python · Ollama · Streamlit · scikit-learn · Laminar",
    tags: ["Python", "LLM Security", "Red Team", "Detection"],
    body: "Red-team and defensive monitor stack for the Co-Authoring Jailbreak (CoJP) LLM vulnerability. A two-armed attack pipeline (direct prompt vs CoJP-framed prompt) runs across multiple local target models, with a separate judge model scoring each response on the HarDBench 1–5 harmfulness rubric. A monitor trained on the resulting dataset (nomic-embed-text embeddings + logistic regression) is evaluated on held-out AdvBench (520 prompts) and HarDBench (400 prompts) splits and benchmarked against a zero-shot llama3 baseline. MIT licensed and fully local, so every result reproduces end to end.",
    links: [],
  },
];

const workExperience = [
  {
    role: "IT Helpdesk Support Manager",
    org: "Technology Solutions, Office of the Vice Chancellor for Innovation — UIC",
    location: "Chicago, IL",
    period: "Dec 2024 – Present",
    current: true,
    bullets: [
      "Lead the IT helpdesk support team, owning tier-2 escalation in TeamDynamix (TDX) across classroom networking, AV systems, and campus-wide technology while coaching specialists through complex tickets to resolution.",
      "Assess and provision faculty, staff, and student devices and access, applying least-privilege and safe-configuration judgment to hardware, software, and account provisioning across campus.",
      "Co-author and maintain the team's troubleshooting documentation, translating recurring technical issues into clear, repeatable resolution steps that keep support consistent and shorten new-hire ramp-up.",
      "Serve on the hiring team for support specialists, interviewing and evaluating candidates for technical skill and the ability to support non-technical users, then onboarding new hires onto the team.",
    ],
  },
  {
    role: "Classroom Technology Support Specialist",
    org: "Technology Solutions, Office of the Vice Chancellor for Innovation — UIC",
    location: "Chicago, IL",
    period: "Aug 2022 – Dec 2024",
    bullets: [
      "Kept instruction running across East Campus classrooms and lecture halls, supporting AV systems, projectors, audio, and Echo360 lecture capture and resolving live issues quickly to protect class time.",
      "Deployed and configured computer labs for courses and campus events, handling software installs and access provisioning.",
      "Trained and mentored incoming specialists to independent troubleshooting through shadowing, hands-on practice, and feedback on real tickets.",
    ],
  },
];

const projectEntries = [
  {
    title: "Hunter",
    status: "In Progress",
    meta: "Python · Textual · Ollama · httpx · SQLite · pytest",
    tags: ["AI Security", "Pentesting", "Verification"],
    wide: true,
    body: "Local-first, evidence-gated AI assistant for authorized penetration testing. It runs a staged scope → recon → enumerate → report workflow fully offline and treats every model claim as a hypothesis: a verification layer extracts hard tokens (ports, versions, CVEs) from model output and cross-checks them against raw tool output, discarding and logging anything unproven. A hard scope fence sits beneath a bounded autonomy loop (capped iterations, wall-clock, and actions), so no probe can touch an out-of-scope target.",
  },
  {
    title: "KeyTracker",
    status: "In Production",
    live: true,
    meta: "Next.js · MongoDB · Vercel",
    tags: ["Access Control", "Audit Logging", "Deployed"],
    body: "Barcode-based key checkout system built and deployed for the UIC Technology Solutions Library Help Desk, serving 35+ users daily with real-time availability. Audit logging, conflict detection (409 on double-checkout), and mismatch flagging keep the access trail trustworthy; supervisors run it through an admin interface. No reported downtime since launch.",
  },
  {
    title: "Ethos OS Access Control Checker",
    meta: "Go · Ethos OS · Mandatory Access Control",
    tags: ["Go", "OS Security", "Policy Testing"],
    body: "Defined a group and protection label in Ethos, a UIC research OS built on label- and group-based mandatory access control, then built a Go checker that resolves a file's label at runtime, loads permissions from the kernel's /auth hierarchy, and compares the policy decision with what the kernel actually does. The kernel granted writes the policy denied, isolating a gap where enforcement is wired for IPC but not ordinary file I/O.",
  },
  {
    title: "Mini Tor Anonymity Network",
    meta: "Python · TCP Sockets · Curve25519 · AES-256-GCM · HKDF",
    tags: ["Cryptography", "Networking", "Systems"],
    href: "https://github.com/kirtanpatel2003/CS588-Tor-Browser",
    body: "Tor's three-hop onion routing rebuilt from scratch as six independent processes over real TCP, with telescoping EXTEND cells so the client only ever connects to the guard. The whole cryptographic stack is pure Python with no third-party crypto libraries (SHA-256, HMAC, HKDF, X25519 via Montgomery ladder, AES-256, AES-256-GCM), each verified against published NIST and IETF test vectors.",
  },
  {
    title: "DiffFence",
    meta: "Python · OSV.dev · Ollama",
    tags: ["AppSec", "CLI", "DevSecOps"],
    href: "https://github.com/kirtanpatel2003/DiffFence",
    body: "Local-first Python CLI that acts as a diff-aware security gate, scanning code changes for vulnerabilities and production risks before a push or merge. Baseline-on-first-run logic means later scans surface only new findings, so developers see the incremental risk each change introduces instead of the same backlog every time.",
  },
];

const otherBuilds = [
  {
    title: "TrailBack",
    meta: "Arduino · React",
    body: "GPS-free navigation device fusing pressure, magnetometer, and IMU data, with a fully offline mode.",
  },
  {
    title: "FaceWay",
    meta: "React · Express · TensorFlow.js",
    body: "Kiosk with face-recognition login via face-api.js that adapts its UI to each user's history.",
    href: "https://github.com/kirtanpatel2003/FaceWay",
  },
  {
    title: "Email Summarizer",
    meta: "Python · Ollama · Telegram API",
    body: "Summarizes and prioritizes unread email with a local Mistral model and delivers it over Telegram.",
  },
  {
    title: "WeatherGenie",
    meta: "React · Arduino · OpenWeather",
    body: "Room-level sensor readings from an Arduino alongside global forecasts, with interactive charts.",
    href: "https://github.com/kirtanpatel2003/UncommonHacks-25",
  },
];

const htbProfile = {
  rank: "Skilled",
  stats: [
    { label: "Level", value: "37" },
    { label: "User Owns", value: "20" },
    { label: "System Owns", value: "18" },
  ],
};

const skillGroups = [
  { label: "Languages", items: ["Python", "Go", "Bash", "SQL", "JavaScript"] },
  {
    label: "Offensive Tooling",
    items: ["Nmap", "Burp Suite", "Metasploit", "sqlmap", "Hashcat", "BloodHound", "Impacket", "Wireshark"],
  },
  {
    label: "Security Engineering",
    items: [
      "Applied crypto (AES-GCM, X25519, HKDF)",
      "LLM red-teaming",
      "Prompt-injection detection",
      "Policy-as-code",
      "CodeQL",
      "Secret scanning",
      "OSV.dev",
    ],
  },
  {
    label: "Systems & IT",
    items: [
      "Linux",
      "Windows",
      "macOS",
      "TCP/IP",
      "DNS",
      "HTTP/S",
      "Cisco switch troubleshooting",
      "TeamDynamix",
      "Device & access provisioning",
    ],
  },
  {
    label: "Build & Deploy",
    items: ["FastAPI", "Flask", "React", "Next.js", "Node.js", "Docker", "Git", "Vercel", "CI/CD"],
  },
  { label: "Data & ML", items: ["PostgreSQL", "MongoDB", "SQLite", "scikit-learn", "Ollama", "Streamlit"] },
];

const credentials = [
  {
    name: "M.S. Computer Science",
    detail: "University of Illinois Chicago · Network Security, Cryptography, Computer System Security",
    date: "Dec 2026",
  },
  {
    name: "B.S. Computer Science, Software Engineering · Minor in Mathematics",
    detail: "University of Illinois Chicago · Dean's List, Fall 2023 & Fall 2024",
    date: "May 2025",
  },
  { name: "Foundations of Cybersecurity", detail: "Google — Coursera", date: "Oct 2024" },
  { name: "Introduction to Networking", detail: "NVIDIA — Coursera", date: "Oct 2024" },
];

const socialLinks = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Hack The Box", href: HTB_URL },
  { label: "Résumé", href: RESUME_URL },
];

const strokeIcons = {
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  plug: <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" />,
};

const brandIcons = {
  github: {
    viewBox: "0 0 16 16",
    d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z",
  },
};

function Icon({ name }) {
  if (brandIcons[name]) {
    const { viewBox, d } = brandIcons[name];
    return (
      <svg viewBox={viewBox} width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {strokeIcons[name]}
    </svg>
  );
}

/* Theme follows the OS until the visitor picks one; the pick is remembered */
function readTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage blocked: the choice just won't persist */
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}

function useCopy() {
  const [copied, setCopied] = useState(null);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable: the text stays visible and selectable */
    }
  }, []);

  return [copied, copy];
}

function SectionHead({ no, eyebrow, title, children }) {
  return (
    <header className="sec-head reveal">
      <span className="eyebrow">
        <span className="eyebrow-no">{no}</span>
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

function ExternalLink({ href, className, children, ...rest }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function App() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const [copied, copy] = useCopy();

  const handleNav = useCallback((id) => {
    setMenuOpen(false);
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

  /* Highlight the nav item for whichever section is mid-viewport */
  useEffect(() => {
    const sections = ["hero", ...navLinks.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Close the mobile menu on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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

  return (
    <div className="site">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => handleNav("hero")}>
            <span className="brand-mark" aria-hidden="true">
              KP
            </span>
            <span className="brand-text">
              <span className="brand-name">Kirtan Patel</span>
              <span className="brand-role">Security · Forward Deployed</span>
            </span>
          </button>
          <nav className="nav-links" aria-label="Sections">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="topbar-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <ExternalLink href={RESUME_URL} className="btn btn-primary btn-sm" aria-label="Résumé (PDF)">
              <Icon name="download" />
              <span>Résumé</span>
            </ExternalLink>
            <button
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu">
            <nav className="container" aria-label="Sections">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  aria-current={activeId === link.id ? "true" : undefined}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="hero">
          <div className="container hero-grid">
            <div>
              <p className="status-chip reveal is-visible">
                <span className="status-dot" />
                <span>
                  Open to <strong>Security Analyst</strong> &amp;{" "}
                  <strong>Forward Deployed Engineer</strong> roles
                </span>
              </p>
              <h1 className="reveal is-visible">
                Finding the gaps,
                <br />
                and shipping <span className="accent">what closes&nbsp;them.</span>
              </h1>
              <p className="lede reveal is-visible">
                I'm Kirtan Patel. I work where security meets deployment: I author{" "}
                <span className="nowrap">llm-thorn</span>, an open-source LLM security proxy on PyPI, and I've spent four years in tier-2 IT
                operations at the University of Illinois Chicago, triaging escalations and putting
                tools in front of the people who use them.
              </p>
              <div className="hero-actions reveal is-visible">
                <ExternalLink href={RESUME_URL} className="btn btn-primary">
                  <Icon name="download" />
                  Download résumé
                </ExternalLink>
                <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
                  <Icon name="mail" />
                  Email me
                </a>
                <ExternalLink href={GITHUB_URL} className="icon-btn icon-btn-lg" aria-label="GitHub">
                  <Icon name="github" />
                </ExternalLink>
                <ExternalLink href={LINKEDIN_URL} className="icon-btn icon-btn-lg" aria-label="LinkedIn">
                  <Icon name="linkedin" />
                </ExternalLink>
              </div>
            </div>

            <aside className="spec reveal is-visible" aria-label="Profile at a glance">
              <div className="spec-head">
                <span>At a glance</span>
                <span>Open to work</span>
              </div>
              <dl className="spec-rows">
                {profileSpec.map((row) => (
                  <div key={row.key} className="spec-row">
                    <dt>{row.key}</dt>
                    <dd>
                      {row.href ? <ExternalLink href={row.href}>{row.value}</ExternalLink> : row.value}
                      {row.sub && <small>{row.sub}</small>}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="spec-stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ── Focus ── */}
        <section id="focus" className="section band">
          <div className="container">
            <SectionHead no="01" eyebrow="Focus" title="Where I fit on your team">
              I'm targeting security analyst and forward deployed engineering roles. Here's the
              evidence for each.
            </SectionHead>
            <div className="focus-grid">
              {focusAreas.map((area) => (
                <article key={area.label} className="card focus-card reveal">
                  <span className="focus-icon">
                    <Icon name={area.icon} />
                  </span>
                  <span className="focus-label">{area.label}</span>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                  <ul className="proof">
                    {area.proof.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Source ── */}
        <section id="opensource" className="section">
          <div className="container">
            <SectionHead no="02" eyebrow="Open Source" title="Building in the open">
              Security tooling I author and maintain, and features I've shipped into other teams'
              codebases. Issues and pull requests welcome.
            </SectionHead>
            <div className="oss-list">
              {openSourceEntries.map((entry) => (
                <article key={entry.title} className="card oss-card reveal">
                  <div>
                    <ExternalLink href={entry.repoUrl} className="oss-repo">
                      <Icon name="github" />
                      {entry.repo}
                    </ExternalLink>
                    <h3>{entry.title}</h3>
                    <p className="meta">{entry.meta}</p>
                    <p className="body">{entry.body}</p>
                    {entry.note && <blockquote className="callout">{entry.note}</blockquote>}
                    {entry.install && (
                      <div className="install">
                        <code>{entry.install}</code>
                        <button
                          onClick={() => copy(entry.title, entry.install)}
                          aria-label={`Copy install command for ${entry.title}`}
                        >
                          <Icon name={copied === entry.title ? "check" : "copy"} />
                          {copied === entry.title ? "Copied" : "Copy"}
                        </button>
                      </div>
                    )}
                  </div>
                  <aside className="oss-side">
                    <span className="badge">{entry.role}</span>
                    <ul className="chips">
                      {entry.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="link-col">
                      <ExternalLink href={entry.repoUrl} className="btn btn-ghost btn-sm">
                        Repository
                        <Icon name="arrow" />
                      </ExternalLink>
                      {entry.links.map((link) => (
                        <ExternalLink key={link.label} href={link.href} className="btn btn-ghost btn-sm">
                          {link.label}
                          <Icon name="arrow" />
                        </ExternalLink>
                      ))}
                    </div>
                  </aside>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section band">
          <div className="container">
            <SectionHead no="03" eyebrow="Experience" title="Four years running university IT">
              Tier-2 operations at the University of Illinois Chicago: escalations, access
              provisioning, documentation, and the people on the other end of every ticket.
            </SectionHead>
            <div className="timeline">
              {workExperience.map((job) => (
                <article key={job.role} className={`xp reveal${job.current ? " current" : ""}`}>
                  <div className="xp-when">
                    <span>{job.period}</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="xp-body">
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
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="section">
          <div className="container">
            <SectionHead no="04" eyebrow="Projects" title="Selected work">
              Security tooling, systems built from first principles, and software running in
              production.
            </SectionHead>
            <div className="proj-grid">
              {projectEntries.map((project, idx) => (
                <article
                  key={project.title}
                  className={`card proj-card reveal${project.wide ? " wide" : ""}`}
                >
                  <div className="proj-head">
                    <span className="proj-idx">{String(idx + 1).padStart(2, "0")}</span>
                    {project.status && (
                      <span className={`badge${project.live ? "" : " badge-neutral"}`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="meta">{project.meta}</p>
                  <p className="body">{project.body}</p>
                  <div className="proj-foot">
                    <ul className="chips">
                      {project.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {project.href && (
                      <ExternalLink href={project.href} className="text-link">
                        Source
                        <Icon name="arrow" />
                      </ExternalLink>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="also">
              <p className="also-head reveal">Also built</p>
              <div className="also-list reveal">
                {otherBuilds.map((build) => (
                  <div key={build.title} className="also-row">
                    <div>
                      <h4>{build.title}</h4>
                      <span className="also-meta">{build.meta}</span>
                    </div>
                    <p>{build.body}</p>
                    {build.href ? (
                      <ExternalLink href={build.href} className="text-link">
                        Source
                        <Icon name="arrow" />
                      </ExternalLink>
                    ) : (
                      <span />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Hack The Box ── */}
        <section id="htb" className="section band">
          <div className="container">
            <SectionHead no="05" eyebrow="Proof of work" title="Hack The Box">
              Hands-on offensive practice: enumerate, exploit, escalate, write it up. Knowing how
              attacks land is what makes the alerts make sense.
            </SectionHead>
            <div className="card htb-card reveal">
              <div className="stat">
                <span className="htb-rank-value">{htbProfile.rank}</span>
                <span className="stat-label">Rank</span>
              </div>
              {htbProfile.stats.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
              <ExternalLink href={HTB_URL} className="btn btn-ghost btn-sm">
                View profile
                <Icon name="arrow" />
              </ExternalLink>
            </div>
          </div>
        </section>

        {/* ── Toolkit ── */}
        <section id="skills" className="section">
          <div className="container">
            <SectionHead no="06" eyebrow="Toolkit" title="What I work with">
              Offensive tooling for finding problems, an engineering stack for shipping fixes.
            </SectionHead>
            <div className="card tool-card reveal">
              {skillGroups.map((group) => (
                <div key={group.label} className="tool-row">
                  <h3>{group.label}</h3>
                  <ul className="chips">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Education & Credentials ── */}
        <section id="credentials" className="section band">
          <div className="container">
            <SectionHead no="07" eyebrow="Credentials" title="Education & certificates" />
            <div className="cred-list reveal">
              {credentials.map((item) => (
                <div key={item.name} className="cred-row">
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.detail}</p>
                  </div>
                  <span className="cred-date">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section">
          <div className="container">
            <div className="contact-card reveal">
              <span className="eyebrow">
                <span className="eyebrow-no">08</span>
                Contact
              </span>
              <h2>
                Let's work <span className="accent">together.</span>
              </h2>
              <p>
                Hiring for a security analyst or forward deployed role, or maintaining a project I
                can help with? Email is the fastest way to reach me.
              </p>
              <div className="email-row">
                <a className="email-big" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
                <button className="ink-btn" onClick={() => copy("email", EMAIL)} aria-label="Copy email address">
                  <Icon name={copied === "email" ? "check" : "copy"} />
                  {copied === "email" ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="contact-links">
                <ExternalLink href={RESUME_URL} className="btn btn-ink">
                  <Icon name="download" />
                  Résumé
                </ExternalLink>
                <ExternalLink href={LINKEDIN_URL} className="btn btn-ink-ghost">
                  <Icon name="linkedin" />
                  LinkedIn
                </ExternalLink>
                <ExternalLink href={GITHUB_URL} className="btn btn-ink-ghost">
                  <Icon name="github" />
                  GitHub
                </ExternalLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>Kirtan Patel · Chicago, IL · Available remotely and on-site.</p>
          <div className="footer-links">
            {socialLinks.map((link) => (
              <ExternalLink key={link.label} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </footer>

      <Thorn />
    </div>
  );
}

export default App;
