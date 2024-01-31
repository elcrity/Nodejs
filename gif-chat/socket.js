const SocketIO = require('socket.io')

module.exports = (server) => {
    const io = SocketIO(server,{path : '/socket.io'})

    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새 클라이언트 접속', ip);
        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        })
        socket.on('error', (error) => {
            console.log(error);
        })
        socket.on('reply', (data) => {
            console.log(data);
        })
        socket.interval = setInterval(() => {
            socket.emit('news', 'Hello Socket.IO')
        }, 3000)
    })
}
