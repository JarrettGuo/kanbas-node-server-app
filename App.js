import "dotenv/config";
import express from 'express'
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Hello from './Hello.js'
import Lab5 from './Lab5.js'
import CourseRoutes from './Kanbas/courses/routes.js'
import ModuleRoutes from './Kanbas/modules/routes.js'
import AssignmentRoutes from './Kanbas/assignments/routes.js'
import cors from 'cors'
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
mongoose.connect('mongodb+srv://giuseppi:supersecretpassword@kanbas-database.ejbdgnv.mongodb.net/Kanbas?retryWrites=true&w=majority&appName=Kanbas-database');
// mongoose.connect(connection, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useFindAndModify: true 
// }).then(() => console.log('The mongoose connection worked!'))
//   .catch(error => console.error('Mongoose connection error:', error));

// mongoose.connection.on('error', console.error)

const app = express()
app.use(
cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
  
console.log("Session secret:", process.env.SESSION_SECRET);

app.use(session(sessionOptions));
  
app.use(express.json());
UserRoutes(app)
Hello(app)
CourseRoutes(app)
Lab5(app)
ModuleRoutes(app)
AssignmentRoutes(app)

app.listen(process.env.PORT || 4000);
// app.listen(4000);