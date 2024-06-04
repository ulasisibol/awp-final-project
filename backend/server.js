const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://ulasisbl:ajJLII9hCaQjnX70@portfolio-app.o0vuf8i.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-app";

const Admin = require('./models/admin');


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
    password: "admin"
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

// ROUTES


const projectRoutes = require('./routes/project');
app.use('/api', projectRoutes);

const smallProjectRoutes = require('./routes/small.project');
app.use('/api', smallProjectRoutes);

const SkillRouter = require('./routes/skill');
app.use('/api/skills', SkillRouter);


const funFactRouter = require('./routes/funfacts');
app.use('/api/funfacts', funFactRouter);
