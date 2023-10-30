import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ErrorMessage } from "./responses/messages";

// Reusable function to check if the user is authenticated
async function isAuthenticated(request: NextRequest, loginUrl?: string): Promise<NextResponse> {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    console.log(token);


    // If not logged in, redirect to the login page
    if (!token || token?.sub === "" || token.loginId === "") {
        if (loginUrl) {
            return NextResponse.redirect(loginUrl);
        } else {
            return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 });
        }
    }

    return NextResponse.next();
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const loginUrl = process.env.APP_URL + '/login'

    // Usage for /api/profile
    if (pathname.startsWith("/api/profile")) {
        return isAuthenticated(request);
    }
    // Usage for /dashboard
    else if (pathname.startsWith("/dashboard")) {
        return isAuthenticated(request, loginUrl);
    }

}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/profile/:path*",
    ]
}