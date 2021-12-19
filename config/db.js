const mongoose = require('mongoose')

const CONNECTION_URL =
  'mongodb+srv://car-x:carxofficial2021@car-x.paoed.mongodb.net/car-x?retryWrites=true&w=majority'

// 'mongodb://127.0.0.1:27017/car-x'

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000
    console.log(`Server Running on Port: ${PORT}`)
  })
  .catch((error) => console.log(`${error} did not connect`))

// mongoose.set('useFindAndModify', false)
