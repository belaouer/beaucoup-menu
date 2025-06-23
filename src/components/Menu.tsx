"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import MenuItem from "./MenuItem";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onCloseComplete: () => void;
  onItemHover: (index: number) => void;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

const menuItems = [
  { id: 1, title: "projects" },
  { id: 2, title: "studio" },
  { id: 3, title: "services" },
  { id: 4, title: "contact" },
];

const Menu = ({
  isOpen,
  setIsOpen,
  onCloseComplete,
  onItemHover,
  itemRefs,
}: MenuProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useGSAP(() => {
    tl.current = gsap.timeline();
    if (isOpen) {
      tl.current.to(container.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => setIsComplete(true),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      gsap.to(container.current, {
        scale: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          onCloseComplete(); // dire au parent de démonter le composant
        },
      });
    }
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={container}
      className="menu w-full h-full scale-0  origin-top-right bg-black flex justify-center items-center"
    >
      <div className="flex flex-col items-start">
        {menuItems.map((menuItem, i) => {
          return (
            <div
              key={menuItem.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => onItemHover(i)}
              className="text-wrapper"
            >
              <MenuItem {...menuItem} isComplete={isComplete} tl={tl.current} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
