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
})

const sync = async () => {
  await conn.sync({ force: true })
  return Promise.all([
    Message.create({ content: 'Wooo this is dope' }),
    Message.create({ content: 'Lebron Space jammin' }),
    Message.create({ content: 'Sometimes I just get the feeling, deep within my bones.' }),
  ])
}

module.exports = {
  models: {
    Message
  },
  sync
}