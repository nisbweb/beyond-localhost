import express from "express";
import {createServer} from "http";
import bodyParser from "body-parser";
import { dirname,join } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(join(__dirname,'../client')));

//get routes
app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'../client','index.html'));
})

//post routes
app.post('/joinRoom',(req,res)=>{
    const {username,roomID} = req.body;

    if(!username || !roomID)
    {
        return res.status(400).send("Both username and room ID are required");
    }

    res.redirect(`/client.html?username=${encodeURIComponent(username)}&roomID=${encodeURIComponent(roomID)}`);
})

io.on('connection',(socket)=>{
    console.log(`${socket.id} connected`);

    socket.on('joinRoom',(username,roomID)=>{
        socket.join(roomID);
    })

    socket.on('chatMessage',(username,roomID,msg)=>{
        socket.to(roomID).emit('chatMessage',username,msg);
    })

    socket.on('disconnect',()=>{
        console.log(`${socket.id} is disconnected`);
    })
})

server.listen(3000,()=>{
    console.log("your server is running on port 3000...");
})