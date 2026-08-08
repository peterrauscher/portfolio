"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  enableMagnification: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const shouldReduceMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enableMagnification = !shouldReduceMotion && !isCoarsePointer;

  const contextValue = useMemo(
    () => ({
      mouseX,
      magnification,
      distance,
      enableMagnification,
    }),
    [mouseX, magnification, distance, enableMagnification],
  );

  return (
    <DockContext.Provider value={contextValue}>
      <motion.div
        onMouseMove={
          enableMagnification ? (e) => mouseX.set(e.pageX) : undefined
        }
        onMouseLeave={
          enableMagnification ? () => mouseX.set(Infinity) : undefined
        }
        className={cn(
          "mx-auto flex h-full w-max items-end justify-center overflow-visible rounded-full border",
          className,
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef({ x: 0, width: 0 });
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance, enableMagnification } = context;

  useEffect(() => {
    if (!enableMagnification) return;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const b = el.getBoundingClientRect();
      boundsRef.current = { x: b.x, width: b.width };
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enableMagnification]);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const { x, width } = boundsRef.current;
    return val - x - width / 2;
  });

  const containerSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [BASE_SIZE, magnification, BASE_SIZE],
    ),
    SPRING,
  );
  const iconSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE],
    ),
    SPRING,
  );

  if (!enableMagnification) {
    return (
      <div
        className={cn(
          "relative flex aspect-square shrink-0 items-center justify-center rounded-full",
          className,
        )}
        style={{ width: BASE_SIZE, height: BASE_SIZE }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: BASE_ICON_SIZE, height: BASE_ICON_SIZE }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center rounded-full",
        className,
      )}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
