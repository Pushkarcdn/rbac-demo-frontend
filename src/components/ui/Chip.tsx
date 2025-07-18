import React from "react";

const Chip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span
      className={`bg-green-100 text-green-700 font-medium text-xs py-1 px-4 rounded-full ${className}`}
    >
      {text}
    </span>
  );
};

export default Chip;
