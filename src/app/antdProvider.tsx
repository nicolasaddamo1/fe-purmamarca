"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StyleProvider } from "@ant-design/cssinjs";
import { App } from "antd";
import type { PropsWithChildren } from "react";
import "@ant-design/v5-patch-for-react-19";

const AntdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <StyleProvider layer>
        <App>{children}</App>
      </StyleProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
