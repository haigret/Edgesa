import { useEffect, useRef } from "react";
import { motion } from "motion/react";

function BlueprintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number; pulse: number; ps: number;
    }

    let nodes: Node[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      nodes = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.8 + 0.8,
          pulse: Math.random() * Math.PI * 2,
          ps: 0.018 + Math.random() * 0.018,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dot grid
      const spacing = 32;
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,112,224,0.12)";
          ctx.fill();
        }
      }

      const maxDist = 140;

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const a = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(0,112,224,${a})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.pulse += n.ps;
        const glow = n.r + Math.sin(n.pulse) * 1.2;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow * 5);
        g.addColorStop(0, "rgba(0,112,224,0.25)");
        g.addColorStop(1, "rgba(0,112,224,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glow * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(0,112,224,${0.55 + Math.sin(n.pulse) * 0.25})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glow, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const stats = [
  { value: "23", label: "Projects Delivered" },
  { value: "3", label: "Solution Types" },
  { value: "8", label: "Team Members" },
  { value: "Q2 2026", label: "Reporting Period" },
];

const TYPE_PILLS = [
  { label: "Webapp", color: "#0070e0", bg: "#e8f1fd" },
  { label: "RPA", color: "#059669", bg: "#e6f7f2" },
  { label: "Agent", color: "#7c3aed", bg: "#f2eeff" },
];

export function HeroSection() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f6ff 0%, #eef3fb 40%, #f5f0ff 80%, #f0f6ff 100%)",
        minHeight: 320,
        borderBottom: "1px solid rgba(0,112,224,0.1)",
      }}
    >
      <BlueprintCanvas />

      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 px-10 py-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
          style={{
            background: "rgba(0,112,224,0.07)",
            border: "1px solid rgba(0,112,224,0.2)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            color: "#0070e0",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#0070e0", boxShadow: "0 0 5px rgba(0,112,224,0.5)" }}
          />
          AI Solutions Architecture — Group Portfolio
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "#0f1c2e",
            marginBottom: "0.5rem",
          }}
        >
          SA{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #0070e0, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Achievement
          </span>{" "}
          Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.92rem",
            color: "#6b84a0",
            maxWidth: 520,
            marginBottom: "2rem",
            lineHeight: 1.65,
          }}
        >
          AI Solutions Architect team deliverables — Web Apps, RPA automations, and intelligent Agents built for the Group.
        </motion.p>

        {/* Type pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="flex gap-2 mb-6"
        >
          {TYPE_PILLS.map((p) => (
            <span
              key={p.label}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.66rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: p.bg,
                color: p.color,
                border: `1px solid ${p.color}33`,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {p.label}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center px-5 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(0,112,224,0.12)",
                boxShadow: "0 2px 12px rgba(0,112,224,0.06)",
                minWidth: 100,
              }}
            >
              <span
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#0070e0",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  color: "#6b84a0",
                  marginTop: 4,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
