import { ThemeOptions, createTheme } from "@mui/material/styles";
import { Open_Sans } from "next/font/google";
import { Ref, forwardRef } from "react";
import NextLink from "next/link";
import type { LinkProps } from "next/link";

const openSans = Open_Sans({ subsets: ["latin"] });

const LinkBehaviour = forwardRef(function LinkBehaviour(props: LinkProps, ref) {
  return <NextLink {...props} href={props.href} ref={ref as Ref<HTMLAnchorElement> | undefined} />;
});

const themeOptions: ThemeOptions = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
        underline: "none",
      } as any,
      styleOverrides: {
        root: {
          "&:hover": {
            textDecoration: "underline", // Subrayado al pasar el mouse sobre el enlace
          },
        },
      },
      variants: [
        {
          props: { variant: "navbar" },
          style: {
            color: "#fff",
            textDecoration: "none", // Subrayado al pasar el mouse sobre el enlace
            "&:hover": {
              textDecoration: "none",
            },
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  palette: {
    background: {
      default: "#000000",
      paper: "#272626",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
      disabled: "#9e9e9e",
      //hint: "#757575",
    },
    primary: {
      main: "#ff5252",
      light: "#ff8a80",
      dark: "#c50e29",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#33a1fd",
      light: "#66d5ff",
      dark: "#0072c2",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff1744",
      light: "#ff4569",
      dark: "#c7002e",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
      contrastText: "#000000",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#0069c0",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#80e27e",
      dark: "#087f23",
      contrastText: "#000000",
    },
    divider: "#404040",
  },
});

export default themeOptions;
