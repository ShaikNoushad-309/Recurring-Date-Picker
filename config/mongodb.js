// import mongoose from 'mongoose';

// export const ConnectDB = async ()=>{
//
//     // Attach listeners first
//     mongoose.connection.on("connected",()=>{
//         console.log("Database connected");
//     });
//     mongoose.connection.on('disconnected',()=>{
//         console.log("Database disconnected");
//     });
//     mongoose.connection.on('error',()=>{
//         console.log("Error in database connection");
//     });
//
//    //  Then connect
//    //   await mongoose.connect(`${process.env.MONGODB_URL}jwtAuthDemo`);
//
//     await mongoose.connect(`mongodb://localhost:27017/jwtAuthDemo`).then((data)=>{
//         console.log("Database connected");
//     }).catch((err)=>{
//         console.log("Error in database connection: ",err);
//     });
//     console.log("Database connected");
//     console.log(mongoose.models)
//
//
//     // await mongoose.connect(`mongodb://localhost:27017/jwtAuthDemo`);
//
//     // The order of operations matters in this case. Here's why you didn't see the "Database connected" message:
//     //     What's Happening: when I write eventListener after the event ie 'connected'.
//     //
//     //      When you call mongoose.connect(), it starts the connection process asynchronously.
//     //
//     //     If the connection completes before you attach the event listener, the "connected" event will fire but your listener won't catch it because it wasn't registered yet.
//     //
//     //     The await pauses execution until the connection is complete, but if the connection was very fast (or cached), it might have connected before you added the listener.
//     // Solution:
//     //     Always attach event listeners before initiating the connection:
// }

import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    //     // Attach listeners first
    // mongoose.connection.on("connected",()=>{
    //     console.log("Database connected");
    // });
    // mongoose.connection.on('disconnected',()=>{
    //     console.log("Database disconnected");
    // });
    // mongoose.connection.on('error',()=>{
    //     console.log("Error in database connection");
    // });
    if (cached.conn) {
        console.log("Database connected");
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((data) => {
            return data;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;


