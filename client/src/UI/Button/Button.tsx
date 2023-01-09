import React from "react";

interface IButton {
  onClick: () => void;
  text: string;
  style?: object;
}

const Button = ({ onClick, text, style }: IButton) => {
  return (
    <button
      style={style}
      onClick={onClick}
      className="p-2 ml-3 min-w-[80px] bg-[white] text-[black] rounded-2xl"
    >
      {text}
    </button>
  );
};

export default Button;
