"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

interface MenuItemProps {
  title: string;
  tl: gsap.core.Timeline | null;
  isComplete: boolean;
}

const MenuItem = ({ title, isComplete, tl }: MenuItemProps) => {
  const container = useRef(null);

  useGSAP(
    () => {
      if (isComplete) {
        gsap.to(container.current, {
          y: 0,
          skew: 0,
          duration: 0.2,
        });
      }
    },
    { dependencies: [tl] }
  );
  return (
    <h1
      ref={container}
      style={{ transform: "translateY(100%)" }}
      className="menu-item font-mono tracking-tight cursor-pointer"
    >
      {title}
    </h1>
  );
};

export default MenuItem;
