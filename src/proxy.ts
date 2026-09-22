import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/admin/login" || pathname === "/api/admin/login";
  const hasSession = request.cookies.has("lumora_admin_session");

  if (isLoginRoute) {
    return NextResponse.next();
  }

  if (!hasSession) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
