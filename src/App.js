import "./App.css";
import { useCallback, useState } from "react";
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
} from "react-icons/si";
import ProfileCard from "./components/Components/ProfileCard/ProfileCard.jsx";
import LogoLoop from "./components/Animations/LogoLoop/LogoLoop.jsx";
import Terminal from "./components/Terminal";
import GlobeDots from "./components/GlobeDots";
import "./components/Animations/LogoLoop/LogoLoop.css";
import "./components/htb.css";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "htb", label: "Hack The Box" },
  { id: "contact", label: "Contact" },
];

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiFlask />, title: "Flask", href: "https://flask.palletsprojects.com" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://postgresql.org" },
  { node: <SiMysql />, title: "MySQL", href: "https://mysql.com" },
  { node: <SiDocker />, title: "Docker", href: "https://docker.com" },
  { node: <SiLinux />, title: "Linux", href: "https://kernel.org" },
  { node: <SiKalilinux />, title: "Kali Linux", href: "https://kali.org" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiArduino />, title: "Arduino", href: "https://arduino.cc" },
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
    title: "TrailBack",
    meta: "Present · Arduino · ReactJS · BoxMap API · BMP280 · Magnetometer · MPU6050",
    tags: ["Arduino", "ReactJS", "Sensor Fusion", "Navigation"],
    body: "GPS-free navigation device for trekkers using sensor fusion across a pressure sensor, magnetometer, and accelerometer-gyroscope to calculate heading, altitude, and displacement. Online mode anchors to BoxMap API; offline mode runs with no coordinate or internet at all.",
  },
  {
    title: "Mini Tor Anonymity Network",
    meta: "Present · Python · TCP Sockets · Curve25519 · AES-256-GCM · HKDF · SHA-256",
    tags: ["Python", "Cryptography", "Networking", "Security"],
    body: "Tor's three-hop onion routing protocol from scratch as six independent processes over real TCP. Built the full cryptographic stack in pure Python with no third-party libraries — SHA-256, HMAC, HKDF, X25519 DH, AES-256-GCM — each verified against NIST/IETF test vectors.",
  },
  {
    title: "DiffFence",
    meta: "2026 · Python · OSV.dev · Ollama",
    tags: ["Python", "Security", "CLI", "DevSecOps"],
    body: "Local-first Python CLI acting as a diff-aware security gate, scanning code changes for vulnerabilities before a push or merge. Baseline-on-first-run logic surfaces only new findings, keeping developer focus on incremental risk introduced by each change.",
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
    body: "Kiosk application with face recognition login using face-api.js and TensorFlow.js, eliminating manual input by automatically identifying users on approach. Dynamically adjusts UI based on user history and displays account-linked points in real time.",
  },
  {
    title: "Email Summarizer + Telegram Bot",
    meta: "2025 · Python · Ollama · Telegram API",
    tags: ["Python", "Ollama", "LLM", "Automation"],
    body: "Fetches unread emails, summarizes content using a locally-run Mistral model via Ollama, and assigns priority levels. Delivers prioritized summaries to a Telegram bot — no cloud-based LLM services required.",
  },
  {
    title: "WeatherGenie",
    meta: "2024 · ReactJS · OpenWeather API · Arduino",
    tags: ["React", "Arduino", "API Integration", "IoT"],
    body: "Interactive weather forecasting platform combining Arduino-powered local sensor data with OpenWeather API global forecasts, delivering room-level precision for temperature, humidity, and environmental analytics with interactive visualizations.",
  },
];

const certifications = [
  {
    name: "Foundations of Cybersecurity",
    issuer: "Google — Coursera",
    date: "Oct 2024",
  },
  {
    name: "Introduction to Networking",
    issuer: "NVIDIA — Coursera",
    date: "Oct 2024",
  },
  {
    name: "ChatGPT Prompt Engineering for Developers",
    issuer: "OpenAI — DeepLearning.AI",
    date: "May 2024",
  },
  {
    name: "Human Research — Social & Behavioral Research",
    issuer: "CITI Program — UIC",
    date: "Sep 2024",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kirtanpatel2003" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kirtanpatel13" },
  { label: "Hack The Box", href: "https://app.hackthebox.com/profile/2477480" },
  { label: "Email", href: "mailto:official.kirtan13@gmail.com" },
  { label: "Résumé", href: "/KirtanPatel_CV.pdf" },
];

const heroStats = [
  { label: "Projects Built", value: "10+" },
  { label: "HTB Machines Owned", value: "30+" },
  { label: "Years at UIC Tech", value: "3+" },
];

const contactDetails = [
  { label: "Email", value: "official.kirtan13@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/kirtanpatel13" },
  { label: "GitHub", value: "github.com/kirtanpatel2003" },
];

const HackTheBoxSection = () => {
  const profileUrl = "https://app.hackthebox.com/profile/2477480";
  const rank = "Hacker";

  return (
    <div className="htb-wrapper positionRelative">
      <div className="htb-header">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="htb-link"
        >
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

      <a
        className="htb-cta"
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Hack The Box Profile
      </a>
    </div>
  );
};

function App() {
  const [logs, setLogs] = useState([
    "whoami → kirtan.patel",
    "loading profile...",
  ]);

  const handleNav = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setLogs((prev) => [...prev, `navigate --section ${id}`]);
  }, []);

  return (
    <div className="app-shell">
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
        <a
          className="nav-cta"
          href="/Kirtan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé
        </a>
      </header>

      <main className="page-shell">
        {/* ── Hero ── */}
        <section id="hero" className="section hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Full-Stack Developer · Security Practitioner · MS CS @ UIC</p>
            <h1>
              Building secure software and systems that actually work.
            </h1>
            <p>
              I'm Kirtan Patel — graduate CS student at UIC with hands-on
              experience in full-stack development, IT operations, and
              offensive/defensive security. I ship automation, build internal
              tooling, and keep systems running.
            </p>
            <div className="hero-actions">
              <button onClick={() => handleNav("projects")}>
                View projects
              </button>
              <a href="mailto:official.kirtan13@gmail.com">Get in touch</a>
            </div>
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.value}</span>
                  <small>{stat.label}</small>
                </div>
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
          <div className="section-header">
            <p className="eyebrow">Stack</p>
            <h2>Languages, frameworks & tools</h2>
            <p>
              <strong>Languages:</strong> Python, JavaScript, HTML5, CSS3 &nbsp;·&nbsp;
              <strong>Frameworks:</strong> ReactJS, Node.js, Express.js, Flask, Next.js &nbsp;·&nbsp;
              <strong>Databases:</strong> MongoDB, MySQL, PostgreSQL &nbsp;·&nbsp;
              <strong>Tools:</strong> Git, Docker, Postman, Vercel, Linux &nbsp;·&nbsp;
              <strong>Hardware:</strong> Arduino, Processing, 3D Printing &nbsp;·&nbsp;
              <strong>Security:</strong> Wireshark, Burp Suite, Nmap, Metasploit, Kali Linux
            </p>
          </div>
          <div className="logo-loop-wrap">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#05060a"
              ariaLabel="Technology stack"
            />
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section experience-section">
          <div className="section-header">
            <p className="eyebrow">Experience</p>
            <h2>Where I've worked</h2>
            <p>
              3+ years supporting technology infrastructure at UIC, from
              front-line classroom support to managing campus-wide IT operations.
            </p>
          </div>
          <div className="experience-timeline">
            {workExperience.map((job) => (
              <div key={job.role} className="experience-card">
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
          <div className="section-header">
            <p className="eyebrow">Projects</p>
            <h2>Things I've built</h2>
            <p>
              From cryptography implementations to IoT sensor fusion — each
              project is a deep dive into a different problem space.
            </p>
          </div>
          <div className="projects-grid">
            {projectEntries.map((project) => (
              <article key={project.title}>
                <h3>{project.title}</h3>
                <p className="project-meta">{project.meta}</p>
                <p>{project.body}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── HTB ── */}
        <section id="htb" className="section htb-section">
          <div className="section-header">
            <p className="eyebrow">Proof of work</p>
            <h2>Hack The Box casefiles</h2>
            <p>
              Offensive labs keep my defensive instincts sharp. Active machines
              honed across network, web, and binary exploitation categories.
            </p>
          </div>
          <HackTheBoxSection />
        </section>

        {/* ── Certifications ── */}
        <section id="certs" className="section certs-section">
          <div className="section-header">
            <p className="eyebrow">Certifications</p>
            <h2>Credentials & coursework</h2>
            <p>Continuous learning across security, networking, and AI.</p>
          </div>
          <div className="certs-grid">
            {certifications.map((cert) => (
              <div key={cert.name} className="cert-card">
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
          <div className="section-header">
            <p className="eyebrow">Contact</p>
            <h2>Let's work together.</h2>
            <p>Open to roles, research collabs, and consulting engagements.</p>
          </div>
          <div className="contact-grid">
            {contactDetails.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Terminal ── */}
        <section id="terminal" className="section terminal-section">
          <div className="section-header">
            <p className="eyebrow">Live Terminal</p>
            <h2>Command log</h2>
            <p>Click nav links to append to the command history.</p>
          </div>
          <Terminal logs={logs} />
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
