const moongose = require('mongoose')

const dbConnection = async() => {
  try {
    await moongose.connect(process.env.MONGO_DB_CNN)

    console.log('Database online')
  } catch (error) {
    console.error(error)
    throw newError(`Error: ${error}`)
  }
}

module.exports = {
  dbConnection
}
