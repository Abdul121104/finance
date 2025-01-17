import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const features = [
  { title: 'Track Expenses', description: 'Keep a close eye on your spending habits.' },
  { title: 'Categorize Transactions', description: 'Organize your transactions for better insights.' },
  { title: 'Personalized Advice', description: 'Get tailored suggestions to save more.' },
];

const Features = () => {
  return (
    <Box sx={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}>
        Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#5A6473' }}>
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
