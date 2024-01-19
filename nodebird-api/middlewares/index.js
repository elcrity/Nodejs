const jwt = require('jsonwebtoken')
//passport가 req.객체에 isAuthenticated()메서드를 추가해줌. 로그인 중이면 true, 아니면 false
exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(403).send('로그인 필요');
        return;
    }
    next();
    // if(req.isAuthenticated()){
    //     next();
    // }else{
    //     res.status(403).send('로그인 필요');
    // }
}

exports.isNotLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        const message = encodedURIComponent('로그인한 상태입니다');
        res.redirect('/?error=${message}');
        return;
    }
    next();
    // if(req.isAuthenticated()){
    //     next();
    // }else{
    //     const message = encodedURIComponent('로그인한 상태입니다');
    //     res.redirect('/?error=${message}')
    // }
}

exports.verifyToken = (req, res, next) =>{
    try {
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (err) {
        if(err.name === 'TokenExpiredError'){
            return res.status(419).json({
                code : 419,
                message : '토큰 만료'
            })
        }
    }
    return res.status(401).json({
        code : 401,
        message : '유효하지 않은 토큰'
    })
}