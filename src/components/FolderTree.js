
export default function FolderTree({ onSelect }) {
  return (
    <div className="folder-tree">
      <p onClick={() => onSelect("about")}>📁 about</p>
      <p onClick={() => onSelect("skills-tools")}>📁 skills-tools</p>
      <p onClick={() => onSelect("experience-projects")}>📁 experience-projects</p>
      <p onClick={() => onSelect("recognition")}>📁 recognition</p>
      <p onClick={() => onSelect("connect")}>📁 connect</p>
      <p onClick={() => onSelect("resume.pdf")}>📄 resume.pdf</p>
    </div>
  );
}