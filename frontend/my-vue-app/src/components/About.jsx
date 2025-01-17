import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ padding: '4rem 2rem', backgroundColor: '#E1EACD' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto', color: '#5A6473', lineHeight: '1.8' }}>
        We are committed to helping individuals manage their finances effectively.
        Our platform provides tools to track expenses, categorize transactions, and
        get personalized financial advice. Your journey towards financial freedom starts here.
      </Typography>
    </Box>
  );
};

export default About;
