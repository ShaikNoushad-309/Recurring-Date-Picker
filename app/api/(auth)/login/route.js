
import UserModel from "@/models/userModel.js";
// import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from "@/config/nodemailer.js";
import {NextResponse} from "next/server";
import dbConnect from "@/config/mongodb";
import {SignJWT} from "jose";

export async function POST (req){
    console.log("Got post request at login");
    await dbConnect();
    console.log("Request.json: ",req.json);
    const data = await req.json();
    const {email,password} = data;
    if(!email || !password){
        return NextResponse.json({success:false,message:"Please fill all the fields"});
    }
    try{
        const existingUser = await UserModel.findOne({email});
        if(!await existingUser){
            return NextResponse.json({success:false,message:"Invalid email or password"});
        }
        // console.log("User exists in DB, trying to log you in");
        // const isMatch = await bcryptjs.compare(password,existingUser.password)
        // if(!isMatch){
        //     return NextResponse.json({success:false,message:"Invalid password"});
        // }
        // const user = await UserModel.findById(existingUser._id);
        if(existingUser.password !== password){
            return NextResponse.json({success:false,message:"Invalid password"});
        }
        console.log("User exists in DB, trying to log you in");
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({id:existingUser._id.toString()})
            .setProtectedHeader({alg: "HS256", typ: "JWT"})
            .setExpirationTime('7h')
            .setIssuedAt()
            .sign(secret);
        const response = NextResponse.json({success:true,message:"Logged in successfully"})
        response.cookies.set('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            // sameSite:process.env.NODE_ENV === "production"?"none":"strict",
            sameSite:'lax',
            // maxAge:7 * 24 * 60 * 60 * 1000
        })
        return response;
    }catch (err){
        NextResponse.json({success:false,message:`Error while logging in: ${err.message}`});
    }
}