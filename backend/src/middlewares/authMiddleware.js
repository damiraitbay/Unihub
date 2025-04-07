const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware для защиты маршрутов (например, для авторизации пользователей)
const protect = async(req, res, next) => {
    let token;

    // Проверяем, есть ли токен в заголовках
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Извлекаем токен
            token = req.headers.authorization.split(' ')[1];

            // Декодируем и проверяем токен
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Получаем пользователя по ID из токена
            req.user = await User.findById(decoded.id).select('-password');
            next(); // Если всё в порядке, передаем управление дальше
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Неавторизован' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Нет токена, авторизация не пройдена' });
    }
};

module.exports = { protect };