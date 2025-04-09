const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Импортируем библиотеку CORS

dotenv.config();

// 🟢 Подключаем все модели
const User = require('./models/User');
const Club = require('./models/Club');
const Event = require('./models/Event');
const Ticket = require('./models/Ticket');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Notification = require('./models/Notification');
const Schedule = require('./models/Schedule');

// Инициализируем приложение
const app = express();

// ✅ Разрешаем все домены или конкретные домены
app.use(cors()); // Это разрешает все домены. Для более строгой настройки можно указать домены вручную.

app.use(express.json());

// 🔐 Роуты
// const authRoutes = require('./routers/authRoutes');
const eventRoutes = require('./routers/eventRoutes');
const clubRoutes = require('./routers/clubRoutes'); // Добавляем роуты для клубов
// app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes); // Добавляем роуты для клубов

// Подключаемся к базе
connectDB();

// ✅ Маршрут по умолчанию
app.get('/', (req, res) => {
    res.send('UniHub Backend is running...');
});

// 🔧 Этот маршрут создаёт все коллекции
app.get('/init', async(req, res) => {
    try {
        const user = await User.create({ name: 'User A', password: "password", email: 'a@sdu.edu.kz', role: 'Student', interests: "Football", followedClubs: ["Puzzle Club", "Damu Club"] });

        const club = await Club.create({ name: 'AI Club', description: 'Artificial Intelligence', adminId: user._id, rating: 4.8 });

        const event = await Event.create({
            name: 'AI Workshop',
            date: new Date(),
            club: club._id,
            description: 'Intro to AI',
            price: 1000,
            location: 'Room 101'
        });

        const ticket = await Ticket.create({ userId: user._id, eventId: event._id, qrCode: 'sampleQR123' });

        const post = await Post.create({ clubId: club._id, content: 'Welcome to AI Club!', date: new Date(), likes: 10, comments: [] });

        const comment = await Comment.create({ userId: user._id, postId: post._id, text: 'Cool!', date: new Date() });

        const notification = await Notification.create({ userId: user._id, text: 'Don’t miss the AI workshop!' });

        const schedule = await Schedule.create({
            userId: user._id,
            subject: 'Machine Learning',
            teacher: 'Dr. Smith',
            date: new Date(),
            time: '10:00',
            room: '201-B'
        });

        res.send('All collections initialized with sample data!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка инициализации');
    }
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
