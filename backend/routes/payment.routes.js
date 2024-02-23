import express from 'express'
import midtransClient from 'midtrans-client'

const router = express.Router()

router.post('/process-transaction', (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    const parameter = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.gross_amount,
      },
      customer_details: {
        first_name: req.body.first_name,
      },
    }

    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      }
      const token = transaction.token
      res.status(200).json({ message: 'success', token, dataPayment })
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
