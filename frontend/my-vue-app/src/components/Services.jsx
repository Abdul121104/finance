import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const services = [
  { title: 'Expense Tracking', description: 'Monitor your daily expenses effortlessly.' },
  { title: 'Financial Reports', description: 'Generate insightful financial reports.' },
  { title: 'Advisory Services', description: 'Get expert advice tailored to your spending patterns.' },
];

const Services = () => {
  return (
    <Box sx={{ padding: '4rem 2rem', backgroundColor: '#f0f4f8' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                {service.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#5A6473' }}>
                {service.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
