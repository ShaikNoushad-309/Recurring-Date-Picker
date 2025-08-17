import {NextResponse} from "next/server";
import dbConnect from "@/config/mongodb";
import * as jose from 'jose';


export const POST= async (req)=>{
    try{
        await dbConnect();
        const response = NextResponse.json({success:true,message:"Logged out successfully"})


        response.cookies.delete("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            // sameSite:process.env.NODE_ENV === "production"?"none":"strict",
            // maxAge:7 * 24 * 60 * 60 * 1000
            sameSite:'lax'
        });

        // const email = req.body; // No need to delete record from mongoDb when user logged Out
        // // const existingUser = await userModel.findOne({email}); // just remove his specific cookie
        // console.log("Email received in LogOut function: ",email);
        // const existingUser = await userModel.findOne({email});
        // console.log("Existing user in LogOut function: ",existingUser);
        // if(!existingUser){
        //    return res.json({success:false,message:"No account with this email exists"});
        // }
        // await userModel.deleteOne({email});

        return response;
    }catch(err){
        return NextResponse.json({success:false,message:`Error while logging out: ${err.message}`})
    }
}