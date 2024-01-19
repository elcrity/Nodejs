const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')

dotenv.config()
const indexRouter = require('./routes')

const app = express();

app.set('port', process.env.PORT || 4000)
app.set('view engine', 'html');
nunjucks.configure('views',{
    express : app,
    watch: true,
})

app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    }
}))

app.use('/', indexRouter);

//에러 생성, 상태가 404인 에러 처리 담당
app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} 라우터 X.`)
    error.status = 404;
    next(error);
})


app.use((err, req,res,next) => {
    //view 엔진에 로컬 변수 전달
    //에러 메세지 저장
    res.locals.message = err.message;
    //개발 환경 확인후 프로덕션에서는 빈객체, 아니면 err객체
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {}
    //에러 객체에 상태코드가 존재하면 해당 상태코드, 없으면 500
    res.status(err.status || 500);
    //렌더링 error.html
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });