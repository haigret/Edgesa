import "../styles/fonts.css";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { ProjectGrid } from "./components/ProjectGrid";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#040d1a",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <NavBar />
      <HeroSection />
      <ProjectGrid />
    </div>
  );
}
