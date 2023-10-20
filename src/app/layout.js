import { Toaster } from "react-hot-toast";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AuthProvider } from "@/context/jwt-context";
import RootLayout from "@/components/common/layout";

export const metadata = {
  title: "SubmagicPro",
  description: "Free AI Video Caption Generator",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DefaultRootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "background.default" }}>
        <Toaster position="top-center" />
        <ThemeRegistry>
          <AuthProvider>
            <RootLayout>{children}</RootLayout>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
