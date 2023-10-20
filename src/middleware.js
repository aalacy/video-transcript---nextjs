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
      await res.json();
    } catch (error) {
      NextResponse.redirect(new URL("auth/login", request.url));
    }
  } else {
    // return NextResponse.rewrite(new URL('/', request.url))
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/assets|favicon.ico|auth/signup|auth/login|auth/forgot-password|auth/reset-password).*)",
  ],
};
