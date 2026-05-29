import { Cpu } from "lucide-react";

export function NavBar() {
  return (
    <nav
      className="flex items-center justify-between px-8 py-3"
      style={{
        background: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid rgba(0,112,224,0.1)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 16px rgba(0,80,180,0.06)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #e8f1fd, #f2eeff)",
            border: "1px solid rgba(0,112,224,0.2)",
          }}
        >
          <Cpu size={14} color="#0070e0" />
        </div>
        <span
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#0f1c2e",
            letterSpacing: "0.03em",
          }}
        >
          SA Achievement Platform
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#6b84a0",
            letterSpacing: "0.08em",
          }}
        >
          AI Solutions Architecture
        </span>
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{
            background: "#e6f7f2",
            border: "1px solid rgba(5,150,105,0.2)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#059669" }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              color: "#059669",
              letterSpacing: "0.06em",
            }}
          >
            LIVE
          </span>
        </div>
      </div>
    </nav>
  );
}
