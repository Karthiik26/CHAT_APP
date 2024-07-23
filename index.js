const express = require("express");
const cors = require("cors");
const Mongo = require("./configDB/connectionDB");
require("dotenv").config();
const router = require('./routes/index')
const cookieparser = require('cookie-parser');
const { app, server } = require('./Socket/index')

// const app = express();
const PORT = process.env.PORT || 4545;

app.use(express.json())
app.use(cookieparser())

// CORS configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Default route
app.get("/", (req, res) => {
    res.json({
        message: "Connected at HOME",
    });
});

// api end points
app.use('/ChatApp', router)

// Database connection and server start
Mongo().then(() => {
    server.listen(PORT, () => {
        console.log("Server Running At " + PORT);
    });
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
});
