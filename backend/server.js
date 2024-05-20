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

// API route'ları
app.get("/api/getall", async (req, res) => {
    try {
        const data = await Admin.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/api/add", async (req, res) => {
    const { homeTitle1 } = req.body;

    const admin = new Admin({
        homeTitle1: homeTitle1,
    });

    try {
        await admin.save();
        res.send({ message: "Kayıt başarılı!" });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/api/delete", async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.body._id);
        res.send({ message: "Silme işlemi başarılı!" });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/api/update", async (req, res) => {
    try {
        console.log('Update request body:', req.body); // Log the request body
        await Admin.findByIdAndUpdate(req.body._id, req.body);
        res.send({ message: "Kayıt başarıyla güncellendi!" });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/updateTitle1', async (req, res) => {
    try {
        console.log('UpdateTitle1 request body:', req.body); // Log the request body
        const admin = await Admin.findOneAndUpdate({}, { homeTitle1: req.body.title }, { new: true, upsert: true });
        res.json({ message: 'Title updated successfully', admin });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Eksik olan GET endpoint'i ekleyelim
app.get('/api/title', async (req, res) => {
    try {
        const admin = await Admin.findOne({});
        res.json({ title: admin.homeTitle1 });
    } catch (err) {
        res.status(500).send(err);
    }
});