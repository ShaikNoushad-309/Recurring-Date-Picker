import userModel from "@/models/userModel.js";
import {NextResponse} from "next/server";
import dbConnect from "@/config/mongodb";

//  Verify the email using otp
export async function POST (req){
    await dbConnect();
    const data = await req.json();
    const {otp} = data;
    // const {userId} = req.user;
    const userId = req.headers.get('user-id');
    console.log("Req.body at verifyEmail: ",req.body);
    console.log("UserId at verifyEmail: ",userId);
    if(!userId || !otp){
        return NextResponse.json({success:false,message:"UserId and OTP are required"});
    }
    try{
        const existingUser = await userModel.findById(userId);
        if(!existingUser){
            return NextResponse.json({success:false,message:"No user with this Userid exists"});
        }
        if(otp === '' || existingUser.verifyOTP ==='' || existingUser.verifyOTP !== otp){
            return NextResponse.json({success:false,message:"Invalid OTP"});
        }
        if(existingUser.verifyOTPExpiredAt < Date.now() ){ // let's say 2(ie 1 day post otp sent) days in milliseconds < 3 days(curr day) in ms
            return NextResponse.json({success:false,message:"OTP expired"});
        }
        existingUser.isAccountVerified = true;
        existingUser.verifyOTP = '';
        existingUser.verifyOTPExpiredAt = 0;
        existingUser.save();
        return  NextResponse.json({success:true,message:"Email verified successfully"});
    }catch (err){
        return  NextResponse.json({success:false,message:`Error while verifying email: ${err.message}`})
    }
}