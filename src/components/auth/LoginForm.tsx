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

import { toast } from "react-toastify";
import { useStore } from "@/store/useStore";

const decodeJwt = (token: string) => {
  try {
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

      const decoded = decodeJwt(accessToken);

      if (!decoded) {
        throw new Error("Token de sesión no válido.");
      }

      const user = {
        name: decoded.name || values.email.split("@")[0],
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      };

      login(user, accessToken);
      toast.success("Inicio de sesión exitoso 👏");
      router.push("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

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
      <h1 className="mb-8 font-semibold text-chocolate text-2xl text-center">
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
          prefix={<MailOutlined className="text-chocolate" />}
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
          prefix={<LockOutlined className="text-chocolate" />}
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone twoToneColor="#654321" />
            ) : (
              <EyeInvisibleOutlined className="text-chocolate" />
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
          className="bg-chocolate w-full"
        >
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
