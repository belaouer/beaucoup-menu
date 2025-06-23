import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { RefObject } from "react";

interface MenuPointerProps {
  pointerWrapperRef: RefObject<HTMLDivElement | null>;
  pointerRef: RefObject<SVGSVGElement | null>;
  isOpen: boolean;
}

const MenuPointer = ({
  pointerWrapperRef,
  pointerRef,
  isOpen,
}: MenuPointerProps) => {
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        pointerWrapperRef.current,
        {
          opacity: 0,
          y: "calc(50% - 0.5 * 160vh)",
          x: "-50%",
          rotation: -50,
        },
        {
          opacity: 1,
          y: "calc(50% - 0.5 * 160vh)",
          x: "calc(-0.66 * 160vh)",
          rotation: 0,
          duration: 1,
          ease: "expo.out",
        }
      );
    } else {
      gsap.to(pointerWrapperRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.02,
      });
    }
  }, [isOpen]);

  return (
    <div className="pointer hidden xl:block" ref={pointerWrapperRef}>
      <svg
        ref={pointerRef}
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 1450.3 1447.6"
        //   style={{enable-background:new 0 0 1450.3 1447.6}}
        //   xml:space="preserve"
      >
        <path
          // style="fill:none;stroke:#FFFAF5;stroke-width:3"
          d="M730.3,0.2c-42.5,398.5-350.1,709.5-728.8,723v1.2
	c378.8,13.6,686.3,324.5,728.8,723c41.3-394.8,345.5-703.3,718.5-721.8v-1.2C1075.8,703.5,772.8,395,730.3,0.2z"
        ></path>
      </svg>
    </div>
  );
};

export default MenuPointer;
