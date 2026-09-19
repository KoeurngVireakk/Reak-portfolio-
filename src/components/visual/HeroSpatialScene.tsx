import { useRef, type PointerEvent } from "react";
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

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, springSpatial);
  const smoothY = useSpring(pointerY, springSpatial);

  // Three restrained depth planes. With a ±6px source, no plane exceeds 7px.
  const gridX = useTransform(smoothX, (value) => value * 0.34);
  const gridY = useTransform(smoothY, (value) => value * 0.34);
  const haloX = useTransform(smoothX, (value) => value * -0.62);
  const haloY = useTransform(smoothY, (value) => value * -0.62);
  const portraitX = useTransform(smoothX, (value) => value * 0.46);
  const portraitY = useTransform(smoothY, (value) => value * 0.46);
  const portraitRotateX = useTransform(smoothY, (value) => value * -0.22);
  const portraitRotateY = useTransform(smoothX, (value) => value * 0.22);
  const ringX = useTransform(smoothX, (value) => value * 1.05);
  const ringY = useTransform(smoothY, (value) => value * 1.05);
  const ringRotate = useTransform(smoothX, (value) => value * 0.24);
  const labelsX = useTransform(smoothX, (value) => value * 0.7);
  const labelsY = useTransform(smoothY, (value) => value * 0.7);

  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 320, 720], [0, -12, -28]);
  const sceneScale = useTransform(scrollY, [0, 320, 720], [1, 0.97, 0.94]);
  const sceneOpacity = useTransform(scrollY, [0, 500, 720], [1, 0.9, 0.62]);
  const sceneGlow = useTransform(scrollY, [0, 520, 720], [1, 0.72, 0.25]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!sceneActive || !finePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width;
    const relY = (event.clientY - bounds.top) / bounds.height;
    const normX = (relX - 0.5) * 2;
    const normY = (relY - 0.5) * 2;

    pointerX.set(normX * 6);
    pointerY.set(normY * 6);

    if (sceneRef.current) {
      sceneRef.current.style.setProperty("--scene-pointer-x", normX.toFixed(3));
      sceneRef.current.style.setProperty("--scene-pointer-y", normY.toFixed(3));
      sceneRef.current.style.setProperty("--scene-px", `${(relX * 100).toFixed(1)}%`);
      sceneRef.current.style.setProperty("--scene-py", `${(relY * 100).toFixed(1)}%`);
    }

  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
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
        data-fine-pointer={finePointer && !reduceMotion}
        data-scene-active={sceneActive}
        initial={reduceMotion ? false : "hidden"}
        onPointerLeave={resetPointer}
        onPointerMove={handlePointerMove}
        ref={sceneRef}
        variants={heroSceneReveal}
      >
        <motion.div className="scene-layer scene-grid" style={{ x: gridX, y: gridY }} aria-hidden="true" />
        <motion.div className="scene-layer scene-mesh" style={{ opacity: reduceMotion ? 0.72 : sceneGlow, x: haloX, y: haloY }} aria-hidden="true" />
        <motion.div className="scene-layer scene-halo" style={{ opacity: reduceMotion ? 1 : sceneGlow, x: haloX, y: haloY }} aria-hidden="true" />
        <div className="scene-layer scene-illumination" aria-hidden="true" />
        <motion.svg className="scene-layer scene-topology" style={{ x: haloX, y: haloY }} viewBox="0 0 620 620" aria-hidden="true">
          <path d="M42 164 C146 68 250 154 342 102 S512 88 578 54" />
          <path d="M22 454 C126 376 222 492 326 410 S492 354 598 430" />
          <path d="M98 566 C184 494 268 548 356 504 S496 474 552 516" />
          <circle cx="42" cy="164" r="3" /><circle cx="342" cy="102" r="3" />
          <circle cx="326" cy="410" r="3" /><circle cx="552" cy="516" r="3" />
        </motion.svg>

        <div className="scene-status" aria-hidden="true"><i /> Architecture online</div>

        <motion.div
          className="portrait-plane"
          style={{
            rotateX: reduceMotion ? 0 : portraitRotateX,
            rotateY: reduceMotion ? 0 : portraitRotateY,
            x: reduceMotion ? 0 : portraitX,
            y: reduceMotion ? 0 : portraitY,
          }}
        >
            <div className="portrait-silhouette">
              <picture>
                <source srcSet={profile.avatarWebp} type="image/webp" />
                <img
                  className="portrait"
                  src={profile.avatar}
                  alt="Portrait of Koeurng Vireak"
                  decoding="async"
                  height="1600"
                  width="880"
                />
              </picture>
              <span className="portrait-scan" aria-hidden="true" />
            </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="portrait-instrument-ring"
          style={{ rotate: reduceMotion ? 0 : ringRotate, x: reduceMotion ? 0 : ringX, y: reduceMotion ? 0 : ringY }}
        >
          <span className="portrait-ring-marker marker-north" />
          <span className="portrait-ring-marker marker-east" />
          <span className="portrait-ring-marker marker-south" />
          <span className="portrait-ring-marker marker-west" />
          <span className="portrait-ring-reflection" />
        </motion.div>

        <motion.div className="hero-depth-labels" style={{ x: labelsX, y: labelsY }} aria-hidden="true">
          {depthLabels.map((item) => (
            <span className={item.className} key={item.label}>{item.label}</span>
          ))}
        </motion.div>

        <ArchitectureFlow className="hero-architecture-flow" />

        <div className="scene-contact">
          <span><MapPin aria-hidden="true" size={13} /> {profile.location}</span>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><Mail aria-hidden="true" size={13} /> Email</a>
        </div>
      </motion.div>
    </motion.div>
  );
}
