const router = require("express").Router()
const {get_signup, get_login, post_signup, post_login, logout} = require("../controllers/authController")

router.get("/signup", get_signup)
router.get("/login", get_login)
router.post("/signup", post_signup)
router.post("/login", post_login)
router.get("/logout", logout)


module.exports = router