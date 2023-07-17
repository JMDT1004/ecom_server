const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
    include: [Product, ProductTag]
  })

  return res.json(tagData);
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagData = await Tag.findByPk(req.params.id, {
    include: [Product, ProductTag]
  });

  return res.json(tagData)
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  const createTag = await Tag.create(req.body);

  return res.json(createTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(
    {
      id:req.body.id,
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  );

  return res.json(updateTag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });

  return res.json(deleteTag)
});

module.exports = router;