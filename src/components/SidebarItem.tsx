import React from "react";
import { IconType } from "react-icons";
import { useSection } from "@/hooks/useSection";

interface SidebarItemProps {
  name: string;
  icon: IconType;
  label?: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon: Icon,
  label,
  active,
}) => {
  const { setSection } = useSection();

  return (
    <button
      type="button"
      className={`flex text-black font-medium p-3 items-center gap-x-4 cursor-pointer hover:text-blue transition ${
        active && "text-blue"
      }`}
      onClick={() => {
        setSection(name);
      }}
    >
      <Icon size={26} />
      {label && <p className="truncate w-full">{label}</p>}
    </button>
  );
};

export default SidebarItem;
