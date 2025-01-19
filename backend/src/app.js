import express from'express'; 
import { checkConnection, pool } from './config/db.js';
import emproute from "./routes/emp.js"
const PORT  = 5000
const app = express();

app.use(express.json())

app.use('/emp' , emproute)





app.listen(PORT, async()=>{
    try {
        await checkConnection().then(()=>{
            console.log(`database connection is established.`)
        })

        console.log(`Server is running on port ${PORT} ...`);
    } catch (error) {
        console.log("failed to initialize connection", error);
        
    }

});


