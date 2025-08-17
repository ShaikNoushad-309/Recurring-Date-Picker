import userModel from "@/models/userModel";
import {NextResponse} from "next/server";
import dbConnect from "@/config/mongodb";

// function to handle reset new password
export async function POST(req){
    await dbConnect();
    const data = await req.json();
    const {email,newPassword,otp} =  data;
    console.log("Req.body at resetPassword: ",req.body)
    if(!email || !newPassword || !otp){
        return NextResponse.json({success:false,message:"All fields are required"});
    }
    try{
        const existingUser = await userModel.findOne({email});
        if(!existingUser){
            return   NextResponse.json({success:false,message:"No user with this email exists"});
        }
        // const NewHashedPassword = await bcryptjs.hash(password,12);
        if(otp ===  '' || otp !== existingUser.resetOTP || existingUser.resetOTP === ''){
            return NextResponse.json({success:false,message:"Invalid OTP"});
        }
        if(existingUser.resetOTPExpiredAt < Date.now()){
            return NextResponse.json({success:false,message:"OTP expired"});
        }
        // existingUser.password = NewHashedPassword;
        existingUser.password = newPassword;
        existingUser.resetOTP = '';
        existingUser.resetOTPExpiredAt = 0;
        await existingUser.save();
        return  NextResponse.json({success:true,message:"Password reset successfully"});

    }catch (err) {
        return  NextResponse.json({success:false,message:`Error while resetting password: ${err.message}`})
    }
}