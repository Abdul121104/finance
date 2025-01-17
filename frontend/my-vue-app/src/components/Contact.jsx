import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Box sx={{ padding: '4rem 2rem', backgroundColor: '#CCD3CA' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>
        Contact Us
      </Typography>
      <Box
        component="form"
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Message" variant="outlined" multiline rows={4} fullWidth />
        <Button
    variant="contained"
    sx={{
      backgroundColor: "#4CAF50", // Green background color
      color: "white", // White text
      padding: "10px 20px",
      "&:hover": {
        backgroundColor: "#45a049", // Darker green on hover
      },
    }}
  >
    Submit
  </Button>
      </Box>
    </Box>
  );
};

export default Contact;
