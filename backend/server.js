const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://ulasisbl:ajJLII9hCaQjnX70@portfolio-app.o0vuf8i.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-app";

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);
const Admin = require('./models/admin');
const Project = require('./models/project');



mongoose.set("strictQuery", false);
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connection successful');
        // Sunucuyu başlatma
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/updateTitle1', async (req, res) => {
    try {
        console.log('UpdateTitle1 request body:', req.body); // Log the request body
        const admin = await Admin.findOneAndUpdate({}, { homeTitle1: req.body.title }, { new: true, upsert: true });
        res.json({ message: 'Title updated successfully', admin });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/title', async (req, res) => {
    try {
        const admin = await Admin.findOne({});
        res.json({ title: admin.homeTitle1 });
    } catch (err) {
        res.status(500).send(err);
    }
});

// currentlyWork

app.get('/api/newWork', async (req, res) => {
    try {
        const admin = await Admin.findOne({});
        res.json({ title: admin.currentlyWork });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/updateNewWork', async (req, res) => {
    try {
        console.log('UpdateTitle1 request body:', req.body); // Log the request body
        const admin = await Admin.findOneAndUpdate({}, { currentlyWork: req.body.title }, { new: true, upsert: true });
        res.json({ message: 'Title updated successfully', admin });
    } catch (err) {
        res.status(500).send(err);
    }
});


const hardcodedUser = {
    username: "admin",
    password: "admin" // Gerçek uygulamalarda daha güçlü bir şifre kullanılmalı
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
        const token = jwt.sign({ userId: hardcodedUser.username }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
        console.log('Login successful');
    } else {
        res.status(401).send('Credentials are not valid');
        console.log('Login error');
    }
});


const projectRoutes = require('./routes/project');  // Projeler için router'ı dahil edin
app.use('/api', projectRoutes);  // Endpoint'leri /api altında kullan

const smallProjectRoutes = require('./routes/small.project'); // SmallProject routes dosyanızın yolu
app.use('/api', smallProjectRoutes);  // Endpoint'leri /api altında kullan

const SkillRouter = require('./routes/skill');
app.use('/api/skills', SkillRouter);


const funFactRouter = require('./routes/funfacts');
app.use('/api/funfacts', funFactRouter);
