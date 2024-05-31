const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const uri = "mongodb+srv://ulasisbl:ajJLII9hCaQjnX70@portfolio-app.o0vuf8i.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-app";

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect(uri)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/add-admin', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const adminUser = new User({
            username: 'admin',
            password: hashedPassword
        });

        await adminUser.save();
        console.log('Admin user added successfully');
        res.status(200).send('Admin user added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding admin user');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});