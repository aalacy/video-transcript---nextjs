"use client";

import {
  useMediaQuery,
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
import { useMemo, useState } from "react";

import Logo from "./logo";

const LinkButton = styled(Button)(() => ({
  color: "ButtonText",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "primary.light",
  },
}));

const menuList = [
  {
    href: "https://blog.submagic.pro/about/",
    style: { color: "ButtonText", textDecoration: "none" },
    target: "_blank",
    title: "About",
  },
  {
    href: "https://blog.submagic.pro/contact/",
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
    <AppBar
      variant="outlined"
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          py: 1,
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
              <LinkButton key={title} size="small" variant={variant}>
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
        <Drawer
          sx={{
            display: isNonMobile ? "none" : "inherit",
            width: 1,
            height: "200px",
            zIndex: (theme) => theme.zIndex.drawer,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 1,
              boxSizing: "border-box",
              height: "200px",
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
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
