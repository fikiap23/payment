import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Home = () => {
  const [name, setName] = useState('')
  const [order_id, setOrder_id] = useState('')
  const [total, setTotal] = useState(0)
  const [token, setToken] = useState('')

  const handleSubmit = async () => {
    const data = {
      first_name: name,
      gross_amount: total,
      order_id,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await axios.post(
      'http://localhost:1000/api/payment/process-transaction',
      data,
      config
    )
    // console.log(response.data.token)
    setToken(response.data.token)
  }

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem('pembayaran', JSON.stringify(result))
          setToken('')
        },
        onPending: (result) => {
          console.log(result)
          setToken('')
        },
        onError: (result) => {
          console.log(result)
          setToken('')
        },
        onClose: () => {
          console.log('customer closed the popup')
          setToken('')
        },
      })
      setName('')
      setOrder_id('')
      setTotal(0)
    }
  }, [token])

  useEffect(() => {
    const midtransURL = 'https://app.sandbox.midtrans.com/snap/snap.js'
    let scriptTag = document.createElement('script')
    scriptTag.src = midtransURL
    scriptTag.setAttribute('data-client-key', 'SB-Mid-client-9Zi8wZ7Kp0eJr8z9')
    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '50vw',
        padding: 4,
      }}
    >
      <TextField
        label="Nama"
        type="text"
        sx={{ marginBottom: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Order_id"
        type="text"
        sx={{ marginBottom: 2 }}
        value={order_id}
        onChange={(e) => setOrder_id(e.target.value)}
      />
      <TextField
        label="Total"
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />

      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" onClick={handleSubmit}>
          Bayar
        </Button>
      </Box>
    </Box>
  )
}

export default Home
