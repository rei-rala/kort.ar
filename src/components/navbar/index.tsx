"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function PrimarySearchAppBar(props: any) {
  const [account, _] = React.useState({
    name: "Kort.ar",
    email: "info@kort.ar",
    avatarUrl: 'https://avatars.githubusercontent.com/u/8908519?v=4',
    communications: {
      notifications: [
        {
          id: 1,
          title: "Bienvenido a Kort.ar",
          description: "Gracias por registrarte en Kort.ar, esperamos que disfrutes de la experiencia!",
          date: new Date(),
          read: false
        },
        {
          id: 2,
          title: "Valida tu email en Kort.ar",
          description: "Revisa tu bandeja de entrada y valida tu email para poder disfrutar de todas las funcionalidades de Kort.ar",
          date: new Date(),
          read: false
        },
      ]
    }
  })

  const { notifications, unreadNotifications } = React.useMemo(() => {
    let notifications = account.communications.notifications;
    return {
      notifications,
      unreadNotifications: notifications.filter(n => !n.read)
    }
  }, [account.communications.notifications])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Tu perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Ajustes</MenuItem>
      <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="Cuenta del usuario actual"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{account.name}</p>
      </MenuItem>
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
        <p>Notificationes</p>
      </MenuItem>

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
              className={props.brandFont}
              component='h1'
              sx={{ fontSize: { xs: '1.25em', sm: '1.5em', md: '2em' } }}
            >
              KORT.AR
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

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
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
    </Box >
  );
}