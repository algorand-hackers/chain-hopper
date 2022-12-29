// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: "#404040",
  white: "#ffffff",
  btnBg: "linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)",
};

// 3. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}
const style = {
  global: {
    
  }
}

// 4. extend the theme
const theme = extendTheme({ config, colors, style })

export default theme