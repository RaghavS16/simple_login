require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

// Must match your Amplify frontend URL exactly
const CLIENT_URL = process.env.CLIENT_URL;

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // preflight

app.use(express.json());
app.use(cookieParser());

// Health check (helps debug and Render check)
app.get('/', (req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime() });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;

// ---- MongoDB connect ----
const MONGO_URI = process.env.MONGO_URI; // include a DB name in the URI!
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing');
  process.exit(1);
}

mongoose.connect(MONGO_URI, { dbName: process.env.MONGO_DB || undefined })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection error', err);
    process.exit(1);
  });
