import { useRef, useState, type PointerEvent } from "react";
import { Mail, MapPin } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { profile } from "../../data/portfolio";
import { heroSceneReveal, springSpatial } from "../../lib/motion";
import { useContinuousMotion } from "../../lib/motionLifecycle";
import { useFinePointer } from "../../lib/pointer";
import { Tilt } from "../motion/Tilt";
import { ArchitectureFlow } from "./ArchitectureFlow";

const depthLabels = [
  { label: "React", className: "depth-label-react" },
  { label: "Spring Boot", className: "depth-label-spring" },
  { label: "Backend", className: "depth-label-backend" },
  { label: "Security", className: "depth-label-security" },
];

export function HeroSpatialScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { active: sceneActive, reducedMotion: reduceMotion } = useContinuousMotion(sceneRef, 0.08);
  const finePointer = useFinePointer();
  const [highlightedNode, setHighlightedNode] = useState<number | undefined>(undefined);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, springSpatial);
  const smoothY = useSpring(pointerY, springSpatial);

  // Calibrated multi-plane depth reactions:
  // Far grid: 0.22, Mid mesh: -0.16 (counter), Topology: 0.38, Labels: 1.15 (foreground)
  const gridX = useTransform(smoothX, (value) => value * 0.22);
  const gridY = useTransform(smoothY, (value) => value * 0.22);
  const meshX = useTransform(smoothX, (value) => value * -0.16);
  const meshY = useTransform(smoothY, (value) => value * -0.16);
  const labelsX = useTransform(smoothX, (value) => value * 1.15);
  const labelsY = useTransform(smoothY, (value) => value * 1.15);

  // Refined scroll exit handoff into System section
  const { scrollYProgress } = useScroll();
  const sceneY = useTransform(scrollYProgress, [0, 0.24], [0, -56]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.24], [1, 0.97]);
  const sceneOpacity = useTransform(scrollYProgress, [0.08, 0.24], [1, 0.58]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!sceneActive || !finePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width;
    const relY = (event.clientY - bounds.top) / bounds.height;
    const normX = (relX - 0.5) * 2;
    const normY = (relY - 0.5) * 2;

    pointerX.set(normX * 9);
    pointerY.set(normY * 9);

    if (sceneRef.current) {
      sceneRef.current.style.setProperty("--scene-pointer-x", normX.toFixed(3));
      sceneRef.current.style.setProperty("--scene-pointer-y", normY.toFixed(3));
      sceneRef.current.style.setProperty("--scene-px", `${(relX * 100).toFixed(1)}%`);
      sceneRef.current.style.setProperty("--scene-py", `${(relY * 100).toFixed(1)}%`);
    }

    // Architecture-node highlight influenced by pointer horizontal sector
    const nodeIndex = Math.min(3, Math.max(0, Math.floor(relX * 4)));
    setHighlightedNode(nodeIndex);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
    setHighlightedNode(undefined);
    if (sceneRef.current) {
      sceneRef.current.style.setProperty("--scene-pointer-x", "0");
      sceneRef.current.style.setProperty("--scene-pointer-y", "0");
      sceneRef.current.style.setProperty("--scene-px", "50%");
      sceneRef.current.style.setProperty("--scene-py", "40%");
    }
  }

  return (
    <motion.div
      className="hero-scene-exit"
      style={{
        opacity: reduceMotion ? 1 : sceneOpacity,
        y: reduceMotion ? 0 : sceneY,
        scale: reduceMotion ? 1 : sceneScale,
      }}
    >
      <motion.div
        className="hero-spatial-scene"
        animate="visible"
        data-scene-active={sceneActive}
        initial={reduceMotion ? false : "hidden"}
        onPointerLeave={resetPointer}
        onPointerMove={handlePointerMove}
        ref={sceneRef}
        variants={heroSceneReveal}
      >
        <motion.div className="scene-layer scene-grid" style={{ x: gridX, y: gridY }} aria-hidden="true" />
        <motion.div className="scene-layer scene-mesh" style={{ x: meshX, y: meshY }} aria-hidden="true" />
        <div className="scene-layer scene-halo" aria-hidden="true" />
        <div className="scene-layer scene-illumination" aria-hidden="true" />
        <svg className="scene-layer scene-topology" viewBox="0 0 620 760" aria-hidden="true">
          <path d="M48 154 C168 78 246 188 352 116 S528 102 580 44" />
          <path d="M16 548 C122 438 228 594 330 492 S502 432 604 514" />
          <path d="M92 692 C178 610 266 678 352 612 S502 582 558 628" />
          <circle cx="48" cy="154" r="3" /><circle cx="352" cy="116" r="3" />
          <circle cx="330" cy="492" r="3" /><circle cx="558" cy="628" r="3" />
        </svg>

        <div className="scene-status" aria-hidden="true"><i /> Architecture online</div>

        <div className="portrait-plane">
          <Tilt className="portrait-tilt" maxTilt={2.2}>
            <div className="portrait-silhouette">
              <picture>
                <source srcSet={profile.avatarWebp} type="image/webp" />
                <img
                  className="portrait"
                  src={profile.avatar}
                  alt="Portrait of Koeurng Vireak"
                  decoding="async"
                  fetchPriority="high"
                  height="1600"
                  width="880"
                />
              </picture>
              <span className="portrait-scan" aria-hidden="true" />
            </div>
          </Tilt>
        </div>

        <motion.div className="hero-depth-labels" style={{ x: labelsX, y: labelsY }} aria-hidden="true">
          {depthLabels.map((item) => (
            <span className={item.className} key={item.label}>{item.label}</span>
          ))}
        </motion.div>

        <ArchitectureFlow
          activeNodeIndex={highlightedNode}
          className="hero-architecture-flow"
        />

        <div className="scene-contact">
          <span><MapPin size={13} /> {profile.location}</span>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><Mail size={13} /> Email</a>
        </div>
      </motion.div>
    </motion.div>
  );
}
