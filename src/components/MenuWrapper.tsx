"use client";
import Menu from "@/components/Menu";
import MenuButton from "@/components/MenuButton";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import MenuPointer from "./MenuPointer";

const MenuWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pointerWrapperRef = useRef<HTMLDivElement>(null); // 👈 pour le div .pointer

  const pointerRef = useRef<SVGSVGElement>(null);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      gsap.to(".background", {
        background: "#000",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(".background", {
        background: "#fff",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  const handleHover = (index: number) => {
    const target = menuItemRefs.current[index];
    const pointer = pointerRef.current;
    if (!target || !pointer) return;

    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left;
    const targetY = targetRect.top + targetRect.height / 2;

    const pointerRect = pointer.getBoundingClientRect();
    const pointerX = pointerRect.left + pointerRect.width / 2;
    const pointerY = pointerRect.top + pointerRect.height / 2;

    const dx = targetX - pointerX;
    const dy = targetY - pointerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    gsap.to(pointer, {
      rotate: angle,
      duration: 0.5,
      ease: "power2.out",
      transformOrigin: "center center",
    });
  };

  return (
    <div className="menu-wrapper w-full h-screen p-8 relative flex justify-end items-start overflow-hidden">
      <MenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="background absolute top-0 left-0 right-0 bottom-0" />
      {isVisible && (
        <>
          <Menu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onCloseComplete={() => setIsVisible(false)} // démonter après animation
            onItemHover={handleHover}
            itemRefs={menuItemRefs}
          />
          <MenuPointer
            pointerRef={pointerRef}
            pointerWrapperRef={pointerWrapperRef}
            isOpen={isOpen}
          />
        </>
      )}
    </div>
  );
};

export default MenuWrapper;
