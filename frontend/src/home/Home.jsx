import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
const Home = () => {
  const [name, setName] = useState('')
  const [order_id, setOrder_id] = useState('')
  const [total, setTotal] = useState(0)

  const handleSubmit = async () => {
    console.log(name, order_id, total)
  }
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
