import React, { Dispatch, SetStateAction } from "react";

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuButton = ({ setIsOpen, isOpen }: MenuButtonProps) => {
  return (
    <div
      style={
        isOpen
          ? { background: "black", border: "1px solid #fffaf5", color: "white" }
          : {}
      }
      className="group menu-button absolute top-8 right-8 cursor-pointer space-x-1.5"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="uppercase group-hover:text-white">Menu</div>
      <div className="w-[2.08vw] h-[2.08vw] rounded-full border flex justify-center items-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="group-hover:stroke-white"
        >
          <path
            d="M5.03569 0C4.74227 2.75362 2.61697 4.90196 0 4.99574V5.00426C2.61697 5.09804 4.74227 7.24638 5.03569 10C5.32117 7.27195 7.42268 5.14066 10 5.01279V5.00426C7.42268 4.85933 5.3291 2.72805 5.03569 0Z"
            fill="#FFFAF5"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default MenuButton;
