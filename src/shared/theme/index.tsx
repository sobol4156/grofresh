import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#fff" },
        background: { default: "#fff", paper: "#fff" },
        text: { primary: "#000" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#000" },
        background: { default: "#000", paper: "#000" },
        text: { primary: "#fff" },
      },
    },
  },
});