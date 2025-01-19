import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../components/Navbar";
import adviseImg from "../assests/advise_background.jpg";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Advise = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(5),
    padding: theme.spacing(5),
    position: "relative",
    backgroundColor: "#f7f5f8", // Changed from green to white
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
      padding: theme.spacing(3),
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "72px",
    color: "#000336",
    fontWeight: "bold",
    lineHeight: "1.4",
    marginLeft: "20px",
    textTransform: "uppercase",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "48px",
    },
  }));

  const BackgroundImage = styled("img")(() => ({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  }));
  

  const [transactions, setTransactions] = useState([]);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/transactions");
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions. Please try again later.");
      }
    };

    fetchTransactions();
  }, []);

  const generateAdvice = async () => {
    if (transactions.length === 0) {
      setError("No transactions available to analyze.");
      return;
    }

    setLoading(true);
    setError("");
    setAdvice("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const transactionDetails = transactions
        .map(
          (t) =>
            `Date: ${new Date(t.date).toLocaleDateString()}, Amount: $${t.amount}, Category: ${t.category}, Type: ${t.type}, Necessity Level: ${t.necessityLevel}`
        )
        .join("\n");

      const prompt = `As a financial advisor, analyze the following transactions and suggest how to reduce unnecessary expenditures:\n${transactionDetails}`;

      const result = await model.generateContent(prompt);

      const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (responseText) {
        setAdvice(responseText.trim());
        setOpen(true);
      } else {
        setError("Failed to generate advice. Please try again later.");
      }
    } catch (err) {
      console.error("Error generating advice:", err);
      setError("Failed to generate advice. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomBox component="section">
      <BackgroundImage src={adviseImg} alt="Background" />
      <Navbar />
      <Box sx={{ flex: "1.35", zIndex: 2 }}>
        <Title variant="h1" textAlign={"left"}>
          Financial <br /> Advice Generator
        </Title>
        <Typography
          variant="body2"
          sx={{ fontSize: "25px", color: "black", my: 3 }}
          textAlign={"left"}
        >
          Click the button below to generate personalized advice based on your
          financial transactions.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            marginTop: 5,
          }}
        >
          <Button
            onClick={generateAdvice}
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ padding: "10px 20px", fontSize: "20px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Get Advice"}
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Generated Advice
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#e8f5e9",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            {advice}
          </Typography>
        </DialogContent>
      </Dialog>
    </CustomBox>
  );
};

export default Advise;
