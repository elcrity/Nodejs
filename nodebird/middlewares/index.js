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
        res.redirect(`/?error=${message}`);
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