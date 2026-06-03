const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /api/tasks - Lister toutes les taches
router.get('/', (req, res) => {
  res.json(Task.getAll());
});

// GET /api/tasks/:id - Voir une tache
router.get('/:id', (req, res) => {
  const task = Task.getById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tache introuvable' });
  res.json(task);
});

// POST /api/tasks - Creer une tache
router.post('/', (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Le champ "title" est requis' });
  }
  const task = Task.create({ title, description, status });
  res.status(201).json(task);
});

// PUT /api/tasks/:id - Modifier une tache
router.put('/:id', (req, res) => {
  const task = Task.update(req.params.id, req.body);
  if (!task) return res.status(404).json({ error: 'Tache introuvable' });
  res.json(task);
});

// DELETE /api/tasks/:id - Supprimer une tache
router.delete('/:id', (req, res) => {
  const deleted = Task.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Tache introuvable' });
  res.status(204).send();
});

module.exports = router;
