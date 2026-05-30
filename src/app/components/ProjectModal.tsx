import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Play, Pause, FileText, FolderOpen, FlaskConical,
  BookOpen, Download, ExternalLink, ChevronRight, Clock,
  User, Tag, Zap, AlertTriangle, CheckCircle2, Lightbulb,
} from "lucide-react";

type ProjectType = "Webapp" | "RPA" | "Agent";

export interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  author: string;
  date: string;
  thumbnail: string;
  tags: string[];
  video?: string;
  detail: {
    overview: string;
    keyPoints: string[];
    techStack: string[];
    notes: string[];
    highlights: string[];
  };
  attachments: Attachment[];
}

interface Attachment {
  name: string;
  type: "skill" | "folder" | "prd" | "test" | "doc";
  size?: string;
  url?: string;
}

const TYPE_COLORS: Record<ProjectType, { bg: string; text: string; border: string }> = {
  Webapp: { bg: "#e8f1fd", text: "#0070e0", border: "rgba(0,112,224,0.25)" },
  RPA:    { bg: "#e6f7f2", text: "#059669", border: "rgba(5,150,105,0.25)" },
  Agent:  { bg: "#f2eeff", text: "#7c3aed", border: "rgba(124,58,237,0.25)" },
};

const ATTACH_ICONS: Record<Attachment["type"], React.ReactNode> = {
  skill:  <BookOpen size={14} />,
  folder: <FolderOpen size={14} />,
  prd:    <FileText size={14} />,
  test:   <FlaskConical size={14} />,
  doc:    <FileText size={14} />,
};

const ATTACH_COLORS: Record<Attachment["type"], { bg: string; text: string; border: string }> = {
  skill:  { bg: "#f2eeff", text: "#7c3aed", border: "rgba(124,58,237,0.2)" },
  folder: { bg: "#fff7ed", text: "#d97706", border: "rgba(217,119,6,0.2)" },
  prd:    { bg: "#e8f1fd", text: "#0070e0", border: "rgba(0,112,224,0.2)" },
  test:   { bg: "#e6f7f2", text: "#059669", border: "rgba(5,150,105,0.2)" },
  doc:    { bg: "#f5f7fa", text: "#6b84a0", border: "rgba(107,132,160,0.2)" },
};

// ── Video player ────────────────────────────────────────────────────────────
function VideoHero({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="relative w-full h-full" style={{ background: "#000" }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        style={{ objectFit: "cover" }}
        onEnded={() => setPlaying(false)}
      />
      {/* Play / pause button — bottom-left */}
      <button
        onClick={toggle}
        className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.78rem",
          color: "#0f1c2e",
          fontWeight: 600,
          backdropFilter: "blur(6px)",
        }}
      >
        {playing ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}

// ── Rich content editor (read-only styled panel) ─────────────────────────────
function ContentEditor({ project }: { project: ProjectDetail }) {
  const c = TYPE_COLORS[project.type];

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        fontFamily: "'Inter', sans-serif",
        scrollbarWidth: "none",
      }}
    >
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            style={{
              background: c.bg, color: c.text, border: `1px solid ${c.border}`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.08em",
              padding: "2px 8px", borderRadius: 4, textTransform: "uppercase",
            }}
          >
            {project.type}
          </span>
          <div className="flex items-center gap-1" style={{ color: "#6b84a0", fontSize: "0.75rem" }}>
            <User size={11} />
            <span>{project.author}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "#6b84a0", fontSize: "0.75rem" }}>
            <Clock size={11} />
            <span>{project.date}</span>
          </div>
        </div>
        <h2
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "1.35rem", fontWeight: 700,
            color: "#0f1c2e", lineHeight: 1.3, marginBottom: 6,
          }}
        >
          {project.name}
        </h2>
        <p style={{ fontSize: "0.82rem", color: "#6b84a0", lineHeight: 1.6 }}>
          {project.description}
        </p>
      </div>

      <div style={{ height: 1, background: "rgba(0,80,180,0.08)", marginBottom: "1.25rem" }} />

      {/* Overview */}
      <Section icon={<BookOpen size={13} color="#0070e0" />} title="项目概述" color="#0070e0">
        <p style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.75 }}>
          {project.detail.overview}
        </p>
      </Section>

      {/* Highlights */}
      <Section icon={<Zap size={13} color="#d97706" />} title="核心亮点" color="#d97706">
        <ul className="flex flex-col gap-1.5">
          {project.detail.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} color="#059669" style={{ marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontSize: "0.81rem", color: "#374151", lineHeight: 1.6 }}>{h}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Key points */}
      <Section icon={<Lightbulb size={13} color="#7c3aed" />} title="关键实现要点" color="#7c3aed">
        <ol className="flex flex-col gap-2">
          {project.detail.keyPoints.map((kp, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem", color: "#7c3aed",
                  background: "#f2eeff", border: "1px solid rgba(124,58,237,0.2)",
                  padding: "1px 6px", borderRadius: 4,
                  lineHeight: 1.8, flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "0.81rem", color: "#374151", lineHeight: 1.65 }}>{kp}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Notes / caveats */}
      {project.detail.notes.length > 0 && (
        <Section icon={<AlertTriangle size={13} color="#d97706" />} title="注意事项" color="#d97706">
          <div
            className="rounded-lg p-3"
            style={{ background: "#fffbeb", border: "1px solid rgba(217,119,6,0.18)" }}
          >
            <ul className="flex flex-col gap-1.5">
              {project.detail.notes.map((n, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight size={12} color="#d97706" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8rem", color: "#92400e", lineHeight: 1.6 }}>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Tech stack */}
      <Section icon={<Tag size={13} color="#6b84a0" />} title="技术栈" color="#6b84a0">
        <div className="flex flex-wrap gap-1.5">
          {project.detail.techStack.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem", color: "#0f1c2e",
                background: "#f0f4f9", border: "1px solid rgba(0,80,180,0.1)",
                padding: "3px 10px", borderRadius: 5,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon, title, color, children,
}: {
  icon: React.ReactNode; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-1.5 mb-2.5">
        {icon}
        <span
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "0.8rem", fontWeight: 600,
            color, letterSpacing: "0.03em",
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

// ── Attachments strip ────────────────────────────────────────────────────────
function AttachmentStrip({ attachments }: { attachments: Attachment[] }) {
  return (
    <div
      className="flex flex-wrap gap-2.5 pt-4"
      style={{ borderTop: "1px solid rgba(0,80,180,0.08)" }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.72rem", color: "#6b84a0",
          alignSelf: "center", marginRight: 4, whiteSpace: "nowrap",
        }}
      >
        产出物附件：
      </span>
      {attachments.map((a, i) => {
        const ac = ATTACH_COLORS[a.type];
        return (
          <a
            key={i}
            href={a.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg no-underline"
            style={{
              background: ac.bg, color: ac.text,
              border: `1px solid ${ac.border}`,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem", fontWeight: 500,
              transition: "all 0.15s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 2px 8px ${ac.border}`;
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
            }}
          >
            {ATTACH_ICONS[a.type]}
            <span>{a.name}</span>
            {a.size && (
              <span style={{ fontSize: "0.62rem", opacity: 0.65 }}>{a.size}</span>
            )}
            {a.url ? <ExternalLink size={10} style={{ opacity: 0.5 }} /> : <Download size={10} style={{ opacity: 0.5 }} />}
          </a>
        );
      })}
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
export function ProjectModal({
  project, onClose,
}: {
  project: ProjectDetail | null;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(15,28,46,0.55)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0, zIndex: 101,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2vh 2vw",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "min(92vw, 1100px)",
                maxHeight: "90vh",
                background: "#ffffff",
                borderRadius: 16,
                border: "1px solid rgba(0,80,180,0.1)",
                boxShadow: "0 24px 80px rgba(0,40,120,0.18), 0 4px 16px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                pointerEvents: "all",
              }}
            >
              {/* ── Main body: image + editor ── */}
              <div className="flex flex-1 min-h-0" style={{ minHeight: 0 }}>
                {/* Left: hero media */}
                <div
                  style={{
                    width: "50%",
                    flexShrink: 0,
                    background: "#0f1c2e",
                    position: "relative",
                    minHeight: 380,
                  }}
                >
                  {project.video ? (
                    <VideoHero src={project.video} poster={project.thumbnail} />
                  ) : (
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                  {/* Gradient edge blend */}
                  <div
                    style={{
                      position: "absolute", top: 0, right: 0, bottom: 0, width: 32,
                      background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08))",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Right: content editor */}
                <div
                  className="flex flex-col flex-1 min-w-0"
                  style={{
                    padding: "24px 24px 0 24px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    style={{
                      position: "absolute", top: 16, right: 16,
                      width: 28, height: 28, borderRadius: "50%",
                      background: "#f0f4f9", border: "1px solid rgba(0,80,180,0.1)",
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0,
                    }}
                  >
                    <X size={13} color="#6b84a0" />
                  </button>

                  <ContentEditor project={project} />
                </div>
              </div>

              {/* ── Attachments footer ── */}
              <div style={{ padding: "12px 24px 16px", background: "#fafbfd", borderTop: "1px solid rgba(0,80,180,0.06)" }}>
                <AttachmentStrip attachments={project.attachments} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
