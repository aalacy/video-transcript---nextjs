import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const accessToken = request.cookies.get("accessToken");
  if (accessToken?.value) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
  }

  return NextResponse.next();
  // return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|auth/signup|auth/loginin|auth/forgot-password|auth/reset-password).*)",
  ],
};
