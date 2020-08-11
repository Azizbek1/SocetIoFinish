const http = require('http');
const socketio = require('socket.io');


const server = http.createServer((req, res) => {
    res.end("Hello Server Node js")
})


server.listen(3000, () => { console.log("Salom Server 3000 port")})

const io = socketio.listen(server)

// const nsp = io.of('/chat')

// nsp.on('connection', (socket) => {
//     console.log('Kimdir Boglandi !!!!');
//     socket.on("newUser", () => {
//         nsp.emit("Hammaga jo'nat", {name: 'Aziz'})
//     })    
// })

io.sockets.on('connection', (socket) => {

    // Id olish uchun   
    // console.log(socket.id);

    // const data = {'1': 1, '2': 2, '3': 3}; // object
    // console.log(Object.keys(data));        // masiv 


    // socket.join("room1")
    // socket.join("room2")
    // socket.join("room3", () => {
    //     const rooms = Object.keys(socket.rooms)
    //     console.log(rooms);
    // })



    socket.on("joinRoom", (data) => {
        socket.join(data.name, () => {  
        //   let count =   
          io.to(data.name).emit("newJoin", {count: gOC(io, data)} )
          socket.emit("join", {message: 'Xonaga kirdingiz'})
        //   const rooms = Object.keys(socket.rooms)  // id, honani nomi  
        //   console.log(rooms[0]);

        })
    })

    socket.on("leaveRoom", (data) => {
        socket.leave(data.name, () => {
            io.to(data.name).emit("leavedRoom", {count: gOC(io, data)})
            socket.emit("socketLeaved", {message: 'Xonadan Chiqdingiz !!!'})
        })
    })


    socket.on('disconnect', (socket) => {
        console.log("Foydalanuvchi Tark qildi");
    })

})

const gOC = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name]

    return room ? room.length : 0
   

}
