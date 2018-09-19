const router = require('express').Router();
const { Message, Author } = require('../db').models;

router.get('/', (req, res, next) => {
  Message.findAll({
    include: [{ model: Author }]
  })
    .then(messages => res.json(messages))
    .catch(next)
});

router.post('/', async (req, res, next) => {
  //TODO: connect new message with its author

  const { authorName } = req.body;
  const [author] = await Author.findOrCreate({
    where: {
      name: authorName
    }
  })

  const message = await Message.build(req.body);
  message.setAuthor(author);
  message.save();
  res.json(message);
});

module.exports = router;