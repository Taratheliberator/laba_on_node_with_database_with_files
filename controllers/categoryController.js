// controllers/categoryController.js
const Category = require('../models/Category');

// ��������� ���� ���������
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: '������ �������' });
  }
};

// �������� ����� ���������
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: '���������� ������� �������� ���������' });
  }

  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: '������ �������' });
  }
};
