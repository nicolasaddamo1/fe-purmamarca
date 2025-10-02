"use client";

import React from "react";

interface CardProps {
  title: string;
  value?: string | number;
  icon?: React.ReactElement<{ size?: number }>;
  iconSize?: number;
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

export default function Card({
  title,
  value,
  icon,
  iconSize = 24,
  bgColor = "bg-primary",
  textColor = "text-primary",
  width = "w-64",
  height = "h-40",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-between p-4 rounded-lg shadow-md border border-chocolate/30 hover:shadow-lg transition cursor-pointer ${width} ${height} bg-chocolate/10`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={`flex items-center justify-center  text-primary/90`}
            style={{ width: iconSize + 16, height: iconSize + 16 }}
          >
            {React.cloneElement(icon, { size: iconSize })}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className={`text-sm font-semibold ${textColor}`}>{title}</h3>
          {value && <span className="font-semibold text-xl">{value}</span>}
        </div>
      </div>
    </div>
  );
}
