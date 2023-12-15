const router = require("express").Router()
const {verifyToken} = require("../middlewares/authMiddle")
const {
        get_shareblog,
        post_shareblog,
        get_allblogs,
        get_yourblogs,
        get_edit_blog,
        post_edit_blog,
        delete_blog,
        read_blog
} = require("../controllers/blogController")


router.get("/share-blog", verifyToken, get_shareblog)
router.post("/share-blog", post_shareblog)
router.get("/all-blogs", get_allblogs)
router.get("/your-blogs", get_yourblogs)
router.get("/edit/:id", get_edit_blog)
router.post("/edit/:id",post_edit_blog)
router.get("/delete/:id",delete_blog)
router.get("/blog/:id",read_blog)
module.exports = router