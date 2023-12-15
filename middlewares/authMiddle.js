const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyToken(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Nếu token không hợp lệ, bạn có thể xóa cookie jwt và chuyển hướng đến trang login
                res.clearCookie('jwt');
                return res.redirect("/login");
            }

            // Thêm thông tin từ token vào req để sử dụng trong các xử lý định tuyến khác
            req.userId = decoded.id;

            // Gọi next để chuyển điều khiển đến xử lý định tuyến tiếp theo
            next();
        });
    } else {
        // Nếu không có token, chuyển hướng đến trang login
        res.redirect("/login");
    }
}

async function checkUser(req, res, next){
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decode) =>{
            if(err){
                res.locals.user = null
                next()
            } else {
                const user = await User.findById(decode.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}




module.exports = { verifyToken, checkUser };
