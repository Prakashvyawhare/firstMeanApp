const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts-routes");
const userRoutes = require("./routes/user-routes");
const app = express()
mongoose.connect('mongodb+srv://vyawhareprakash719:xbqun47R6WPbsezz@cluster0.itpgvpt.mongodb.net/node-angular?w=majority').then(() => {
    console.log('connected to database!');
})
    .catch(() => {
        console.log('Connection Failed!');
    });

const { Db } = require('mongodb');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use("/images",express.static(path.join("backend/images")))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requisted-with, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE, OPTIONS ")
    next();
});

app.use("/api/posts", postRoutes);
app.use("/api/auth",userRoutes);
module.exports = app;