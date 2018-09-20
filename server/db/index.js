const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL ||
  'postgres://localhost/brochat',
  { logging: false }
)

//TODO: create an Author model (plus seed data). Author has many messages, Message belongs to Author

const Message = conn.define('message', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Author = conn.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


//Associations
Message.belongsTo(Author);
Author.hasMany(Message);

const sync = async () => {
  await conn.sync({ force: true })
  const [msg1, msg2, msg3] = await Promise.all([
    Message.create({ content: 'Wooo this is dope' }),
    Message.create({ content: 'Lebron Space jammin' }),
    Message.create({ content: 'Sometimes I just get the feeling, deep within my bones.' }),
  ]);
  const [sam, kev] = await Promise.all([
    Author.create({ name: 'Sam' }),
    Author.create({ name: 'Kev' }),
  ]);

  msg1.setAuthor(sam);
  msg2.setAuthor(sam);
  msg3.setAuthor(kev);
}

module.exports = {
  models: {
    Message,
    Author
  },
  sync
}