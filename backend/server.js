// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const userRoutes = require("./routes/userRoutes");
// const errorHandler = require("./middlewares/errorHandler");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;


// // Middleware
// // const cors = require("cors");


// app.use(cors());
// app.options("*", cors());

// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/users", userRoutes);

// app.use(errorHandler);

// // DB + Server Start
// mongoose
//   .connect(process.env.MONGO_URL )
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => console.error("DB Error:", err));
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ USE BOTH — cors package + manual headers
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ handle preflight

// ✅ Manual headers as backup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use("/api/users", userRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));