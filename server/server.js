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



//post routes