import React from "react";

const Button = ({text, onClick, style, disabled, className}) => {
  return (
    <button disabled={disabled} style={style} onClick={onClick} className={` bg-gray-500 px-4 py-2 rounded-md text-white ${className} `}>
      {text}
    </button>
  );
};

export default Button;

