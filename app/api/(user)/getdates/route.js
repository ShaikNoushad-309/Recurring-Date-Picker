import userModel from "@/models/userModel";
import {NextResponse} from "next/server";
import dbConnect from "@/config/mongodb";

// function to handle reset new password
export async function GET(req){
    await dbConnect();
    console.log("Got get req at getdates route");
    const userId = req.headers.get('user-id');
    const existingUser = await userModel.findById(userId);
    console.log("Existing user in getdates: ",existingUser);
    try{
        if(!existingUser){
            return   NextResponse.json({success:false,message:"No user with this Userid exists"});
        }
        // const dates = existingUser.dates;  // can be reduced to below
        console.log("Existing user dates: ",existingUser.dates);
        return  NextResponse.json({success:true,
        rawDates:{
            dates: existingUser.dates
        }});
    }catch (err) {
        return  NextResponse.json({success:false,message:`Error while getting dates from db: ${err.message}`})
    }
}