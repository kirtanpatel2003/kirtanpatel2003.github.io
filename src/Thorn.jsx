import "./Thorn.css";
import { useCallback, useEffect, useRef, useState } from "react";

/* Thorn — the llm-thorn cactus. Hops along the bottom edge as the page
   scrolls; when scrolling stops it says something about the section in
   view. Lines cycle per section, so stopping there again tells the next
   part of the story.

   The walk is out and back: right edge at the top of the page, left edge
   halfway down, right edge again at the end. That keeps the bubble off
   the hero and contact CTAs, which both sit on the left.

   On phones the bubble would cover most of the screen after every flick,
   so Thorn only raises a "!" when he has something new and talks on tap. */

const script = {
  hero: {
    word: "Howdy!",
    lines: [
      "I'm Thorn, the cactus behind llm-thorn. Kirtan built the proxy; I just do the talking. Scroll, then stop anywhere.",
      "Short version: he finds the gaps, then ships what closes them. Security analyst or forward deployed, he's up for both.",
      "PyPI calls llm-thorn “the WAF for the AI era.” I call it home.",
    ],
  },
  focus: {
    word: "Focus!",
    lines: [
      "Security analyst mode: what a system actually does matters more than what its docs promise.",
      "Forward deployed mode: it isn't done when it deploys. It's done when people can use it without calling him.",
      "Same habit in both: verify first, ship second.",
    ],
  },
  opensource: {
    word: "Open source!",
    lines: [
      "llm-thorn runs every prompt and response through four detector layers. Pointy on purpose.",
      "Five enforcement actions: allow, warn, block, redact, terminate. I'm partial to terminate.",
      "The Curio maintainers adopted his collaboration design and credit him by name. Receipts: PR #112.",
      "Red Co-Author attacks LLMs, then trains a detector to catch the attack. Both sides of the fight, one repo.",
    ],
  },
  experience: {
    word: "On the job!",
    lines: [
      "UIC Technology Solutions since 2022: classroom tech first, now leading tier-2 escalations.",
      "He writes the troubleshooting docs the team actually uses. Rarer than a cactus in Chicago.",
      "He helps hire and train new specialists. Patience: confirmed.",
    ],
  },
  projects: {
    word: "Built it!",
    lines: [
      "Hunter treats every AI claim as a hypothesis. No matching tool output, no spot in the report.",
      "Mini Tor: SHA-256, HKDF, X25519 and AES-GCM written from scratch. No crypto libraries. Brave, or stubborn. Both.",
      "KeyTracker: 35+ users, no reported downtime since launch. Keys go out, keys come back.",
      "Ethos: his checker caught a kernel allowing writes the policy said no to. Gotcha.",
    ],
  },
  htb: {
    word: "Pwned!",
    lines: [
      "Skilled rank, level 37, 18 machines rooted. All authorized. I checked.",
      "Enumerate, exploit, escalate, write it up. That's how the alerts start making sense.",
    ],
  },
  skills: {
    word: "Tools!",
    lines: [
      "Offensive tools to find the problem, an engineering stack to ship the fix.",
      "Yes, that's Go next to Python. The Ethos checker is written in Go.",
    ],
  },
  credentials: {
    word: "Schooled!",
    lines: [
      "M.S. in Computer Science at UIC, wrapping up December 2026.",
      "Dean's List twice: Fall 2023 and Fall 2024. I've never made any list. I'm a cactus.",
    ],
  },
  contact: {
    word: "Ping him!",
    lines: [
      "This is where you email him. I would, but no thumbs.",
      "Résumé's one click away. I've read it. It's good.",
    ],
  },
};

const STOP_DELAY = 650; // ms of stillness before Thorn speaks
const TYPE_MS = 22; // typewriter speed per character
const LINGER_MS = 8000; // bubble stays this long after the line finishes
const HIDE_AFTER_PX = 80; // scrolling this far closes the bubble
const REPEAT_AFTER_PX = 240; // same section needs this much travel to speak again
const COMPACT_W = 560; // track widths below this get tap-to-talk

function isCompact() {
  return window.innerWidth - 32 < COMPACT_W;
}

function readMuted() {
  try {
    return localStorage.getItem("thorn-muted") === "1";
  } catch {
    return false;
  }
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollProgress() {
  const h = document.documentElement;
  return Math.min(Math.max(window.scrollY / (h.scrollHeight - h.clientHeight || 1), 0), 1);
}

/* Horizontal position along the track for a scroll progress: 1 = right edge, 0 = left */
function walkAt(p) {
  return Math.abs(1 - 2 * p);
}

/* Whichever scripted section crosses the line just above mid-viewport */
function sectionInView() {
  const line = window.innerHeight * 0.45;
  for (const id of Object.keys(script)) {
    const r = document.getElementById(id)?.getBoundingClientRect();
    if (r && r.top <= line && r.bottom > line) return id;
  }
  return null;
}

function ThornArt() {
  return (
    <svg viewBox="0 0 100 120" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id="thorn-halftone" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.15" fill="#0b6b33" />
        </pattern>
        <pattern id="thorn-polka" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill="#fff" />
        </pattern>
        <clipPath id="thorn-shade">
          <rect x="55" y="0" width="45" height="120" />
        </clipPath>
      </defs>

      {/* outline pass, then fill pass, so overlapping limbs merge cleanly */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="#16161a">
          <path d="M50 30V80" strokeWidth="40" />
          <path className="thorn-arm-l" d="M36 62H25V47" strokeWidth="17" />
          <path className="thorn-arm-r" d="M64 54H75V39" strokeWidth="17" />
        </g>
        <g stroke="#2bd46a">
          <path d="M50 30V80" strokeWidth="33" />
          <path className="thorn-arm-l" d="M36 62H25V47" strokeWidth="10" />
          <path className="thorn-arm-r" d="M64 54H75V39" strokeWidth="10" />
        </g>
        <g stroke="url(#thorn-halftone)" clipPath="url(#thorn-shade)">
          <path d="M50 30V80" strokeWidth="33" />
          <path className="thorn-arm-r" d="M64 54H75V39" strokeWidth="10" />
        </g>
        <path d="M40 22V40" stroke="#fff" strokeWidth="3.2" opacity="0.85" />
        <g stroke="#16161a" strokeWidth="2">
          <path d="M37 70l-3-1.5M63 68l3-1.5M44 78l-2.5-1.5M58 30l2.5-1.5M22 50l-2.5-1M78 42l2.5-1" />
        </g>
      </g>

      {/* flower */}
      <g stroke="#16161a" strokeWidth="2.2">
        <circle cx="50" cy="4.5" r="3.6" fill="#ffd60a" />
        <circle cx="45" cy="8.5" r="3.6" fill="#ffd60a" />
        <circle cx="55" cy="8.5" r="3.6" fill="#ffd60a" />
        <circle cx="47" cy="13" r="3.6" fill="#ffd60a" />
        <circle cx="53" cy="13" r="3.6" fill="#ffd60a" />
        <circle cx="50" cy="9.5" r="3" fill="#ff4fa3" />
      </g>

      {/* face */}
      <g className="thorn-eyes">
        <ellipse cx="43" cy="42" rx="5" ry="6" fill="#fff" stroke="#16161a" strokeWidth="2.4" />
        <ellipse cx="57" cy="42" rx="5" ry="6" fill="#fff" stroke="#16161a" strokeWidth="2.4" />
        <circle cx="44.6" cy="43" r="2.6" fill="#16161a" />
        <circle cx="58.6" cy="43" r="2.6" fill="#16161a" />
      </g>
      <g className="thorn-sleepy" fill="none" stroke="#16161a" strokeWidth="2.4" strokeLinecap="round">
        <path d="M38.5 43q4.5 3.5 9 0M52.5 43q4.5 3.5 9 0" />
      </g>
      <circle cx="37.5" cy="51" r="3.4" fill="#ff7aa8" />
      <circle cx="62.5" cy="51" r="3.4" fill="#ff7aa8" />
      <path
        className="thorn-smile"
        d="M45.5 51.5q4.5 4.5 9 0"
        fill="none"
        stroke="#16161a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <ellipse className="thorn-mouth" cx="50" cy="53" rx="3.6" ry="3" fill="#16161a" />

      {/* pot */}
      <g stroke="#16161a" strokeWidth="3.6" strokeLinejoin="round">
        <path d="M29 90H71L66.5 116H33.5Z" fill="#ff4136" />
        <path d="M29 90H71L66.5 116H33.5Z" fill="url(#thorn-polka)" stroke="none" />
        <rect x="24" y="82" width="52" height="10" rx="3" fill="#ff4136" />
      </g>
    </svg>
  );
}

export default function Thorn() {
  const [progress, setProgress] = useState(scrollProgress);
  const [moving, setMoving] = useState(false);
  const [facing, setFacing] = useState(-1);
  const [bubble, setBubble] = useState(null);
  const [hint, setHint] = useState(false);
  const [typed, setTyped] = useState(0);
  const [muted, setMuted] = useState(readMuted);
  const [reduced, setReduced] = useState(reducedMotion);
  const [trackW, setTrackW] = useState(() => window.innerWidth - 32);

  const lineIdx = useRef({});
  const lastP = useRef(progress);
  const spoke = useRef({ y: -Infinity, id: null });
  const stopTimer = useRef();
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const speak = useCallback((id) => {
    const entry = script[id];
    if (!entry) return;
    const n = lineIdx.current[id] ?? 0;
    lineIdx.current[id] = n + 1;
    spoke.current = { y: window.scrollY, id };
    setHint(false);
    setTyped(0);
    setBubble({ id, word: entry.word, text: entry.lines[n % entry.lines.length], n });
  }, []);

  /* Walk while scrolling; talk once the page settles */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const p = scrollProgress();
      // face the way he's walking, which flips at the halfway turnaround
      const dx = walkAt(p) - walkAt(lastP.current);
      lastP.current = p;
      setProgress(p);
      if (Math.abs(dx) > 0.0005) setFacing(dx > 0 ? 1 : -1);
      setMoving(true);
      if (Math.abs(y - spoke.current.y) > HIDE_AFTER_PX) setBubble(null);

      clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => {
        setMoving(false);
        if (mutedRef.current) return;
        const id = sectionInView();
        if (!id) return;
        if (id === spoke.current.id && Math.abs(window.scrollY - spoke.current.y) < REPEAT_AFTER_PX) {
          return;
        }
        if (isCompact()) {
          spoke.current = { y: window.scrollY, id };
          setHint(true);
          return;
        }
        speak(id);
      }, STOP_DELAY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(stopTimer.current);
    };
  }, [speak]);

  /* Say hello once, unless the visitor already started scrolling */
  useEffect(() => {
    if (readMuted()) return;
    const t = setTimeout(() => {
      if (spoke.current.id !== null) return;
      const id = sectionInView();
      if (!id) return;
      if (isCompact()) setHint(true);
      else speak(id);
    }, 1600);
    return () => clearTimeout(t);
  }, [speak]);

  useEffect(() => {
    const onResize = () => setTrackW(window.innerWidth - 32);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(mq.matches);
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onMotion);
    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  /* Typewriter, then linger, then tidy up */
  useEffect(() => {
    if (!bubble) return;
    const full = bubble.text.length;
    let linger;
    const finish = () => {
      linger = setTimeout(() => setBubble(null), LINGER_MS);
    };
    if (reduced) {
      setTyped(full);
      finish();
      return () => clearTimeout(linger);
    }
    setTyped(0);
    let n = 0;
    const tick = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= full) {
        clearInterval(tick);
        finish();
      }
    }, TYPE_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(linger);
    };
  }, [bubble, reduced]);

  const setMute = (next) => {
    setMuted(next);
    if (next) {
      setBubble(null);
      setHint(false);
    }
    try {
      localStorage.setItem("thorn-muted", next ? "1" : "0");
    } catch {
      /* storage blocked: the mute just won't survive a reload */
    }
  };

  const onPoke = () => {
    if (muted) setMute(false);
    if (bubble && typed < bubble.text.length) {
      setTyped(bubble.text.length);
      return;
    }
    speak(sectionInView() ?? "hero");
  };

  const talking = bubble !== null && typed < bubble.text.length;
  const size = trackW < COMPACT_W ? 58 : 76;
  const charX = (reduced ? 1 : walkAt(progress)) * Math.max(trackW - size, 0);
  const bubbleW = Math.min(320, trackW);
  const bubbleLeft = Math.min(Math.max(charX + size / 2 - bubbleW / 2, 0), trackW - bubbleW);
  const tailX = Math.min(Math.max(charX + size / 2 - bubbleLeft, 24), bubbleW - 24);
  const total = bubble ? script[bubble.id].lines.length : 0;

  const classes = ["thorn"];
  if (moving && !reduced) classes.push("is-moving");
  if (talking) classes.push("is-talking");
  if (muted) classes.push("is-asleep");

  return (
    <div className={classes.join(" ")} style={{ "--thorn-size": `${size}px` }}>
      {bubble && (
        <div
          key={`${bubble.id}-${bubble.n}`}
          className="thorn-bubble"
          style={{ left: bubbleLeft, width: bubbleW, "--tail-x": `${tailX}px` }}
        >
          <span className="thorn-word">{bubble.word}</span>
          <p className="thorn-line">
            <span className="thorn-sizer" aria-hidden="true">
              {bubble.text}
            </span>
            <span className="thorn-typed" aria-hidden="true">
              {bubble.text.slice(0, typed)}
              {talking && <span className="thorn-caret" />}
            </span>
            <span className="thorn-sr">{bubble.text}</span>
          </p>
          <div className="thorn-actions">
            <span className="thorn-count">
              {(bubble.n % total) + 1}/{total}
            </span>
            <button className="thorn-more" onClick={() => speak(bubble.id)}>
              More →
            </button>
            <button onClick={() => setMute(true)}>Shh</button>
            <button onClick={() => setBubble(null)} aria-label="Close">
              ×
            </button>
          </div>
        </div>
      )}

      <button
        className="thorn-buddy"
        style={{ left: charX }}
        onClick={onPoke}
        aria-label={
          muted
            ? "Wake Thorn, the site's cactus guide"
            : "Thorn, the site's cactus guide: tell me about this section"
        }
      >
        {hint && !muted && (
          <span className="thorn-hint" aria-hidden="true">
            !
          </span>
        )}
        <span className="thorn-flip" style={{ transform: `scaleX(${facing})` }}>
          <span className="thorn-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="thorn-hop">
            <ThornArt />
          </span>
        </span>
        {muted && (
          <span className="thorn-zz" aria-hidden="true">
            z<small>z</small>
          </span>
        )}
      </button>
    </div>
  );
}
