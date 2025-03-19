import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'

// initialize express
const app=express()

// connect to database
await connectDB()

// middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/',(req,res)=>{
    res.send('Hell0, Priyanshu')
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)

// PORT
const PORT=process.env.PORT || 3001;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
