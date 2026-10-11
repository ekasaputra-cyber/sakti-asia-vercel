"use client";

import React, { useEffect, useRef, useState } from "react";

type Callback = () => void;
let sharedObserver: IntersectionObserver | null = null;
const callbacks = new Map<Element, Callback>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb();
              callbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );
  }
  return sharedObserver;
}

export function observeElement(element: Element, callback: Callback): () => void {
  const observer = getSharedObserver();
  if (!observer) {
    callback();
    return () => {};
  }
  callbacks.set(element, callback);
  observer.observe(element);
  return () => {
    callbacks.delete(element);
    observer.unobserve(element);
  };
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms, maksimal ~180ms
  as?: React.ElementType;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hormati preferensi pengguna untuk reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const unobserve = observeElement(node, () => {
      setIsVisible(true);
    });

    return () => {
      unobserve();
    };
  }, []);

  return (
    <Component
      ref={ref}
      style={
        delay > 0
          ? {
              transitionDelay: `${delay}ms`,
            }
          : undefined
      }
      className={`
        transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        }
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
