import React from "react";  
import { Box, Button, styled, Typography, Grid } from "@mui/material";  
import { Link } from "react-router-dom";  

// Image  
import headerImg from "../assests/h1.png";  

// Icons  
import SavingsIcon from "@mui/icons-material/Savings";  
import TrendingUpIcon from "@mui/icons-material/TrendingUp";  
import PieChartIcon from "@mui/icons-material/PieChart";  

const Header = () => {  
  const CustomBox = styled(Box)(({ theme }) => ({  
    minHeight: "90vh",  
    display: "flex",  
    alignItems: "center",  
    gap: theme.spacing(0),  
    paddingTop: theme.spacing(0),  
    padding: theme.spacing(5),  
    paddingLeft: theme.spacing(7), // Fill the left corner  
    backgroundColor: "#D0DDD0",  
    [theme.breakpoints.down("md")]: {  
      flexDirection: "column",  
      textAlign: "center",  
      paddingLeft: theme.spacing(2), // Adjust for smaller screens  
    },  
  }));  

  const Title = styled(Typography)(({ theme }) => ({  
    fontSize: "72px", // Increased font size  
    color: "#000336",  
    fontWeight: "bold",  
    lineHeight: "1.4", // Adjust line spacing  
    marginLeft: "20px", // Shift text to the right  
    [theme.breakpoints.down("sm")]: {  
      fontSize: "48px", // Responsive size for smaller screens  
    },  
  }));  

  const FeatureText = styled(Typography)(({ theme }) => ({  
    fontSize: "20px",  
    color: "#5A6473",  
  }));  

  return (  
    <CustomBox component="header">  
      <Box sx={{ flex: "1.35" }}>  
        <Title variant="h1" sx={{ fontSize: "100px" }} textAlign={"center"}>  
          Your Financial <br /> Advisor  
        </Title>  
        <Typography  
          variant="body2"  
          sx={{ fontSize: "30px", color: "#5A6473", my: 3 }}  
          textAlign={"center"}  
        >  
          Manage your finances effectively and get personalized advice  
        </Typography>  

        <Grid container spacing={4} sx={{ marginY: 1, justifyContent: "center" }}>  
          <Grid item xs={12} sm={2.6}>  
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>  
              <SavingsIcon sx={{ color: "#1976d2", fontSize: "40px" }} />  
              <FeatureText variant="body1" sx={{ fontSize: "24px" }}>Save More</FeatureText>  
            </Box>  
          </Grid>  
          <Grid item xs={12} sm={2.8}>  
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>  
              <TrendingUpIcon sx={{ color: "#1976d2", fontSize: "40px" }} />  
              <FeatureText variant="body1" sx={{ fontSize: "24px" }}>Track Expenses</FeatureText>  
            </Box>  
          </Grid>  
          <Grid item xs={12} sm={3}>  
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>  
              <PieChartIcon sx={{ color: "#1976d2", fontSize: "40px" }} />  
              <FeatureText variant="body1" sx={{ fontSize: "24px" }}>Financial Reports</FeatureText>  
            </Box>  
          </Grid>  
        </Grid>  

        <Box  
          sx={{  
            display: "flex",  
            justifyContent: "center",  
            alignItems: "center",  
            marginTop: 5  
          }}  
        >  
          <Button  
            variant="contained"  
            color="primary"  
            component={Link}  
            to="/add-transaction"  
            sx={{ padding: "10px 20px", fontSize: "20px" }}  
          >  
            Get Started  
          </Button>  
        </Box>  
      </Box>  
      {/* Right Section */}  
      <Box sx={{ flex: "1.325", marginTop: 5 }}>  
        <img  
          src={headerImg}  
          alt="Financial Management"  
          style={{ maxWidth: "100%", borderRadius: "0px",}}  
        />  
      </Box>  
    </CustomBox>  
  );  
};  

export default Header;
