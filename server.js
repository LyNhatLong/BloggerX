require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/authRoute")
const blogRoute = require("./routes/blogRoute")
const {checkUser} = require("./middlewares/authMiddle")


const app = express ()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

mongoose.connect("mongodb://localhost/BlogDb")
.then (() => console.log("Connected"), app.listen(3000))
.catch(() => console.log("Couldn't connected"))

app.get("*", checkUser)
app.get("/", (req, res) => res.render("home.ejs"))

app.use(authRoute)
app.use(blogRoute)