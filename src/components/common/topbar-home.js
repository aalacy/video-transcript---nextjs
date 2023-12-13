"use client";

import {
  useMediaQuery,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import Link from "next/link";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import Logo from "./logo";
import TopBanner from "./top-banner";

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
  },
];

export default function TopbarHome() {
  const isNonMobile = useMediaQuery("(min-width:640px)");
  const [state, setState] = useState(false);

  return (
    <>
      <AppBar
        variant="outlined"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          bgColor: "background.paper",
        }}
      >
        <TopBanner />
        <Toolbar
          variant="dense"
          sx={{
            ml: isNonMobile ? "inherit" : 1,
            width: 1,
            backgroundColor: "background.paper",
            justifyContent: "space-between",
          }}
        >
          <Logo
            size={isNonMobile ? "medium" : "small"}
            width={isNonMobile ? "auto" : "100px"}
          />
          {isNonMobile ? (
            <Box>
              {menuList.map(({ href, title, style, target, variant }) => (
                <LinkButton
                  key={title}
                  size="small"
                  variant={variant || "text"}
                >
                  <Link href={href} style={style} target={target}>
                    {title}
                  </Link>
                </LinkButton>
              ))}
            </Box>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setState(!state)}
              sx={{ mr: 1, display: isNonMobile ? "none" : "inherit" }}
            >
              <MenuIcon color="primary" />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer
        disableScrollLock={true}
        sx={{
          display: isNonMobile ? "none" : "inherit",
          maxHeight: "200px",
          zIndex: (theme) => theme.zIndex.drawer,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            maxHeight: "200px",
            marginTop: "56px",
            p: 1,
            px: 3,
          },
        }}
        variant={isNonMobile ? "permanent" : "temporary"}
        anchor="top"
        open={state}
        onClose={() => setState(false)}
      >
        <List
          sx={{
            overflow: "auto",
          }}
        >
          {menuList.map(({ href, title, target }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton component={Link} href={href} target={target}>
                <ListItemText primary={title} sx={{ textAlign: "right" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
