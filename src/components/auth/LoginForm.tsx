"use client";

import { loginRequest } from "@/app/axios/authApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import Image from "next/image";
import { toast } from "react-toastify";
import { useStore } from "@/store/useStore";

// Función utilitaria para decodificar el payload del JWT
const decodeJwt = (token: string) => {
  try {
    // btoa/atob solo funciona en el cliente. Ya que es un componente "use client", esto es seguro.
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const data = await loginRequest(values.email, values.password);
      const { accessToken } = data;

      // 1. Decodificar el token para obtener los datos
      const decoded = decodeJwt(accessToken);

      if (!decoded) {
        // Si el token no se puede decodificar, es un error
        throw new Error("Token de sesión no válido.");
      }

      // 2. Construir el objeto user
      // Usamos los datos del JWT, incluyendo el 'isAdmin' que viene del back (aunque lo ignoraremos luego)
      const user = {
        name: decoded.name || values.email.split("@")[0],
        email: decoded.email,
        isAdmin: decoded.isAdmin, // Podría ser false, pero ya no importa
      };

      // 3. ❌ ELIMINAMOS LA VALIDACIÓN ESTRICTA DE ROLES ❌
      // Si el login fue exitoso y tenemos el token, es suficiente para el dashboard.

      // 4. Login exitoso
      login(user, accessToken);
      toast.success("Inicio de sesión exitoso 👏");
      router.push("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      // Mantenemos el mensaje genérico para errores de credenciales o de token
      toast.error("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      className="w-full"
      autoComplete="off"
    >
      <div className="flex justify-center mb-10">
        <Image
          src="/purlogo.png"
          alt="Logo Purmamarca"
          width={150}
          height={150}
          priority
        />
      </div>

      <h1 className="mb-8 font-semibold text-[#654321] text-2xl text-center">
        Bienvenido a Purmamarca
      </h1>

      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          { required: true, message: "Ingrese su correo electrónico" },
          { type: "email", message: "Correo no válido" },
        ]}
      >
        <Input
          prefix={<MailOutlined className="text-[#654321]" />}
          placeholder="correo@electronico.com"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Ingrese su contraseña" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-[#654321]" />}
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone twoToneColor="#654321" />
            ) : (
              <EyeInvisibleOutlined className="text-[#654321]" />
            )
          }
          placeholder="********"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
          className="bg-[#654321] w-full"
        >
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
