import * as http from 'http'
import app from './src/app.js'
import { initialiseSocket } from './socket.js'

const port = process.env.PORT || 3000;
const server = http.createServer(app);

initialiseSocket(server);




server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});