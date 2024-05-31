const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://ulasisbl:ajJLII9hCaQjnX70@portfolio-app.o0vuf8i.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-app";
const Admin = require('./admin'); // Admin modelini içe aktarıyoruz

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


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'admin', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Credentials are not valid');
    }
});