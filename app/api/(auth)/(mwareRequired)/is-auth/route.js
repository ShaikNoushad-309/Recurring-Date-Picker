import {NextResponse} from "next/server";

export async function GET  (req){
    try{
        return NextResponse.json({success:true,message:"User is authenticated"});
    }catch (err){
        return  NextResponse.json({success:false,message:`Error while verifying email: ${err.message}`})
    }
}