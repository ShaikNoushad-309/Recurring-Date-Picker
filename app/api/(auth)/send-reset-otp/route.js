
import {NextResponse} from "next/server";
import transporter from "@/config/nodemailer";
import userModel from "@/models/userModel.js";
import dbConnect from "@/config/mongodb";

// send otp reset password
export async function POST(req){
    await dbConnect();
    const data = await req.json();
    const {email} = data;
    if(!email){
        return NextResponse.json({success:false,message:"Email is required"});
    }
    try{
        const existingUser = await userModel.findOne({email});
        if(!existingUser){
            return NextResponse.json({success:false,message:"No user with this email exists"});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        existingUser.resetOTP = otp;
        existingUser.resetOTPExpiredAt = Date.now() + 15 * 60  * 1000;
        await existingUser.save();

        const mailOptions ={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Password Reset OTP from JWT Auth Demo",
            text:`Your password reset otp is ${otp}.Use this otp to reset your password.`
        }
        await transporter.sendMail(mailOptions);
        return  NextResponse.json({success:true,message:"Reset OTP sent to mail successfully"});
    }catch (err){
        return NextResponse.json({success:false,message:`Error while sending reset otp: ${err.message}`})
    }
}