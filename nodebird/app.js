// const e = require('express');
import e from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path, {dirname} from "path";
import session from "express-session";
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";

dotenv.config();

import pageRouter from './routes/page.js';

const app = e();

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true,
});

//http요청을 로깅하는 미들웨어
app.use(morgan('dev'));
//public 디렉토리의 절대경로를 생성 후 html,이미지,css등의 정적 파일을 제공
// app.use(e.static(path.join(__dirname, 'public')));
app.use(e.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')));
//json페이로드로 들어오는 요청을 파싱, json형식의 본문을 파싱해서 req.body로 사용 가능하게 함
app.use(e.json());
//url-encorede 페이로드를 가진 요청을 파싱,  폼 데이터를 포함하는 요청을 파싱해서 req.body로 사용할수 있게 만듬, 
// extended: false 옵션은 서드파티 라이브러리 대신 Node.js querystring 라이브러리를 사용하며 요청 본문에 중첩된 객체를 허용하지 않습니다.
app.use(e.urlencoded({extended : false}));
//클라이언트 요청에 있는 쿠키를 파싱, 환경변수(.env)파일에서 가져온 COOKIE_SECRET을 사용하여 쿠키를 해석 후 req.cookies에서 사용할수 있게 해줌
app.use(cookieParser(process.env.COOKIE_SECRET));
//사용자 세선을 설정하고 관리, 세션 추적을 위해 쿠키 사용
app.use(session({
    //변경 사항이 발생할때만 세성 저장, 매 요청마다 다시 저장하지 않음
    resave:false,
    //초기화 되지 않은 세션을 저장하지 않음
    saveUninitialized:false,
    //세션 ID쿠키를 확인
    secret:process.env.COOKIE_SECRET,
    cookie:{
        //서버만 접근 가능하도록 설정
        httpOnly:true,
        //쿠키를 https로만 전송할지 여부 결졍
        secure:false,
    }
}));

app.use('/', pageRouter);
app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터 존재x`)
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기중');
})