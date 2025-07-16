import ProfileCard from './Components/ProfileCard/ProfileCard.jsx';

export default function ContentDisplay({ selected }) {
  const contentMap = {
    "about": `👋 Hi, I'm Kirtan Patel — a cybersecurity practitioner passionate about building secure systems and solving real-world challenges through digital defense.

🎓 Education:
- Bachelor of Science in Computer Science, University of Illinois Chicago (Graduated May 2025)
- Master of Science in Computer Science, University of Illinois Chicago (Ongoing – Expected Dec 2026)

💼 Current Role:
- Student Manager, Classroom Tech Support @ UIC
  Overseeing technical operations, leading support initiatives, and training teams for seamless classroom experiences.

📚 Current Certification Path:
- EC-Council Full Stack Cybersecurity Bundle
  Mastering offensive, defensive, and governance cybersecurity skills with hands-on labs, CTFs, and expert-led training.
  Topics include:
  - Ethical Hacking, Digital Forensics
  - Data Loss Prevention, PowerShell Security
  - Zero-Day Exploits, AI in Cybersecurity
  Training involves real-world simulation labs and Capture The Flag challenges designed to equip professionals for modern cybersecurity demands.

🛠️ Recent Project:
- ScamurAI: AI-powered tool for detecting and analyzing financial scams using real-time Stripe webhook data and predictive fraud models.

🚀 Future Goal:
- Preparing for CompTIA Security+ to further validate my foundational cybersecurity expertise and industry readiness.

📘 Related Coursework:
- Secure Web App Development
- Secure Computer Systems
- Intro to Cryptography
- Intro to Networking
- Artificial Intelligence I
- Database Systems
- Languages and Automata
- Software Engineering I & II
- Computer Design
- Systems Programming
- Programming Language Concepts
- Data Structures & Machine Organization`,
    "skills-tools": "Languages: Python, C++\nTools: Wireshark, Autopsy, Burp Suite, Nmap\nDomains: Network Security, Ethical Hacking, Forensics\nCertifications: CompTIA CySA+, Introduction to Networking (NVIDIA), more coming soon.",
    "experience-projects": "🔐 Experience:\n- Classroom Tech Specialist @ UIC (Promoted to Student Manager)\n- Vulnerability Labs using DVWA, OWASP Juice Shop\n\n🧪 Projects:\n- GenVARS: GenAI for Vuln Discovery + Exploits\n- Autopsy UI: Forensic Visualization Tool\n- PenTest Logger: Terminal-based attack tracking system",
    "recognition": "🏅 Recognition:\n- CompTIA CySA+ (in progress)\n- UIC Certificate of Excellence in Cyber Learning\n- Coursera & NVIDIA: Introduction to Networking\n- Top 5 Finalist - WildHacks 2025",
    "connect": "📫 Connect with me:\nEmail: official.kirtan13@gmail.com\nLinkedIn: linkedin.com/in/kirtanpatel13\nGitHub: github.com/kirtanpatel2003\n\n📄 Résumé:\nClick on resume.pdf in the folder tree to download"
  };

  return (
    <div className="content-display">
      {
        contentMap[selected] ? (
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{contentMap[selected]}</pre>
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
              showUserInfo={true}
              showBehindGradient={false}
              enableTilt={true}
            />
          </div>
        )
      }
    </div>
  );
}