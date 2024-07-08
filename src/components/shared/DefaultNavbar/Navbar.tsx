"use client";

import React, { useState, useMemo, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const title = process.env.BRAND;

import styles from "./Navbar.module.css";

const iconsSx = {
  width: "1.75rem",
  height: "1.75rem",
};

export const Navbar: ExtendedComponent<{ brandFont: string }> = ({ brandFont }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [, unreadNotifications] = useMemo(() => {
    const all: AccountNotification[] = [];
    const unread: AccountNotification[] = [];

    return [all, unread];
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogin = () => {
    handleMenuClose();
    handleMobileMenuClose();
    router.push("/auth/login");
  };

  const handleLogout = () => {
    handleMenuClose();
    handleMobileMenuClose();
    signOut();
  };

  const menuItems = () => {
    if (session?.user) {
      return [
        <Link
          underline="none"
          href="/me"
          key="Tu perfil"
          onClick={handleMenuClose}
          variant="navbar"
        >
          <MenuItem>Tu perfil</MenuItem>
        </Link>,
        <Link
          underline="none"
          href="/me/settings"
          key="Ajustes"
          onClick={handleMenuClose}
          variant="navbar"
        >
          <MenuItem>Ajustes</MenuItem>
        </Link>,
        <MenuItem key="Cerrar sesión" onClick={handleLogout}>
          Cerrar sesión
        </MenuItem>,
      ];
    }

    return <MenuItem onClick={handleLogin}>Iniciar sesión</MenuItem>;
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItems()}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {session?.user?.name && session?.user.image ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="Cuenta del usuario actual"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar alt={session.user.name} src={session.user.image} sx={{ ...iconsSx }} />
          </IconButton>
          <p>{session.user.name}</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>
          <IconButton
            size="large"
            aria-label="Cuenta del usuario actual"
            aria-controls="primary-search-account-menu"
            color="inherit"
          >
            <AccountCircle sx={iconsSx} />
          </IconButton>
          <p>Iniciar sesión</p>
        </MenuItem>
      )}
      {session?.user && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label={`Mostrar ${unreadNotifications.length} notificaciones sin leer`}
            color="inherit"
          >
            <Badge badgeContent={unreadNotifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notificaciones</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box className={styles.navbar}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Abrir contenedor de opciones"
          >
            <MenuIcon />
          </IconButton>

          <Link underline="none" href="/" variant="navbar">
            <Typography
              component="h1"
              className={styles.navbarBrand}
              sx={{ fontSize: { xs: "1.25em", sm: "1.5em", md: "1.75em" } }}
            >
              <span className={brandFont}>{title}</span>
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {session?.user && (
              <IconButton
                size="large"
                aria-label={`Mostrar ${unreadNotifications.length} notificaciones sin leer`}
                color="inherit"
              >
                <Badge badgeContent={unreadNotifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="Cuenta del usuario actual"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {session?.user?.name && session?.user.image ? (
                <Avatar src={session.user.image} alt={session.user.name} sx={iconsSx} />
              ) : (
                <AccountCircle sx={iconsSx} />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Mostrar mas opciones"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
