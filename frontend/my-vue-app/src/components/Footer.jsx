import React from "react";
import { Box, Typography, styled } from "@mui/material";

// Social Media Icons
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  // Styled components
  const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#86C8BC",
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderTop: "1px solid #ddd",
  }));

  const SocialIcons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  }));

  const FooterLink = styled("a")(({ theme }) => ({
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
    "&:hover": {
      color: "#1976d2",
    },
  }));

  return (
    <FooterContainer component="footer">
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Finance Manager
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, color: "#555" }}>
        Helping you take control of your finances one step at a time.
      </Typography>
      <Box>
        <FooterLink href="/home">Home</FooterLink> |{" "}
        <FooterLink href="/add-transaction">Add Transaction</FooterLink> |{" "}
        <FooterLink href="/view-transaction">View Transactions</FooterLink> |{" "}
        <FooterLink href="/advise">Financial Advice</FooterLink>
      </Box>
      <SocialIcons>
        <FooterLink href="https://facebook.com" target="_blank">
          <Facebook />
        </FooterLink>
        <FooterLink href="https://twitter.com" target="_blank">
          <Twitter />
        </FooterLink>
        <FooterLink href="https://instagram.com" target="_blank">
          <Instagram />
        </FooterLink>
        <FooterLink href="https://linkedin.com" target="_blank">
          <LinkedIn />
        </FooterLink>
      </SocialIcons>
      <Typography variant="body2" sx={{ marginTop: 3, color: "#777" }}>
        © 2025 Finance Manager. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
