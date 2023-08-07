import React from "react";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={`rounded-lg bg-slate-100 h-fit w-full ` + className}>
      {children}
    </div>
  );
};

export default Box;
