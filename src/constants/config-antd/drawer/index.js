import { fullConfig } from "@/theme";

export const drawerConfig = {
  styles: {
    mask: {
      backgroundColor: fullConfig.theme.colors.bgMask,
      backdropFilter: fullConfig.theme.backdropBlur.blurMain,
    },
    header: {
      padding: fullConfig.theme.padding.headerDraw,
      borderBottom: fullConfig.theme.borderWidth.border,
    },
    body: {
      padding: fullConfig.theme.padding.bodyDraw,
      borderTop: fullConfig.theme.borderWidth.borderTopDraw,
      borderBottom: fullConfig.theme.borderWidth.borderBottomDraw,
    },
    footer: {
      padding: fullConfig.theme.padding.footerDraw,
      borderTop: fullConfig.theme.borderWidth.border,
    },
    content: {
      padding: fullConfig.theme.padding.contentDraw,
    },
  },
};
