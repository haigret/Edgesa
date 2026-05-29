import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ExternalLink, User, Calendar, Layers } from "lucide-react";

type ProjectType = "Webapp" | "RPA" | "Agent";

interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  author: string;
  date: string;
  thumbnail: string;
  tags: string[];
}

const TYPE_COLORS: Record<ProjectType, { bg: string; text: string; border: string; shadow: string }> = {
  Webapp: {
    bg: "#e8f1fd",
    text: "#0070e0",
    border: "rgba(0,112,224,0.25)",
    shadow: "rgba(0,112,224,0.12)",
  },
  RPA: {
    bg: "#e6f7f2",
    text: "#059669",
    border: "rgba(5,150,105,0.25)",
    shadow: "rgba(5,150,105,0.12)",
  },
  Agent: {
    bg: "#f2eeff",
    text: "#7c3aed",
    border: "rgba(124,58,237,0.25)",
    shadow: "rgba(124,58,237,0.12)",
  },
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "智能合同审查助手",
    description: "基于LLM的合同风险识别与合规检测平台",
    type: "Agent",
    author: "LuPan",
    date: "2026-05-20",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=300&fit=crop&auto=format",
    tags: ["NLP", "LLM", "Legal"],
  },
  {
    id: "p2",
    name: "供应链数据看板",
    description: "实时供应链KPI监控与异常预警可视化平台",
    type: "Webapp",
    author: "asofa",
    date: "2026-05-18",
    thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=480&h=300&fit=crop&auto=format",
    tags: ["React", "ECharts", "MySQL"],
  },
  {
    id: "p3",
    name: "HR入职自动化流程",
    description: "新员工入职材料收集、审批、系统创建全流程RPA",
    type: "RPA",
    author: "LuPan",
    date: "2026-05-15",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=480&h=300&fit=crop&auto=format",
    tags: ["UiPath", "SAP", "Email"],
  },
  {
    id: "p4",
    name: "客户服务智能路由",
    description: "多渠道客诉自动分类、优先级排序与智能派单系统",
    type: "Agent",
    author: "aejha",
    date: "2026-05-12",
    thumbnail: "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?w=480&h=300&fit=crop&auto=format",
    tags: ["Claude", "NLP", "CRM"],
  },
  {
    id: "p5",
    name: "财务报表生成器",
    description: "从ERP自动提取数据并生成标准化月度财务报告",
    type: "RPA",
    author: "akljlkd",
    date: "2026-05-10",
    thumbnail: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?w=480&h=300&fit=crop&auto=format",
    tags: ["Python", "Excel", "SAP"],
  },
  {
    id: "p6",
    name: "项目管理协作平台",
    description: "AI辅助任务分解、进度追踪与团队协作工作台",
    type: "Webapp",
    author: "LuPan",
    date: "2026-05-08",
    thumbnail: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=480&h=300&fit=crop&auto=format",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "p7",
    name: "采购询价智能助手",
    description: "自动比价、供应商评分与采购建议生成Agent",
    type: "Agent",
    author: "aerothbkdza",
    date: "2026-04-28",
    thumbnail: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=480&h=300&fit=crop&auto=format",
    tags: ["LLM", "RAG", "Procurement"],
  },
  {
    id: "p8",
    name: "ERP数据同步机器人",
    description: "跨系统主数据自动同步与差异核查RPA流程",
    type: "RPA",
    author: "asofa",
    date: "2026-04-22",
    thumbnail: "https://images.unsplash.com/photo-1757466762489-52fea38071ad?w=480&h=300&fit=crop&auto=format",
    tags: ["RPA", "ERP", "API"],
  },
  {
    id: "p9",
    name: "内部知识库问答系统",
    description: "企业文档RAG检索与多轮对话知识问答平台",
    type: "Webapp",
    author: "LuPan",
    date: "2026-04-18",
    thumbnail: "https://images.unsplash.com/photo-1771791814213-aa95b14ed9c7?w=480&h=300&fit=crop&auto=format",
    tags: ["RAG", "Vector DB", "React"],
  },
];

const TYPE_FILTERS: (ProjectType | "All")[] = ["All", "Webapp", "RPA", "Agent"];

function TypeBadge({ type }: { type: ProjectType }) {
  const c = TYPE_COLORS[type];
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.63rem",
        letterSpacing: "0.08em",
        padding: "2px 8px",
        borderRadius: 4,
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {type}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const c = TYPE_COLORS[project.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `1px solid ${hovered ? c.border : "rgba(0,80,180,0.09)"}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.22s ease",
        boxShadow: hovered
          ? `0 8px 30px ${c.shadow}, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 6px rgba(0,40,120,0.06)",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <img
          src={project.thumbnail}
          alt={project.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: hovered ? "brightness(1.03) saturate(1.05)" : "brightness(0.95) saturate(0.9)",
            transition: "filter 0.22s ease",
          }}
        />
        {/* Light overlay to blend with white card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 50%)",
          }}
        />
        <div className="absolute top-2.5 right-2.5">
          <TypeBadge type={project.type} />
        </div>
        {hovered && (
          <div className="absolute top-2.5 left-2.5">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,80,180,0.15)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <ExternalLink size={11} color="#0070e0" />
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="px-4 pt-3 pb-3">
        <div
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#0f1c2e",
            marginBottom: 3,
            lineHeight: 1.35,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.74rem",
            color: "#6b84a0",
            marginBottom: 10,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#6b84a0",
                background: "#f0f4f9",
                border: "1px solid rgba(0,80,180,0.09)",
                padding: "1px 6px",
                borderRadius: 3,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: "1px solid rgba(0,80,180,0.07)" }}
        >
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#e8f1fd", border: "1px solid rgba(0,112,224,0.2)" }}
            >
              <User size={10} color="#0070e0" />
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "#0f1c2e",
                fontWeight: 500,
              }}
            >
              {project.author}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={10} color="#6b84a0" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.64rem",
                color: "#6b84a0",
              }}
            >
              {project.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGrid() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProjectType | "All">("All");
  const [authorFilter, setAuthorFilter] = useState("All");

  const authors = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.author)))];

  const filtered = PROJECTS.filter((p) => {
    const matchType = typeFilter === "All" || p.type === typeFilter;
    const matchAuthor = authorFilter === "All" || p.author === authorFilter;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchAuthor && matchSearch;
  });

  return (
    <div
      style={{
        background: "#f5f7fa",
        minHeight: "100vh",
        padding: "2rem 2.5rem 4rem",
      }}
    >
      {/* Filter bar */}
      <div
        className="flex flex-wrap items-center gap-3 mb-7 px-5 py-3 rounded-xl"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0,80,180,0.09)",
          boxShadow: "0 1px 8px rgba(0,40,120,0.05)",
        }}
      >
        {/* Type filter */}
        <div className="flex items-center gap-1.5">
          <Layers size={13} color="#6b84a0" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "#6b84a0",
              marginRight: 2,
            }}
          >
            Type
          </span>
          {TYPE_FILTERS.map((t) => {
            const active = typeFilter === t;
            const c = t !== "All" ? TYPE_COLORS[t as ProjectType] : null;
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t as ProjectType | "All")}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.66rem",
                  padding: "3px 10px",
                  borderRadius: 5,
                  border: active
                    ? `1px solid ${c ? c.border : "rgba(0,112,224,0.3)"}`
                    : "1px solid rgba(0,80,180,0.1)",
                  background: active ? (c ? c.bg : "#e8f1fd") : "transparent",
                  color: active ? (c ? c.text : "#0070e0") : "#6b84a0",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div style={{ width: 1, height: 18, background: "rgba(0,80,180,0.1)" }} className="hidden sm:block" />

        {/* Author filter */}
        <div className="flex items-center gap-1.5">
          <User size={13} color="#6b84a0" />
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              background: "#f5f7fa",
              border: "1px solid rgba(0,80,180,0.12)",
              borderRadius: 5,
              color: "#0f1c2e",
              padding: "3px 8px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {authors.map((a) => (
              <option key={a} value={a}>
                {a === "All" ? "All Creators" : a}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 ml-auto px-3 py-1.5 rounded-lg"
          style={{
            background: "#f5f7fa",
            border: "1px solid rgba(0,80,180,0.1)",
            minWidth: 220,
          }}
        >
          <Search size={13} color="#6b84a0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "#0f1c2e",
              width: "100%",
            }}
          />
        </div>

        {/* Count */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            color: "#6b84a0",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} / {PROJECTS.length}
        </span>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20"
          style={{ color: "#6b84a0", fontFamily: "'Inter', sans-serif" }}
        >
          <Search size={32} color="#c5d5e8" style={{ marginBottom: 12 }} />
          <p style={{ fontSize: "0.875rem" }}>No projects match the current filters</p>
        </div>
      )}
    </div>
  );
}
