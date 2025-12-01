import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Exclude Next.js internals and static files to prevent breaking styles/scripts
    if (path.startsWith("/_next") || /\.(.*)$/.test(path)) {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value

    // Auth Protection Logic
    // Protected routes
    if (path.startsWith('/desktop/user') || path.startsWith('/mobile/user')) {
        if (!token) {
            // User is not authenticated, redirect to login
            const isMobilePath = path.startsWith('/mobile');
            const loginPath = isMobilePath ? '/mobile/auth/login' : '/desktop/auth/login';
            const loginUrl = new URL(loginPath, request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Auth routes (redirect if already logged in)
    if (path.startsWith('/desktop/auth') || path.startsWith('/mobile/auth')) {
        if (token) {
            // User is authenticated, redirect to user dashboard
            const isMobilePath = path.startsWith('/mobile');
            const userPath = isMobilePath ? '/mobile/user' : '/desktop/user';
            const userUrl = new URL(userPath, request.url);
            return NextResponse.redirect(userUrl);
        }
    }

    const ua = request.headers.get("user-agent") || "";
    const isMobile = /Android|iPhone|iPod|Opera Mini|IEMobile|Mobile/i.test(ua);

    const isInMobile = path.startsWith("/mobile");
    const isInDesktop = path.startsWith("/desktop");

    // MOBILE → force into /mobile
    if (isMobile) {
        if (!isInMobile) {
            if (isInDesktop) {
                url.pathname = path.replace('/desktop', '/mobile');
            } else {
                url.pathname = "/mobile" + (path === "/" ? "" : path);
            }
            return NextResponse.redirect(url);
        }
    }

    // DESKTOP → force into /desktop
    if (!isMobile) {
        if (!isInDesktop) {
            if (isInMobile) {
                url.pathname = path.replace('/mobile', '/desktop');
            } else {
                url.pathname = "/desktop" + (path === "/" ? "" : path);
            }
            return NextResponse.redirect(url);
        }
    }

    // Continue normally
    return NextResponse.next();
}
