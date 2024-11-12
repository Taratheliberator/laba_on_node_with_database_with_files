// controllers/productController.js
const Product = require('../models/Product');
const Category = require('../models/Category');
const path = require('path');

// ��������� ���� ���������
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: '������ �������' });
  }
};

// �������� ������ ��������
exports.createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: '���������� ������� ��������, ���� � ��������� ������' });
  }

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: '��������� �� �������' });
    }

    const newProduct = await Product.create({ name, price, categoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: '������ �������' });
  }
};

// �������� ����������� ��� ��������
exports.uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '���� �� ��� ��������' });
  }

  // ���������� ���� � ������������ �����
  res.status(200).json({ imagePath: `/uploads/${req.file.filename}` });
};

