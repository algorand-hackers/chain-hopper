// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  dark: "#404040",
  blue: "#3A6EFF",
  bg2: "#E3E7EE",
  white: "#ffffff",
  btnBg: "linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)",
};




const theme = extendTheme({ colors })

export default theme