// const server = require('./App.ts')
// const server = require('express')
import server from './App'
import { config } from './config/config'


server.listen(config.PORT, () => {
    console.log(`Server listening at ${config.PORT}`)
})