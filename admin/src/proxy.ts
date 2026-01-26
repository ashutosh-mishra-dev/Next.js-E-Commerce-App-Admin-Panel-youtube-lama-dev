
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
 // return NextResponse.json({token:token})
 
  const { pathname } = request.nextUrl;

  //const isPublicRoute = pathname.startsWith("/login");
  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));


  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: [
  //   "/", "/login",
  // ],
 // matcher: ["/((?!api|_next|.\\..).*)"],
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const RedirectService = (url: string, request: NextRequest) => {
//   return NextResponse.redirect(new URL(url, request.url));
// };

// export function proxy(request: NextRequest) {

//   NextResponse.json({data:"hello i ma data"})
//   const token = request.cookies.get("accessToken");
//   const currentPath = request.nextUrl.pathname;
  
//   if (!token) {
//     if (currentPath !== "/login") {
//       return RedirectService("/login", request);
//     }
//   } else {
//     if (["/login"].includes(currentPath)) {
//       return RedirectService("/", request);
//     }
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/((?!api|_next|.\\..).*)"],
// };