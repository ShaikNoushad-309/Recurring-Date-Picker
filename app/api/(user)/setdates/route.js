import userModel from "@/models/userModel";
import {NextResponse} from "next/server";


export async function POST(req) {
    console.log("Got post request at setdates");
    const {rawDates} = await req.json();
    console.log("Raw dates received in setdates: ",rawDates);
    // const {dates} = rawDates;
    // console.log("Dates received in setdates: ",dates);
    const userId = req.headers.get('user-id');
    console.log("UserId received in setdates: ",userId);
    const existingUser = await userModel.findById(userId);
    console.log("Existing user in setdates: ",existingUser);
    if(!existingUser){
        return   NextResponse.json({success:false,message:"No user with this Userid exists"});
    }
    try{
        existingUser.dates = rawDates;
        await existingUser.save();
        return  NextResponse.json({success:true,message:"Dates set successfully"});
    }catch (err) {
        console.log("Got error in /api/(user)/setdates",err.message);
        return  NextResponse.json({success:false,message:`Error while setting dates: ${err.message}`})
    }


}