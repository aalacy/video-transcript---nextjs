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
};

export default function DefaultRootLayout({ children, session }) {
  return (
    <html lang="en">
      <script
        src="//code.tidio.co/hhgifx0lbs19h2a8rew6nd0drifqs2gj.js"
        async
      ></script>
      <body
        suppressHydrationWarning={true}
        style={{ backgroundColor: "background.default" }}
      >
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
