import Typography from "@mui/material/Typography";

// Overriding variants for material UI components with module augmentation (TypeScript)
// ref: https://mui.com/material-ui/customization/theme-components/
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navbar: true;
    navbarLink: true;
  }
}
