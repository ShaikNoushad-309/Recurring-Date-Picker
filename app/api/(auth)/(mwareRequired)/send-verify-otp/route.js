import userModel from "@/models/userModel.js";
import {NextResponse} from "next/server";
import transporter from "@/config/nodemailer";
import dbConnect from "@/config/mongodb";

// Send verification otp to the user's email
export async function POST (req){
    try{
        await dbConnect();
        console.log("Req.body at sendVerifyOTP: ",req.body)
        // const {userId} = req.user;
        const userId = req.headers.get('user-id');
        const existingUser = await userModel.findById(userId);
        if(existingUser.isAccountVerified){
            return  NextResponse.json({success:false,message:"Account already verified"});
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        existingUser.verifyOTP = otp; // generated otp & stored in DB
        // existingUser.verifyOTPExpiredAt = (Date.now() + 10 * 60 * 1000); // 10 mins forward to Date.now()
        existingUser.verifyOTPExpiredAt = (Date.now() + 24  * 60 * 60 * 1000); // 24 hours forward to Date.now()
        existingUser.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to:existingUser.email,
            subject: "Account Verification OTP from JWT Auth Demo",
            text: `Your verification otp is ${otp}.Verify your account using the otp which will be valid for 24 hours.`
        }
        await transporter.sendMail(mailOptions);
        return  NextResponse.json({success:true,message:"OTP sent to mail successfully"});
    }catch(err){
        return  NextResponse.json({success:false,message:`Error while verifying OTP: ${err.message}`})
    }
}