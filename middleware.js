// import {NextResponse} from "next/server";
//
// import {NextResponse} from "next/server";
// import jwt from "jsonwebtoken";
//
//  const middleware = async (req, res, next) =>{
//     const {token} = req.cookies;
//     if(!token){
//         return res.json({success:false,message:"Please login to access this page"});
//     }
//     console.log("Cookies: ",req.cookies);
//      // console.log("Req.body: ",req.body);
//     try{
//         const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);
//         if(decodedToken.id ){
//             console.log("Decoded Token: ",decodedToken);
//             console.log("Decoded Token Id: ",decodedToken.id);
//             // console.log("User Id from req.body: ",req.body.userId);
//             // req.body.userId = decodedToken.id;
//             req.user = {userId:decodedToken.id};
//             // console.log("Req.body: ",req.body);
//         }else{
//             return res.json({success:false,message:"User id not found in token"});
//         }
//         next();
//         // return res.json({success:true,message:"User is authenticated via middleware"});
//     }catch (err){
//         return res.json({success:false,message:`Error while verifying token: ${err.message}`});
//     }
//     // next(); // will cause an error while calling is-(auth) with post request as we are not using next in try
// }
// export default middleware;


// import {NextResponse} from "next/server";
//
// import {NextResponse} from "next/server";
// import jwt from "jsonwebtoken";
//
//  const middleware = async (req, res, next) =>{
//     const {token} = req.cookies;
//     if(!token){
//         return res.json({success:false,message:"Please login to access this page"});
//     }
//     console.log("Cookies: ",req.cookies);
//      // console.log("Req.body: ",req.body);
//     try{
//         const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);
//         if(decodedToken.id ){
//             console.log("Decoded Token: ",decodedToken);
//             console.log("Decoded Token Id: ",decodedToken.id);
//             // console.log("User Id from req.body: ",req.body.userId);
//             // req.body.userId = decodedToken.id;
//             req.user = {userId:decodedToken.id};
//             // console.log("Req.body: ",req.body);
//         }else{
//             return res.json({success:false,message:"User id not found in token"});
//         }
//         next();
//         // return res.json({success:true,message:"User is authenticated via middleware"});
//     }catch (err){
//         return res.json({success:false,message:`Error while verifying token: ${err.message}`});
//     }
//     // next(); // will cause an error while calling is-(auth) with post request as we are not using next in try
// }
// export default middleware;


import {NextResponse} from "next/server";
// import jwt from "jsonwebtoken";
import {jwtVerify} from "jose";

export async function middleware (req) {

    const protectedRoutes = [
        '/api/getdata',
        '/api/getdates',
        '/api/setdates',
        '/api/is-auth',
        '/api/send-verify-otp',
        '/api/verify-account',
    ];
    const publicRoutes = [
        'api/login',
        'api/logout',
        'api/register',
        'api/reset-password',
        'api/send-reset-otp',
    ]
    console.log('Middleware executing');
    console.log('Cookies:', req.cookies.getAll());
    console.log("Cookies: ",req.cookies);
    console.log("Middleware called for route:",req.nextUrl.pathname);

    // const rawCookies = req.cookies.getAll();
    const allCookies =  req.cookies.getAll();
    const token = allCookies.some(cookie => cookie.name === 'token') ? allCookies.find(cookie => cookie.name === 'token').value : null;
    console.log("Token :",token);

    const {pathname} = req.nextUrl;
    console.log("Pathname in middleware: ",pathname);
    if(publicRoutes.some(route => pathname.startsWith(route))){
        console.log("Route is public , skipping authentication");
        return NextResponse.next();
    }
    if(!protectedRoutes.some(route => pathname.startsWith(route))){
        console.log("Route is not protected , skipping authentication");
        return NextResponse.next();
    }
    console.log("Route is protected , checking authentication");

    if(!token){
        console.log("Token is null in root middleware");
        return NextResponse.json({success:false,message:"Please login to access this page"});
    }

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const {payload} = await jwtVerify(token,secret);
        console.log(payload);
        // const decodedToken = jwt.verify(token,process.env.SECRET_KEY); // causes error in Next.js
    try{
        // console.log("Token verified , User id: ",payload.id);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('user-id',payload.id);
        console.log("Decoded Token: ",payload);
        console.log("Decoded Token Id: ",payload.id);
        return NextResponse.next({
            request:{
                headers:requestHeaders,
            }
        });
        // return response;
    }catch (err){
        console.log("Error while verifying token in getdata middleware: ",err.message);
        return NextResponse.json({success:false,message:`Error while verifying token: ${err.message}`});
    }
    // next(); // will cause an error while calling is-(auth) with post request as we are not using next in try
}

export const config = {
    matcher: '/api/:path*',
}


// export async function middleware (req) {
//     const {token} = req.cookies;
//     if(!token){
//         return NextResponse.json({success:false,message:"Please login to access this page"});
//     }
//     console.log("Cookies: ",req.cookies);
//     // console.log("Req.body: ",req.body);
//     try{
//         const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);
//         if(decodedToken.id ){
//             console.log("Decoded Token: ",decodedToken);
//             console.log("Decoded Token Id: ",decodedToken.id);
//             // console.log("User Id from req.body: ",req.body.userId);
//             // req.body.userId = decodedToken.id;
//             req.user = {userId:decodedToken.id};
//             // console.log("Req.body: ",req.body);
//         }else{
//             return NextResponse.json({success:false,message:"User id not found in token"});
//         }
//         NextResponse.next();
//         // return NextResponse.json({success:true,message:"User is authenticated via middleware"});
//     }catch (err){
//         return NextResponse.json({success:false,message:`Error while verifying token: ${err.message}`});
//     }
//     // next(); // will cause an error while calling is-(auth) with post request as we are not using next in try
// }

