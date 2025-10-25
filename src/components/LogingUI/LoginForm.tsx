"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLock, AiOutlineUnlock } from "react-icons/ai";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative bg-tertiary/30 shadow-md backdrop-blur-md p-12 border border-white/20 rounded-2xl w-full max-w-md">
      <h2 className="mb-6 font-bold text-white text-2xl text-center">
        Bienvenido/a
      </h2>
      <form className="relative flex flex-col gap-6">
        {/* Input usuario */}
        <div className="relative">
          <div className="top-1/2 -left-2 absolute flex justify-center items-center bg-chocolate p-4 rounded-full text-white -translate-y-1/2 transform">
            <FaUser />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="bg-white/20 py-2 pr-4 pl-12 border border-white/50 rounded-3xl focus:outline-none focus:ring-2 focus:ring-chocolate w-full text-white placeholder-white/70"
          />
        </div>

        {/* Input contraseña */}
        <div className="relative">
          <div
            className="top-1/2 -right-2 absolute flex justify-center items-center bg-chocolate p-4 rounded-full text-white -translate-y-1/2 cursor-pointer transform"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineUnlock /> : <AiFillLock />}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="*******"
            className="bg-white/20 py-2 pr-12 pl-4 border border-white/50 rounded-3xl focus:outline-none focus:ring-2 focus:ring-chocolate w-full text-white placeholder-white/70"
          />
        </div>

        <button
          type="submit"
          className="bg-chocolate hover:bg-maroon py-2 rounded-4xl text-white transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
