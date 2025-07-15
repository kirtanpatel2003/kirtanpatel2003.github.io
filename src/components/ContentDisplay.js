export default function ContentDisplay({ selected }) {
  const contentMap = {
    about: "This is the about section. I love cybersecurity and terminal UIs.",
    projects: "Project 1: Autopsy UI\nProject 2: Wireshark Clone\nProject 3: PenTest Logger",
    connect: "Email: kirtan@example.com\nGitHub: github.com/kirtanpatel2003",
    "resume.pdf": "[RESUME DOWNLOAD INITIATED...]"
  };

  return (
    <div className="content-display">
      <pre>{contentMap[selected] || "Click a folder to view its contents."}</pre>
    </div>
  );
}