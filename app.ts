require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
const router = require("./src/routes/index.ts");
const cors = require("cors");


const app = express();
const PORT = process.env.APP_PORT;

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());


mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// Routes
app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
