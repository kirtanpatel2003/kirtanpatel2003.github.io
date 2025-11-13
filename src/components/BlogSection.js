import { useEffect, useState } from "react";

const blogManifest = [
  {
    filename: "signal-triage.txt",
    slug: "signal-triage",
    date: "Feb 2025",
    tags: ["Incident Response", "Threat Hunting"],
  },
  {
    filename: "purple-teaming.txt",
    slug: "purple-teaming",
    date: "Jan 2025",
    tags: ["Purple Team", "Automation"],
  },
  {
    filename: "edge-hardening.txt",
    slug: "edge-hardening",
    date: "Dec 2024",
    tags: ["DevSecOps", "Cloud Edge"],
  },
];

const parseBlogFile = (content) => {
  const trimmed = content.trim();
  if (!trimmed) {
    return { title: "Untitled Entry", body: "" };
  }

  const [rawTitle, ...rest] = trimmed.split("\n");
  const title = rawTitle.replace(/^#\s*/, "").trim() || "Untitled Entry";
  const body = rest.join("\n").trim();
  return { title, body };
};

const buildExcerpt = (body) => {
  if (!body) return "Entry uploaded, awaiting declassification.";
  const inline = body.replace(/\s+/g, " ").trim();
  return inline.length > 220 ? `${inline.slice(0, 217)}...` : inline;
};

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        const hydrated = await Promise.all(
          blogManifest.map(async (entry) => {
            const response = await fetch(`/blogs/${entry.filename}`);
            if (!response.ok) {
              throw new Error(`Failed to load ${entry.filename}`);
            }

            const fileContent = await response.text();
            const { title, body } = parseBlogFile(fileContent);

            return {
              ...entry,
              title,
              body,
              excerpt: buildExcerpt(body),
            };
          })
        );

        if (isMounted) {
          setPosts(hydrated);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Blog stream is offline. Try again shortly.");
        }
      }
    };

    hydrate();
    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <div className="blog-error">{error}</div>;
  }

  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <article key={post.slug} className="blog-card">
          <div className="blog-card-header">
            <span className="blog-date">{post.date}</span>
            <div className="blog-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <h3>{post.title}</h3>
          <p className="blog-excerpt">{post.excerpt}</p>
          <details className="blog-details">
            <summary>Read full note</summary>
            <pre>{post.body || "Awaiting content..."}</pre>
          </details>
        </article>
      ))}
    </div>
  );
}
