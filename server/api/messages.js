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
  const authorName = req.body.authorName || 'Jancey';
  const [author] = await Author.findOrCreate({
    where: {
      name: authorName
    }
  })

  const message = await Message.create(req.body);
  message.setAuthor(author);
  res.json(message);

  // const message = await Message.build(req.body);
  // message.setAuthor(author);
  // console.log(message, 'WOOO')
  // message.save();
  // res.json(message);
});

router.put('/edit/:id', async (req, res, next) => {
  try{
    const message = await Message.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: [Author]
      }]
    })
    const [number, messageToEdit] = message.update({
      content: req.body.content
    })
    res.send(messageToEdit)
  }
  catch(err) {next(err)}
})

router.delete('/:id', (req, res, next) => {
  Message.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(message => {
    console.log(message)
    message.destroy()
  })
  .then(() => res.sendStatus(204).end())
  .catch(next)
})

module.exports = router;