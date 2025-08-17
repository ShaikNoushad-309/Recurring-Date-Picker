# Recurring Date Picker

A web app to manage the repetitive schedules and dates.

# Steps to Use
- Clone the repository.
- Ensure that node.js is installed on your system.
- Start the project(executes both front-end and backend) by running the command
```
npm run dev
```
- Ensure you have installed mongoDBCompass
- Connect to Database by running the below command
```
 mongod --dbpath="C:\data\db" 
```
- Database documents will be stored at location `C:\data\db`
- Open the respective localhost port 3000 in browser.
- Now the web app displays existing records if any.
- You can look in the mongoDBCompass for quick verification on CRUD Operations.

# 📦 Technologies Used

    Framework (front-end & backend ): Next.js , React, TailwindCSS , RestAPI

    Authentication : jsonwebtoken(jwt) , jose

    Database: mongoDB(Mongoose for Schema enforcement)
