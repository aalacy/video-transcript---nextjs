import { Toaster } from "react-hot-toast";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AuthProvider } from "@/context/jwt-context";
import RootLayout from "@/components/common/layout";

export const metadata = {
  title: "SuSubmagicPro - Free AI Video Caption GeneratorbmagicPro",
  description: "SubmagicPro - Free AI Video Caption Generator",
  icons: {
    icon: "/favicon.ico",
  },
  robots: "noindex",
};

export default function DefaultRootLayout({ children, session }) {
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
