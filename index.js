import express from 'express'
import { headerSchema, validator } from './validation.js';
import router from './router.js';

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(validator.headers(headerSchema))

app.use('/user', router)

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
