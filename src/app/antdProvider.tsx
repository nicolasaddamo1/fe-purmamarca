"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import type { PropsWithChildren } from "react";
import themeConfig from "@/theme/themeConfig"; // 👈 importa tu tema personalizado
import "@ant-design/v5-patch-for-react-19";

const AntdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <StyleProvider layer>
        <ConfigProvider theme={themeConfig} locale={esES}>
          <App>{children}</App>
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
