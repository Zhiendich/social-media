import React from "react";

interface IButton {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button = ({ onClick, text, className }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={`${className} p-2  w-full bg-[white] text-[black] rounded-2xl`}
    >
      {text}
    </button>
  );
};

export default Button;
