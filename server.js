const http = require("http")
const fs = require("fs")
const path = require("path")
const db = require('./database')

let messages = db.getMessages()
console.log(messages)
db.addMessage("abcd", 1)

const indexHtmlFile = fs.readFileSync(path.join(__dirname, "static", "index.html"))
const styleFile = fs.readFileSync(path.join(__dirname, "static", "style.css"))
const scriptFile = fs.readFileSync(path.join(__dirname, "static", "script.js"))

const server = http.createServer((req, res) => {
    switch(req.url) {
        case "/": return res.end(indexHtmlFile)
        case "/style.css": return res.end(styleFile)
        case "/script.js": return res.end(scriptFile)
    }

    return res.end("Error 404")
})

server.listen(3000)

const {Server} = require("socket.io")
const io = new Server(server)

io.on('connection', (socket)=>{
    console.log("user connected id - " + socket.id)
    let userNick = 'user'

    socket.on('set_nick', (nickname)=>{
        console.log(nickname)
        userNick = nickname
    })

    socket.on('new_message', (message)=>{
        console.log("id: "+socket.id+" message :" + message)
        io.emit('message', userNick + ': ' + message)
    })
})







