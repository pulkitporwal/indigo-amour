"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AccordionProps {
  title: string;
  content: string;
  icon?: any;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-100 rounded-md overflow-hidden mt-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-neutral-50 py-3 px-4 hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-lg font-medium">
          {icon}
          {title}
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 text-neutral-600">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
