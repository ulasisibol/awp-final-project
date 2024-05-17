const express = require('express');
const mongoose = require('mongoose');
const titleRoutes = require('./routes/titleRoutes');
const app = express();

// JSON verilerini işlemek için middleware
app.use(express.json());
app.use('/api', titleRoutes);
// MongoDB URI - yerel veya uzak bir MongoDB veritabanına bağlantı
const mongoURI = 'xxxxxx';

// MongoDB'ye bağlanma
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));

// Server'ı başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});