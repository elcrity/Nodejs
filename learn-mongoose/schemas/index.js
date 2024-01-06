const mongoose  = require('mongoose')


const connect = () => {
    //개발환경에서 몽구스의 쿼리 내용 확인
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true)
    }
    //몽구스와 몽고 디비 연결, db의 root 계정의 root 비밀번호의 admin 데이터베이스로 접속, 실제로 사용할 데이터 베이스는 nodejs
    mongoose.connect('mongodb://root:root@localhost:27017/admin', {
        dbName : 'nodejs',
        // useNewUrlParser: true,
    }).then(() => {
        console.log('mongodb연결 성공');
    }).catch((err)=>{
        console.log('연결 에러 : ' , err);
    })
}
//에러 발생시 에러 기록, 연결 종료시 재연결
mongoose.connection.on('error', (error) => {
    console.error('mongodb 연결 에러'  ,error);
})
mongoose.connection.on('disconnected', () => {
    console.error('mongodb disconnected');
    connect();
})

module.exports = connect;

