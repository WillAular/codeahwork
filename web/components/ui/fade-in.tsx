"use client";

import * as React from "react";
import { motion, useScroll, useSpring, HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  scale?: boolean;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.55,
  scale = false,
  className = "",
  ...props
}: FadeInProps) {
  const getInitialPosition = () => {
    const baseScale = scale ? 0.94 : 1;
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30, scale: baseScale };
      case "down":
        return { opacity: 0, y: -30, scale: baseScale };
      case "left":
        return { opacity: 0, x: 30, scale: baseScale };
      case "right":
        return { opacity: 0, x: -30, scale: baseScale };
      case "none":
        return { opacity: 0, scale: baseScale };
      default:
        return { opacity: 0, y: 30, scale: baseScale };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // refined cubic-bezier for smooth deceleration
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  staggerDelay = 0.12,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Top scroll progress bar for reading progress */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--azul-codeah)] via-[var(--dorado-codeah)] to-[var(--azul-profundo)] transform-origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}
