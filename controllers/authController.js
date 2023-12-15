const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(id) {
    return jwt.sign({ id }, process.env.TOKEN_SECRET);
}

module.exports.get_signup = (req, res) => {
    res.render("signup.ejs");
}

module.exports.get_login = (req, res) => {
    res.render("login.ejs");
}

module.exports.post_signup = async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        const user = await newuser.save();
        const token = createToken(user._id);
        res.cookie("jwt", token);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.post_login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const validatePass = await bcrypt.compare(req.body.password, user.password);

            if (validatePass) {
                const token = createToken(user._id);
                res.cookie("jwt", token);
                res.redirect("/");

            } else {
                res.status(401).json({ error: "Password is wrong" });
            }
        } else {
            res.status(404).json({ error: "Email is wrong" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/")

}
