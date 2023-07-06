"use client";

import React, { useState, useMemo, MouseEvent, useContext } from "react";
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
import Link from "next/link";

import Avatar from "@mui/material/Avatar";
import { UserContext } from "@/contexts/UserContext";

const iconsSx = {
  width: "1.75rem",
  height: "1.75rem",
};

export default function Navbar(props: any) {
  const { user, logIn, logOut } = useContext(UserContext);
  const { brandFont } = props;

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
    logIn();
  };

  const handleLogout = () => {
    handleMenuClose();
    handleMobileMenuClose();
    logOut();
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
      <MenuItem onClick={handleMenuClose}>Tu perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Ajustes</MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
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
      {user?.name && user.image ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="Cuenta del usuario actual"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar alt={user.name} src={user.image} sx={{ ...iconsSx }} />
          </IconButton>
          <p>{user.name}</p>
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
      {user && (
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Abrir contenedor de opciones"
          >
            <MenuIcon />
          </IconButton>

          <Link href="/">
            <Typography
              className={brandFont}
              component="h1"
              sx={{ fontSize: { xs: "1.25em", sm: "1.5em", md: "1.75em" } }}
            >
              KORT.AR
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label={`Mostrar ${unreadNotifications.length} notificaciones sin leer`}
              color="inherit"
            >
              <Badge badgeContent={unreadNotifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="Cuenta del usuario actual"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user?.name && user.image ? (
                <Avatar src={user.image} alt={user.name} sx={iconsSx} />
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
}
