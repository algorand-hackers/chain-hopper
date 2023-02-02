// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  dark: "#404040",
  bg2: "#E3E7EE",
  white: "#ffffff",
  btnBg: "linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)",
  bg1: "linear-gradient(123.16deg, #F3F3FF 22.55%, #F3F3FF 62.15%, #E4F1FF 95.23%)",
  bg3: "rgba(0, 0, 0, 0.96)",
  footerBg: "linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)",
  footerOpacity: "0.2",
  footerBlur: "blur(100px)",
  bg4: "rgba(255, 255, 255, 0.09)",
  bg5: "rgba(255, 255, 255, 0.07)",
  bg6: "linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)",
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: "false",
}

const theme = extendTheme({ colors, config })

export default theme