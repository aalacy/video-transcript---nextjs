"use client";

import {
  useMediaQuery,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  Box,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { DRAWER_WIDTH } from "@/constants";

const LinkButton = styled(Button)(() => ({
  color: "ButtonText",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "primary.light",
  },
}));

const menuList = [
  {
    href: "https://blog.caphacker.com/about/",
    style: { color: "ButtonText", textDecoration: "none" },
    target: "_blank",
    title: "About",
  },
  {
    href: "https://blog.caphacker.com/contact/",
    style: { color: "ButtonText", textDecoration: "none" },
    target: "_blank",
    title: "Contact",
  },
  {
    href: "/auth/signup",
    style: { color: "white", textDecoration: "none" },
    title: "Sign Up",
    variant: "contained",
    color: "warning",
  },
];

export default function TopbarHome() {
  const isNonMobile = useMediaQuery("(min-width:640px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            ml: isNonMobile ? "inherit" : 1,
            width: 1,
            py: 1,
            backgroundColor: "background.paper",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <Image
              className="w-[100px] md:w-[150px]"
              src="/assets/logo.png"
              alt="logo"
              width={150}
              height={150}
            />
          </Link>
          {isNonMobile ? (
            <Box>
              {menuList.map(
                ({ href, title, style, target, variant, color }) => (
                  <LinkButton
                    key={title}
                    size="small"
                    variant={variant || "text"}
                    color={color || "primary"}
                  >
                    <Link href={href} style={style} target={target}>
                      <Typography fontWeight="bold">{title}</Typography>
                    </Link>
                  </LinkButton>
                ),
              )}
            </Box>
          ) : (
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: isNonMobile ? "none" : "inherit" }}
            >
              <MenuIcon color="ButtonText" />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="Top menu"
      >
        <SwipeableDrawer
          anchor="right"
          variant={isNonMobile ? "permanent" : "temporary"}
          open={mobileOpen}
          onOpen={() => console.log("onOpen")}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          transitionDuration={500}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer * 100,
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          <List
            sx={{
              overflow: "auto",
              pl: 2,
            }}
          >
            <ListItemButton
              disableGutters
              component="a"
              href="/"
              sx={{ justifyContent: "space-between" }}
            >
              <Link href="/">
                <Image
                  className="w-[100px] md:w-[150px]"
                  src="/assets/logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                />
              </Link>
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
            </ListItemButton>
            {menuList.map(({ href, title, target, variant, style, color }) => (
              <ListItem key={href} disableGutters>
                <LinkButton
                  key={title}
                  size="small"
                  variant={variant || "text"}
                  color={color || "primary"}
                >
                  <Link href={href} style={style} target={target}>
                    <Typography fontWeight="bold">{title}</Typography>
                  </Link>
                </LinkButton>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </Box>
    </>
  );
}
