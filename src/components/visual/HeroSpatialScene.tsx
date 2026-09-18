import type { PointerEvent } from "react";
import { Mail, MapPin } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { profile } from "../../data/portfolio";
import { heroSceneReveal, springSpatial } from "../../lib/motion";
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
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, springSpatial);
  const smoothY = useSpring(pointerY, springSpatial);
  const gridX = useTransform(smoothX, (value) => value * 0.35);
  const gridY = useTransform(smoothY, (value) => value * 0.35);
  const meshX = useTransform(smoothX, (value) => value * -0.18);
  const meshY = useTransform(smoothY, (value) => value * -0.18);
  const labelsX = useTransform(smoothX, (value) => value * 1.15);
  const labelsY = useTransform(smoothY, (value) => value * 1.15);
  const { scrollYProgress } = useScroll();
  const sceneY = useTransform(scrollYProgress, [0, 0.22], [0, -46]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.66]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !finePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 18);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className="hero-scene-exit"
      style={{ opacity: reduceMotion ? 1 : sceneOpacity, y: reduceMotion ? 0 : sceneY }}
    >
      <motion.div
        className="hero-spatial-scene"
        animate="visible"
        initial={reduceMotion ? false : "hidden"}
        onPointerLeave={resetPointer}
        onPointerMove={handlePointerMove}
        variants={heroSceneReveal}
      >
        <motion.div className="scene-layer scene-grid" style={{ x: gridX, y: gridY }} aria-hidden="true" />
        <motion.div className="scene-layer scene-mesh" style={{ x: meshX, y: meshY }} aria-hidden="true" />
        <div className="scene-layer scene-halo" aria-hidden="true" />

        <div className="scene-orbit-system" aria-hidden="true">
          <span className="scene-orbit scene-orbit-a"><i /><i /></span>
          <span className="scene-orbit scene-orbit-b"><i /><i /></span>
          <span className="scene-core" />
        </div>

        <svg className="scene-layer scene-topology" viewBox="0 0 620 760" aria-hidden="true">
          <path d="M48 154 C168 78 246 188 352 116 S528 102 580 44" />
          <path d="M16 548 C122 438 228 594 330 492 S502 432 604 514" />
          <path d="M92 692 C178 610 266 678 352 612 S502 582 558 628" />
          <circle cx="48" cy="154" r="3" /><circle cx="352" cy="116" r="3" />
          <circle cx="330" cy="492" r="3" /><circle cx="558" cy="628" r="3" />
        </svg>

        <div className="scene-coordinate scene-coordinate-top" aria-hidden="true">SYSTEM / PORTRAIT / 05</div>
        <div className="scene-coordinate scene-coordinate-side" aria-hidden="true">11.5564° N · 104.9282° E</div>

        <div className="portrait-plane">
          <Tilt className="portrait-tilt" maxTilt={2.4}>
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

        <ArchitectureFlow className="hero-architecture-flow" />

        <div className="scene-contact">
          <span><MapPin size={13} /> {profile.location}</span>
          <a href={"mailto:" + profile.email} aria-label={"Email " + profile.name}><Mail size={13} /> Email</a>
        </div>
      </motion.div>
    </motion.div>
  );
}
