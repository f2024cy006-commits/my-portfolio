const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio backend is ready.',
    status: 'ok',
  })
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
