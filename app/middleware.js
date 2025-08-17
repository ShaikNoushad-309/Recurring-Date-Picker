    // middleware.js
import { NextResponse } from 'next/server';

    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:3001"
    ]
    export function middleware(request) {
        const origin = request.headers.get('origin');


        // Handle preflight requests
        if (request.method === 'OPTIONS') {
            const response = new NextResponse(null, { status: 200 });

            if (origin && allowedOrigins.includes(origin)) {
                response.headers.set('Access-Control-Allow-Origin', origin);
            }

            response.headers.set('Access-Control-Allow-Credentials', 'true');
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
            response.headers.set('SameSite', 'Lax');

            return response;
        }

        // Handle actual requests
        const response = NextResponse.next();

        if (origin && allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        }

        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('SameSite', 'Lax');

        return response;
    }
    export const config = {
        matcher: '/api/:path*', // Apply only to API routes
    }