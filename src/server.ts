import app from "./app";
import connectDB from "./config/db";
const dotenv = require('dotenv');

// env configuration
dotenv.config();

// DB Connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
