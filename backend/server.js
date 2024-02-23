import app from './app.js'
import dotenv from 'dotenv'
import paymentRouter from './routes/payment.routes.js'
const PORT = 1000
dotenv.config()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/payment', paymentRouter)

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})
