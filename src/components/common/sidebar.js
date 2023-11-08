"use client";
import Link from "next/link";
import {
  useMediaQuery,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  ListItem,
  List,
  Drawer,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Support as SupportIcon,
  Logout as LogoutIcon,
  Subscriptions as SubscriptionsIcon,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

import { DRAWER_WIDTH } from "@/constants";
import { AuthService } from "@/service/auth-service";
import Logo from "./logo";

const LINKS = [
  { text: "Upload", href: "/", icon: UploadIcon },
  { text: "Your Projects", href: "/your-projects", icon: SubscriptionsIcon },
];

const PLACEHOLDER_LINKS = [
  { text: "Settings", href: "/settings", icon: SettingsIcon },
  { text: "Help Center", href: "/help-center", icon: SupportIcon },
  { text: "Log out", action: AuthService.logout, icon: LogoutIcon },
];

export default function Sidebar({ setState, state }) {
  const isNonMobile = useMediaQuery("(min-width:640px)");
  const pathname = usePathname();

  return (
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
      <Logo size="small" />
      <List
        sx={{
          overflow: "auto",
        }}
      >
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
        {PLACEHOLDER_LINKS.map(({ text, href, action, icon: Icon }) => (
          <ListItem key={text} disablePadding>
            {action ? (
              <ListItemButton selected={href === pathname} onClick={action}>
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
        ))}
      </List>
    </Drawer>
  );
}
