const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categoryData = await Category.findAll(Product).catch((err) => {
    res.json(err);
  })
  res.json(categoryData);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const categoryData = await Category.findByPk(req.params.id, {
    include: Product
  });

  return res.json(categoryData)
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = await Category.create(req.body);
  return res.json(categoryData);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update({
    id: req.body.id,
    category_name: req.body.catergory_name
  }, {
    where: { id: req.params.id }
  });
  return res.json(categoryData)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where: { id: req.params.id }
  });
  return res.json(categoryData);
});

module.exports = router;
