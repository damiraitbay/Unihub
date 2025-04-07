const Club = require('../models/Club');
const User = require('../models/User');

// Шаг 1: Создание клуба
exports.createClub = async(req, res) => {
    const { name, description, rating } = req.body; // Используем ID текущего пользователя, если это администратор

    try {
        const newClub = new Club({
            name,
            description,
            rating
        });

        await newClub.save();
        res.status(201).json({ message: 'Клуб успешно создан!', club: newClub });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании клуба' });
    }
};

// Шаг 2: Получение списка клубов
exports.getAllClubs = async(req, res) => {
    try {
        const clubs = await Club.find();
        res.json({ clubs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении клубов' });
    }
};

// Шаг 3: Получение клуба по ID
exports.getClubById = async(req, res) => {
    const { id } = req.params;

    try {
        const club = await Club.findById(id).populate('name'); // Популяция для получения данных о администраторе

        if (!club) {
            return res.status(404).json({ message: 'Клуб не найден' });
        }

        res.json({ club });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении клуба' });
    }
};

// Шаг 4: Обновление информации о клубе
exports.updateClub = async(req, res) => {
    const { id } = req.params;
    const { name, description, rating } = req.body;

    try {
        const updatedClub = await Club.findByIdAndUpdate(id, {
            name,
            description,
            rating
        }, { new: true });

        if (!updatedClub) {
            return res.status(404).json({ message: 'Клуб не найден' });
        }

        res.json({ message: 'Клуб успешно обновлен', club: updatedClub });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при обновлении клуба' });
    }
};

// Шаг 5: Удаление клуба
exports.deleteClub = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedClub = await Club.findByIdAndDelete(id);

        if (!deletedClub) {
            return res.status(404).json({ message: 'Клуб не найден' });
        }

        res.json({ message: 'Клуб успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при удалении клуба' });
    }
};