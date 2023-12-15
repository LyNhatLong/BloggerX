const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports.get_shareblog = (req, res) => {
    res.render("share-blog.ejs");
}

module.exports.post_shareblog = async (req, res) => {
    const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
                if(err) return
                const user = await User.findById(decoded.id)
                const newblog = new Blog({
                    title: req.body.title,
                    content: req.body.content,
                    sharedBy: user.username,
                    userId: user._id
                });
                await newblog.save();
                res.redirect("/all-blogs")
            })
        }
      
  
};

module.exports.get_allblogs = async (req, res) => {
        const blogs = await Blog.find();
        res.render("all-blogs.ejs", { blogs });
    
}

module.exports.get_yourblogs = async (req, res) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if(err) return

            const user = await User.findById(decoded.id)
            const blogs = await Blog.find({userId: user._id})
            res.render("your-blogs.ejs", {blogs})
        })
    }
}

module.exports.get_edit_blog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("edit-blog.ejs", {blog})
}

module.exports.post_edit_blog = async (req, res) => {
    await Blog.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )

    res.redirect("/your-blogs")
}

module.exports.delete_blog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/your-blogs")
}

module.exports.read_blog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("read-blogs.ejs", {blog})
}