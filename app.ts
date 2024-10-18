import express from 'express';
import mongoose from 'mongoose';
const router = require("./src/routes/index.ts");
const cors = require("cors");

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());


mongoose
    .connect('mongodb://localhost:27017/taskboard')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// Routes
app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
