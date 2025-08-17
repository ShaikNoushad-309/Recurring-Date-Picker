import {NextResponse} from "next/server";
import userModel from "@/models/userModel.js";
import dbConnect from "@/config/mongodb";

export  async function GET(req){
    await dbConnect();
    console.log("Got get req at getUserData");
    // console.log("Req.body: ",req.body);
    try{
        const userId = req.headers.get('user-id');

        // const userId = req.cookies.get('user-id')?.value;
        console.log("UserId from headers: ",userId);
        if(!userId){   //  still the middleware is not being called ,thus userId is not being set to headers
            return NextResponse.json({success:false,message:"UserId is required"});
        }

        const existingUser = await userModel.findById(userId);
        console.log("Existing user: ",existingUser);
        if(!existingUser){
            return NextResponse.json({success:false,message:"No user with this Userid exists"});
        }
        return NextResponse.json({success:true,
            currUserData: {
                email:existingUser.email,
                name:existingUser.name,
                // accountVerificationStatus :existingUser.isAccountVerified?'Verified':'Not Verified',
                isAccountVerified :!!existingUser.isAccountVerified, // returns the original boolean value , works same as below in our case
                // accountVerificationStatus :existingUser.isAccountVerified,
            }});
    }catch (err){
        console.log("Got error in /api/(user)/getdata",err.message);
        return NextResponse.json({success:false,message:`Error while fetching user data: ${err.message}`});
    }
}