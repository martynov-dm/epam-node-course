import * as http from 'http'
import app from './app.js'
import { connectDB } from './services/sequelize.js';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

(async function startServer() {
    await connectDB()
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`)
    })
}())
