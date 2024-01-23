const jwt = require('jsonwebtoken')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const {Domain} = require('../models/index')

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
        const message = encodeURIComponent('로그인한 상태입니다');
        res.redirect('/?error=${message}');
        return;
    }
    next();
    // if(req.isAuthenticated()){
    //     next();
    // }else{
    //     const message = encodeURIComponent('로그인한 상태입니다');
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

exports.apiLimiter = rateLimit({
    windowMs: 60*1000,
    max : 10,
    handler(req, res) {
        res.status(this.statusCode).json({
            code : this.statusCode, //기본값 429
            message : '1분에 한 번만 요청할 수 있습니다'
        })
    }
})

exports.deprecated = (req, res) =>{
    res.status(410).json({
        code:410,
        message : '새버전 나옴, 새로운 버전을 사용하세요'
    })
}

exports.corsWhenDomainMatches = async(req, res, next) =>{
    const domain = await Domain.findOne({
        where: { host: new URL(req.get('origin')).host}//클라이언트의 도메인 확인
    })
    console.log('URL, origin.host : ' , new URL(req.get('origin')).host);
    if(domain){
        cors({
            origin : req.get('origin'),
            Credential : true,
        })(req,res,next)
    } else {
        next();
    }
    
}