"use client";

import * as React from "react";
import Link from "next/link";
import {
  useMediaQuery,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  ListItem,
  List,
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  Upload as UploadIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Support as SupportIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Subscriptions as SubscriptionsIcon,
} from "@mui/icons-material";
import { Toaster } from "react-hot-toast";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AuthProvider } from "@/context/jwt-context";
import { usePathname } from "next/navigation";
import { AuthService } from "@/service/auth-service";

// export const metadata = {
//   title: "Next.js App Router + Material UI v5",
//   description: "Next.js App Router + Material UI v5",
// };

const DRAWER_WIDTH = 240;

export default function RootLayout({ children }) {
  const [state, setState] = React.useState(true);
  const isNonMobile = useMediaQuery("(min-width:640px)");

  const pathname = usePathname();

  const hasLayout = React.useMemo(() => {
    return !pathname.includes("/auth");
  }, [pathname]);

  const LINKS = [
    { text: "Upload", href: "/", icon: UploadIcon },
    { text: "Your Videos", href: "/your-videos", icon: SubscriptionsIcon },
  ];

  const PLACEHOLDER_LINKS = [
    { text: "Settings", href: "/settings", icon: SettingsIcon },
    { text: "Help Center", href: "/help-center", icon: SupportIcon },
    { text: "Log out", action: AuthService.logout, icon: LogoutIcon },
  ];

  return (
    <html lang="en">
      <body style={{ backgroundColor: "background.default" }}>
        <ThemeRegistry>
          <AuthProvider>
            <Toaster position="top-center" />
            {hasLayout ? (
              <>
                <AppBar
                  position="fixed"
                  sx={{
                    zIndex: 100,
                    boxShadow: "none",
                    width: isNonMobile
                      ? `calc(100% - ${DRAWER_WIDTH}px)`
                      : "100%",
                  }}
                >
                  <Toolbar sx={{ backgroundColor: "background.paper" }}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={() => setState(!state)}
                      sx={{ mr: 1, display: { md: "none" } }}
                    >
                      <MenuIcon color="primary" />
                    </IconButton>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      color="black"
                    >
                      Home
                    </Typography>
                  </Toolbar>
                  <Divider />
                </AppBar>
                <Drawer
                  sx={{
                    width: DRAWER_WIDTH,
                    zIndex: 102,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: DRAWER_WIDTH,
                      boxSizing: "border-box",
                      height: "auto",
                      bottom: 0,
                    },
                  }}
                  variant={isNonMobile ? "permanent" : "temporary"}
                  anchor="left"
                  open={state}
                  onClose={() => setState(false)}
                >
                  <Divider />
                  <List>
                    {LINKS.map(({ text, href, icon: Icon }) => (
                      <ListItem key={href} disablePadding>
                        <ListItemButton
                          selected={href === pathname}
                          component={Link}
                          href={href}
                        >
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ mt: "auto" }} />
                  <List>
                    {PLACEHOLDER_LINKS.map(
                      ({ text, href, action, icon: Icon }) => (
                        <ListItem key={text} disablePadding>
                          {action ? (
                            <ListItemButton
                              selected={href === pathname}
                              onClick={action}
                            >
                              <ListItemIcon>
                                <Icon />
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          ) : (
                            <ListItemButton
                              selected={href === pathname}
                              component={Link}
                              href={href}
                            >
                              <ListItemIcon>
                                <Icon />
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          )}
                        </ListItem>
                      ),
                    )}
                  </List>
                </Drawer>
              </>
            ) : null}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                mt: ["48px", "56px", "64px"],
                ml: isNonMobile && hasLayout ? `${DRAWER_WIDTH}px` : 0,
                p: 3,
              }}
            >
              {children}
            </Box>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
