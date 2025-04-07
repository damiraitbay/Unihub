const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Временное хранилище кодов подтверждения
const verificationCodes = {}; // email -> code

// Генерация JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// Настройка транспорта для Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Используем Gmail, но можно использовать любой SMTP-сервер
    auth: {
        user: process.env.EMAIL_USER, // Ваш email адрес (например, "your-email@gmail.com")
        pass: process.env.EMAIL_PASS, // Ваш email пароль
    },
    secure: true, // Устанавливает безопасное соединение
    port: 465, // Используем порт 465 для SSL
});

// Шаг 1: Отправка кода на почту
exports.sendVerificationCode = async(req, res) => {
    const { email } = req.body;

    // Проверяем, что почта принадлежит университету SDU
    if (!email.endsWith('@stu.sdu.edu.kz')) {
        return res.status(400).json({ message: 'Только корпоративная почта SDU разрешена.' });
    }

    // Генерация случайного кода
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = code;

    // Отправка кода на email
    const mailOptions = {
        from: process.env.EMAIL_USER, // Отправитель
        to: email, // Получатель
        subject: 'Ваш код для подтверждения регистрации',
        text: `Ваш код для подтверждения регистрации в UniHub: ${code}`,
    };

    // Отправляем email
    try {
        // await transporter.sendMail(mailOptions);
        console.log(`[DEBUG] Код для ${email}: ${code}`); // Код выводится в консоли для отладки

        res.json({ message: 'Код отправлен на почту.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при отправке кода на почту.' });
    }
};

// Шаг 2: Подтверждение и регистрация
exports.verifyAndRegister = async(req, res) => {
    const { email, code, name } = req.body;

    // Проверяем правильность введенного кода
    if (verificationCodes[email] !== code) {
        return res.status(400).json({ message: 'Неверный код' });
    }

    // Ищем пользователя по email
    let user = await User.findOne({ email });
    if (!user) {
        // Если пользователя нет, создаем нового
        user = await User.create({ email, name, role: 'Student' });
    }

    // Удаляем код из временного хранилища
    delete verificationCodes[email];

    // Генерируем JWT
    const token = generateToken(user);
    res.json({ message: 'Успешная регистрация', token, user });
};

// Шаг 3: Вход по email без кода (если пользователь уже зарегистрирован)
exports.login = async(req, res) => {
    const { email } = req.body;

    // Ищем пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Генерация JWT
    const token = generateToken(user);
    res.json({ message: 'Успешный вход', token, user });
};