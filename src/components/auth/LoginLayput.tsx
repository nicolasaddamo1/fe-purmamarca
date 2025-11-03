"use client";

import React from "react";
import Image from "next/image";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Imagen lateral */}
      <div className="hidden md:flex justify-center items-center bg-fondo-claro md:w-1/2 overflow-hidden">
        <Image
          src="/purlogo.png"
          alt="Logo Purmamarca"
          width={380}
          height={380}
          priority
        />
      </div>

      {/* Formulario */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full md:w-1/2">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
