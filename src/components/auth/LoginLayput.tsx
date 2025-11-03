import React from "react";
import Image from "next/image";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const BackgroundCircles: React.FC = () => {
  const circles = [
    {
      size: "w-64 h-64",
      color: "bg-[#fbd6a2]",
      top: "top-10",
      left: "left-10",
      opacity: "opacity-70",
    },

    {
      size: "w-40 h-40",
      color: "bg-[#76644c]",
      bottom: "bottom-5",
      right: "right-5",
      opacity: "opacity-60",
    },

    {
      size: "w-24 h-24",
      color: "bg-[#612608]",
      top: "top-1/3",
      right: "right-1/4",
      opacity: "opacity-40",
    },

    {
      size: "w-16 h-16",
      color: "bg-[#6a994e]",
      bottom: "bottom-1/4",
      left: "left-1/4",
      opacity: "opacity-50",
    },
  ];

  return (
    <>
      {circles.map((circle, index) => (
        <div
          key={index}
          className={`absolute rounded-full filter blur-md ${circle.size} ${circle.color} ${circle.top} ${circle.bottom} ${circle.left} ${circle.right} ${circle.opacity}`}
          style={{ zIndex: 0 }}
        />
      ))}
    </>
  );
};

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="hidden relative md:flex justify-center items-center bg-gray-100 p-8 md:w-1/2 overflow-hidden">
        <BackgroundCircles />

        <div className="z-10 relative">
          <Image
            src="/purlogo.png"
            alt="Logo Purmamarca"
            width={380}
            height={380}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col justify-center bg-white px-8 md:px-16 lg:px-24 w-full md:w-1/2">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
