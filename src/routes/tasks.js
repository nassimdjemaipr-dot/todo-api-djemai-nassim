const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /api/tasks - Lister toutes les taches
router.get('/', async (req, res, next) => {
  try {
    res.json(await Task.getAll());
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id - Voir une tache
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tache introuvable' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks - Creer une tache
router.post('/', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: 'Le champ "title" est requis' });
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id - Modifier une tache
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.update(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: 'Tache introuvable' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id - Supprimer une tache
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Task.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Tache introuvable' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
