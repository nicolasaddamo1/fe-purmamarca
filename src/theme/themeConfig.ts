import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    borderRadius: 16,
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
  },
};

export default themeConfig;
