import express  from 'express';
import dbConnect from './dbConnect.js';
import cors from 'cors';
import http from'http';
import { Server } from 'socket.io';
import 'dotenv/config'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/user.js'



const PORT = process.env.PORT || 5001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

export { io };

dbConnect(process.env.MONGO_URL)


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    
};

app.use(cors(corsOptions));


app.use(express.json());



app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
  

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
