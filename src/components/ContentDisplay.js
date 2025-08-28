import ProfileCard from "./Components/ProfileCard/ProfileCard.jsx";
import LogoLoop from "./Animations/LogoLoop/LogoLoop.jsx";
import "./Animations/LogoLoop/LogoLoop.css";
import ScrollStack, {
  ScrollStackItem,
} from "./Components/ScrollStack/ScrollStack.jsx";
import "./htb.css";

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

export default function ContentDisplay({ selected }) {
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
    { node: <SiKalilinux />, title: "Kali", href: "https://kali.org" },
    { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org" },
  ];

  const Projects = () => (
    <div className="grid gap-16 md:grid-cols-2">
      <article>
        <h3 className="text-xl font-semibold">
          Email Summarizer + Telegram Bot
        </h3>
        <p className="opacity-70">
          2024 - present • Python • Gmail API • LLM • Telegram API
        </p>
        <p className="mt-2">
          Auto-digests from Gmail → compact daily summaries pushed to Telegram.
          Supports label filters, threading, batching with rate-limit safety.
        </p>
      </article>

      <article>
        <h3 className="text-xl font-semibold">ScamurAI (WildHacks Finalist)</h3>
        <p className="opacity-70">
          Jan 2025 • Stripe Webhooks • XGBoost • FastAPI
        </p>
        <p className="mt-2">
          Real-time fraud scoring on payment events; suspicious flows trigger
          instant peer alerts for quicker response.
        </p>
      </article>

      <article>
        <h3 className="text-xl font-semibold">
          GenVARS — Generative Vuln Assessment & RS
        </h3>
        <p className="opacity-70">
          2024 - 2025 • Python • Nmap • linPEAS • GenAI report engine
        </p>
        <p className="mt-2">
          Automates recon → finding → suggested exploit paths → remediation
          notes. Lab-only, approval-first design.
        </p>
      </article>

      <article>
        <h3 className="text-xl font-semibold">FaceWAY — AI Kiosk</h3>
        <p className="opacity-70">
          Feb 2025 • React • Express • face-api.js • Google OAuth
        </p>
        <p className="mt-2">
          Local-first identity verification and visit logging; privacy-first
          setup for kiosks.
        </p>
      </article>
    </div>
  );

  const SkillsWithLogoLoop = () => (
    <div className="space-y-6">
      <div style={{ height: 120, position: "relative", overflow: "hidden" }}>
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#0b0b12"
          ariaLabel="Technology stack"
        />
      </div>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        Languages: Python, C/C++, Java, JavaScript/TypeScript Tools: Wireshark,
        Autopsy, Burp Suite, Nmap, Metasploit, Git Domains: Network Security,
        Web Security, Forensics Certs: NVIDIA Intro to Networking; Google
        Cybersecurity (Coursera)
      </pre>
    </div>
  );

  const HTB = () => {
    const profileUrl = "https://app.hackthebox.com/profile/2477480";
    const rank = "Hacker";

    const mthumb = (url) =>
      `https://api.microlink.io/?url=${encodeURIComponent(
        url
      )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=640&viewport.height=360&waitUntil=networkidle2`;

    const items = [
      {
        title: "Owned Planning from Hack The Box!",
        url: "https://labs.hackthebox.com/achievement/machine/2477480/660",
      },
      {
        title: "Owned Artificial from Hack The Box!",
        url: "https://labs.hackthebox.com/achievement/machine/2477480/668",
      },
      {
        title: "Owned Outbound from Hack The Box!",
        url: "https://labs.hackthebox.com/achievement/machine/2477480/672",
      },
      {
        title: "Owned Editor from Hack The Box!",
        url: "https://labs.hackthebox.com/achievement/machine/2477480/684",
      },
      {
        title: "Owned Cobblestone from Hack The Box!",
        url: "https://labs.hackthebox.com/achievement/machine/2477480/691",
      },
      {
        title: "Owned CodeTwo from Hack The Box!",
        url: "https://labs.hackthebox.com/achievement/machine/2477480/692",
      },
    ];

    return (
      <div className="positionRelative">
        <div className="htb-header">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="htb-link"
            title="Open my Hack The Box profile"
          >
            <h2 className="htb-title">Hack The Box — My Profile</h2>
          </a>

          <span className="htb-rank" title="Current rank">
            Rank: {rank}
          </span>

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
                  <td>#909</td>
                  <td>7</td>
                  <td>6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: "75vh" }}>
          <ScrollStack>
            {items.map((m, i) => (
              <ScrollStackItem key={i}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="htb-card"
                >
                  <div className="htb-card-row">
                    <img
                      src={mthumb(m.url)}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="htb-thumb"
                    />
                    <div>
                      <div className="htb-card-title">{m.title}</div>
                      <div className="htb-card-sub">labs.hackthebox.com</div>
                    </div>
                  </div>
                </a>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    );
  };

  const contentMap = {
    about: `👋 Hi, I'm Kirtan Patel — cybersecurity-minded software engineer. MS-CS @ UIC.
I break things in labs, fix them in code, and teach through write-ups.`,
    "skills-tools": <SkillsWithLogoLoop />,
    "experience-projects": <Projects />,
    htb: <HTB />,
    connect: `📫 official.kirtan13@gmail.com
🔗 linkedin.com/in/kirtanpatel13
💻 github.com/kirtanpatel2003
📄 Résumé: put Kirtan_Resume.pdf in /public and link it from your FolderTree`,
  };

  return (
    <div className="content-display">
      {contentMap[selected] ? (
        typeof contentMap[selected] === "string" ? (
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {contentMap[selected]}
          </pre>
        ) : (
          contentMap[selected]
        )
      ) : (
        <div className="profile-card-container">
          <ProfileCard
            name="Kirtan Patel"
            title="Cybersecurity Practitioner"
            handle="official.kirtan13@gmail.com"
            status="Online"
            contactText="Mail"
            avatarUrl="/profile-no-bg.png"
            iconUrl="/bgicon.png"
            showUserInfo
            showBehindGradient={false}
            enableTilt
          />
        </div>
      )}
    </div>
  );
}
