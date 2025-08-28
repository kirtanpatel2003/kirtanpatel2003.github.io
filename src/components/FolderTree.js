
// export default function FolderTree({ onSelect }) {
//   return (
//     <div className="folder-tree">
//       <p onClick={() => onSelect("about")}>📁 about</p>
//       <p onClick={() => onSelect("skills-tools")}>📁 skills-tools</p>
//       <p onClick={() => onSelect("experience-projects")}>📁 experience-projects</p>
//       {/* <p onClick={() => onSelect("recognition")}>📁 recognition</p> */}
//       <p onClick={() => onSelect("htb")}>📁 htb</p>
//       <p onClick={() => onSelect("connect")}>📁 connect</p>
//       <p onClick={() => onSelect("resume.pdf")}>📄 resume.pdf</p>
//     </div>
//   );
// }

export default function FolderTree({ onSelect }) {
  const openResume = () => {
    const url = "/Kirtan_Resume.pdf";

    window.open(url, "_blank", "noopener,noreferrer");

    const a = document.createElement("a");
    a.href = url;
    a.download = "Kirtan_Patel_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="folder-tree">
      <p onClick={() => onSelect("about")}>📁 about</p>
      <p onClick={() => onSelect("skills-tools")}>📁 skills-tools</p>
      <p onClick={() => onSelect("projects")}>📁 experience-projects</p>
      {/* <p onClick={() => onSelect("recognition")}>📁 recognition</p> */}
      <p onClick={() => onSelect("connect")}>📁 connect</p>

      <p
        role="link"
        tabIndex={0}
        onClick={openResume}
        onKeyDown={(e) => e.key === "Enter" && openResume()}
      >
        📄 resume.pdf
      </p>
    </div>
  );
}
