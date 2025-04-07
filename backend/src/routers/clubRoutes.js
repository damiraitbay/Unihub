const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController'); // Middleware для проверки авторизации

// Роуты для работы с клубами
router.post('/create', clubController.createClub); // Создание клуба
router.get('/', clubController.getAllClubs); // Получение списка клубов
router.get('/:id', clubController.getClubById); // Получение клуба по ID
router.put('/:id', clubController.updateClub); // Обновление клуба
router.delete('/:id', clubController.deleteClub); // Удаление клуба

module.exports = router;