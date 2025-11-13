import "./App.css";
import { useCallback, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiStripe,
  SiLinux,
  SiKalilinux,
  SiNumpy,
} from "react-icons/si";
import ProfileCard from "./components/Components/ProfileCard/ProfileCard.jsx";
import LogoLoop from "./components/Animations/LogoLoop/LogoLoop.jsx";
import BlogSection from "./components/BlogSection";
import Terminal from "./components/Terminal";
import GlobeDots from "./components/GlobeDots";
import "./components/Animations/LogoLoop/LogoLoop.css";
import "./components/htb.css";

const navLinks = [
  { id: "hero", label: "Mission" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Projects" },
  // { id: "intel", label: "Blog" },
  { id: "htb", label: "Hack The Box" },
  { id: "contact", label: "Contact" },
];

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://postgresql.org",
  },
  { node: <SiStripe />, title: "Stripe", href: "https://stripe.com" },
  { node: <SiLinux />, title: "Linux", href: "https://kernel.org" },
  { node: <SiKalilinux />, title: "Kali Linux", href: "https://kali.org" },
  { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org" },
];

const projectEntries = [
  {
    title: "Indic Multilingual Voice AI for Businesses",
    meta: "Present • Python • Hugging Face • AI4Bharat",
    body: "Voice-based AI assistant using AI4Bharat ASR/MT/TTS to understand and reply in multiple Indian languages. Handles queries end-to-end with easy business workflow integration.",
  },
  {
    title: "Email Summarizer + Telegram Bot",
    meta: "May 2025 • Python • Gmail API • LLM • Telegram API",
    body: "Auto-digests from Gmail → compact daily summaries pushed to Telegram. Supports label filters, threading, batching with rate-limit safety.",
  },
  {
    title: "FaceWAY — AI Kiosk for Contactless Check-in",
    meta: "Feb 2025 • React • Express • face-api.js • Google OAuth",
    body: "Local-first identity verification and visit logging; privacy-first setup for kiosks.",
  },
  {
    title: "ScamurAI (WildHacks Finalist)",
    meta: "Jan 2025 • Stripe Webhooks • XGBoost • FastAPI",
    body: "Real-time fraud scoring on payment events; suspicious flows trigger instant peer alerts for quicker response.",
  },
  {
    title: "GenVARS — Generative Vuln Assessment & RS",
    meta: "Dec 2024 • Python • Nmap • linPEAS • GenAI report engine",
    body: "Automates recon → finding → suggested exploit paths → remediation notes. Lab-only, approval-first design.",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kirtanpatel2003" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kirtanpatel13" },
  { label: "Hack The Box", href: "https://app.hackthebox.com/profile/2477480" },
  { label: "Email", href: "mailto:official.kirtan13@gmail.com" },
  { label: "Résumé", href: "/Kirtan_Resume.pdf" },
];

const heroStats = [
  { label: "Red/Blue Exercises", value: "34" },
  { label: "Automation Pipelines", value: "7" },
  { label: "CTF / HTB Owns", value: "30+" },
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
    "loading mission profile...",
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
          <small>CYBER OPS</small>
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
        <section id="hero" className="section hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Cybersecurity Engineer · Builder · Analyst</p>
            <h1>
              Offense-informed defense for teams that need fast, actionable
              intelligence.
            </h1>
            <p>
              I'm Kirtan Patel — MS CS @ UIC. I break things in labs, fix them
              with code, and ship automation so teams can respond in minutes,
              not hours.
            </p>
            <div className="hero-actions">
              <button onClick={() => handleNav("projects")}>
                View deployments
              </button>
              <a href="mailto:official.kirtan13@gmail.com">Open secure line</a>
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
              title="Cybersecurity Practitioner"
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

        <section id="skills" className="section skills-section">
          <div className="section-header">
            <p className="eyebrow">Stack</p>
            <h2>Signal processing + product build toolkit</h2>
            <p>
              Languages: Python, C/C++, JavaScript • Tooling:
              Wireshark, Autopsy, Burp Suite, Nmap, Metasploit • Domains:
              Network Security, Web Security, Forensics • Certs: NVIDIA Intro to
              Networking, Google Cybersecurity (Coursera) • Currently Preparing: CompTIA Security+
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

        <section id="projects" className="section projects-section">
          <div className="section-header">
            <p className="eyebrow">Deployments</p>
            <h2>Products & automations currently shipping</h2>
            <p>
              High-signal tooling for fraud, detection, and edge security. Each
              project blends software craftsmanship with adversarial thinking.
            </p>
          </div>
          <div className="projects-grid">
            {projectEntries.map((project) => (
              <article key={project.title}>
                <h3>{project.title}</h3>
                <p className="project-meta">{project.meta}</p>
                <p>{project.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* <section id="intel" className="section blog-section">
          <div className="section-header">
            <p className="eyebrow">Intel Hub</p>
            <h2>Field notes pulled directly from .txt drops</h2>
            <p>
              Every blog entry is written in plaintext, checked into
              <code> /public/blogs</code>, and rendered live for maximum
              transparency.
            </p>
          </div>
          <BlogSection />
        </section> */}

        <section id="htb" className="section htb-section">
          <div className="section-header">
            <p className="eyebrow">Proof of work</p>
            <h2>Hack The Box casefiles</h2>
            <p>
              Offensive labs keep my defensive instincts sharp. Recent owns are
              documented with automation-ready notes for blue teams.
            </p>
          </div>
          <HackTheBoxSection />
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-header">
            <p className="eyebrow">Contact</p>
            <h2>Need a security engineer who ships?</h2>
            <p>Reach out for roles, consulting, or research collabs.</p>
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

        <section id="terminal" className="section terminal-section">
          <div className="section-header">
            <p className="eyebrow">Live Terminal</p>
            <h2>Command log</h2>
            <p>Click nav anchors to append to the command history.</p>
          </div>
          <Terminal logs={logs} />
        </section>
      </main>

      <footer className="global-footer">
        <div>
          <h4>KP Cyber</h4>
          <p>Chicago, IL · Operating remotely and on-site.</p>
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
