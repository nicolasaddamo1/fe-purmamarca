import React from "react";
import LoginLayout from "@/components/auth/LoginLayput";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};

export default LoginPage;
