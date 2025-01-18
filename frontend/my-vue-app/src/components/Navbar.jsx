import React, { useState, useEffect } from "react";  
import { AppBar, Toolbar, Typography, Button, Box, styled } from "@mui/material";  
import { Link } from "react-router-dom";  

const Navbar = () => {  
  const [showNavbar, setShowNavbar] = useState(true);  
  const [prevScrollY, setPrevScrollY] = useState(0);  

  useEffect(() => {  
    const handleScroll = () => {  
      const currentScrollY = window.scrollY;  
      setShowNavbar(currentScrollY <= prevScrollY || currentScrollY < 100); // Show when scrolling up or near the top  
      setPrevScrollY(currentScrollY);  
    };  

    window.addEventListener("scroll", handleScroll);  
    return () => window.removeEventListener("scroll", handleScroll);  
  }, [prevScrollY]);  

  // Styled component for navigation buttons  
  const NavButton = styled(Button)(({ theme }) => ({  
    color: "#fff",  
    fontSize: "20px",  
    textTransform: "none",  
    padding: theme.spacing(1.5, 3),  
    borderRadius: "30px",  
    background: "transparent",  
    border: "2px solid transparent",  
    transition: "all 0.3s ease",  
    "&:hover": {  
      backgroundColor: "#fff",  
      color: "#5E7D4C",  
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",  
    },  
  }));  

  // Styled component for the app bar  
  const StyledAppBar = styled(AppBar)(({ theme }) => ({  
    background: "linear-gradient(90deg, #748E63 20%, #5E7D4C 80%)",  
    boxShadow: "none",  
    borderRadius: "30px",  
    width: "80%",  
    position: "fixed",  
    top: showNavbar ? "20px" : "-100px", // Hide/show navbar  
    left: "50%",  
    transform: "translateX(-50%)",  
    transition: "top 0.5s ease, opacity 0.5s ease", // Added opacity transition  
    opacity: showNavbar ? 1 : 0, // Control opacity based on visibility  
    zIndex: 1300,  
  }));  

  return (  
    <StyledAppBar>  
      <Toolbar  
        sx={{  
          display: "flex",  
          justifyContent: "space-between",  
          alignItems: "center",  
          padding: "10px 20px",  
        }}  
      >  
        <Typography  
          variant="h4"  
          sx={{  
            fontWeight: "bold",  
            fontFamily: "'Poppins', sans-serif",  
            color: "#fff",  
            cursor: "pointer",  
          }}  
        >  
          Finance Advisor  
        </Typography>  

        <Box  
          sx={{  
            display: "flex",  
            alignItems: "center",  
            gap: "20px",  
          }}  
        >  
          <NavButton component={Link} to="/">  
            Home 
          </NavButton>  
          <NavButton component={Link} to="/add-transaction">  
            Add Transaction  
          </NavButton>  
          <NavButton component={Link} to="/view-transaction">  
            View Transactions  
          </NavButton>  
          <NavButton component={Link} to="/advise">  
            Get Advice  
          </NavButton>  
        </Box>  
      </Toolbar>  
    </StyledAppBar>  
  );  
};  

export default Navbar;