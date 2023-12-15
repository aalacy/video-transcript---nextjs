import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const accessToken = request.cookies.get("accessToken");
  if (accessToken?.value) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        },
      );
      const data = await res.json();
      console.log("data", data);
    } catch (error) {
      NextResponse.redirect(new URL("auth/login", request.url));
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/:*|favicon.ico|auth/:path*).*)"],
};
