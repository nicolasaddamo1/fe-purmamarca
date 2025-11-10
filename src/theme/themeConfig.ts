import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    borderRadius: 8,
    colorPrimary: "#213721",
    fontFamily: "var(--font-abeezee), sans-serif",
  },
  cssVar: true,
  components: {
    Card: {
      bodyPadding: 16,
      bodyPaddingSM: 12,
      headerBg: "transparent",
      headerFontSize: 16,
      headerHeight: 56,
      headerPadding: 16,
      extraColor: "rgba(0,0,0,0.65)",
      actionsBg: "#ffffff",
      actionsLiMargin: "12px",
    },
    Button: {
      borderRadius: 6,
      colorPrimary: "#612608d9",
      colorPrimaryHover: "#612608d3",
      colorPrimaryActive: "#162816",
      colorTextLightSolid: "#ffffff",
      controlHeight: 40,
      fontWeight: 200,
      boxShadow: "none",
      controlOutline: "none",

      paddingInline: 40,
    },
  },
};

export default themeConfig;
