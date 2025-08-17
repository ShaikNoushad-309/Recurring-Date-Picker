import UserModel from "@/models/userModel.js";
// import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from "@/config/nodemailer.js";
import {NextResponse} from "next/server";
import dbConnect from "@/config/mongodb";
import {SignJWT} from "jose";


export async function POST(request){
    // const {name,email,password} =   request.body;
    await dbConnect();
        const data =  await request.json();
        const {name,email,password} = data;
    console.log("Got post request at register");

        // console.log("Request.json(): ",request.json());
    console.log("Request.body: ",request.body);

        console.log("Name:",name);
        console.log("Email:",email);
        console.log("Password:",password);
    if(!name || !email || !password){
        return NextResponse.json({success:false,message:"Please enter all the fields"});
    }
    try{
        // const hashedPassword = await bcryptjs.hash(password,12);
        const existingUser = await UserModel.findOne({email:email});
        console.log("Existing user: ",existingUser);
        if(existingUser){
            return NextResponse.json({success:true,message:"User already exists"});
        }
        // const user = await new UserModel({name,email,password:hashedPassword});
        // await user.save();
        const user = await UserModel.create({name,email,password:password})
        // const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn: '7h'});

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({id:user._id.toString()})
            .setProtectedHeader({alg: "HS256", typ: "JWT"})
            .setExpirationTime('7h')
            .setIssuedAt()
            .sign(secret);


        // sending the welcome email
        const mailOptions = {
            from:process.env.SENDER_EMAIL,  // Our email using which we have created our brevo account
            to:email,  // to current users email
            subject:"Welcome to JWT Auth Demo page",
            text:`Welcome to JWT Auth Demo page.Your account has been created with email id: ${email}`
        }
        await transporter.sendMail(mailOptions);

        const response = NextResponse.json({success:true,message:"User registered successfully"});

        response.cookies.set("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            // sameSite:process.env.NODE_ENV === "production"?"none":"strict",
            // secure:true,
            sameSite:'lax',
            maxAge:7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        })


        return  response;
    }catch(err){
        // NextResponse.send()
        return NextResponse.json({success:false,message:`Error while registering: ${err.message}`});
    }
}