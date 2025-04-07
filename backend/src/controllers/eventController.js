const Event = require('../models/Event');
const Club = require('../models/Club');

// Создать событие
exports.createEvent = async(req, res) => {
    try {
        const { name, date, club, description, price, location } = req.body;

        const newEvent = await Event.create({ name, date, club, description, price, location });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании события' });
    }
};

// Получить все события
exports.getAllEvents = async(req, res) => {
    try {
        const events = await Event.find().populate('club');
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении событий' });
    }
};

// Получить событие по ID
exports.getEventById = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('club');
        if (!event) return res.status(404).json({ message: 'Событие не найдено' });

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении события' });
    }
};

// Обновить событие
exports.updateEvent = async(req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Событие не найдено' });

        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при обновлении события' });
    }
};

// Удалить событие
exports.deleteEvent = async(req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Событие не найдено' });

        res.json({ message: 'Событие удалено' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при удалении события' });
    }
};