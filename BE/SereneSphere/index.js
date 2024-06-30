const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();
require('./src/connection_database');
const initRoutes = require('./src/routes');
const initSocket =require('./src/connection_socket')

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL, // Cập nhật để cho phép tất cả các origin hoặc cấu hình chính xác theo yêu cầu của bạn
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// Initialize routes
initRoutes(app);
// Initialize socket
initSocket.connection_socket(io);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

