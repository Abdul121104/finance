import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Grid,
  styled,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";
import backgroundImage from "../assests/background.jpg";

// Styled Components for Consistency
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4CAF50",
  color: "#fff",
  fontSize: "16px",
  padding: theme.spacing(1.5),
  textTransform: "none",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#45A049",
  },
}));

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Groceries",
    type: "Expense",
    necessityLevel: "Necessity",
    description: "",
    paymentMethod: "Others",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://finance-khwu.onrender.com/api/transactions",
        formData
      );
      alert("Transaction added successfully!");
      setFormData({
        amount: "",
        category: "Groceries",
        type: "Expense",
        necessityLevel: "Necessity",
        description: "",
        paymentMethod: "Others",
      });
      console.log("Transaction added:", response.data);
    } catch (error) {
      console.error("Failed to add transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            maxWidth: 600,
            borderRadius: 10,
            backgroundColor: "rgb(255, 255, 255)",
            boxShadow: "0px 8px 20px rgb(0, 94, 23)", // Transparent white for contrast
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Add Transaction
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ marginBottom: 3, color: "#666" }}
          >
            Keep track of your expenses and income effortlessly!
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>₹</span>,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="Groceries">Groceries</MenuItem>
                  <MenuItem value="Party">Party</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Clothing">Clothing</MenuItem>
                  <MenuItem value="Gaming">Gaming</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Necessity Level"
                  name="necessityLevel"
                  value={formData.necessityLevel}
                  onChange={handleChange}
                >
                  <MenuItem value="Necessity">Necessity</MenuItem>
                  <MenuItem value="Comfort">Comfort</MenuItem>
                  <MenuItem value="Luxury">Luxury</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add any notes or details about the transaction..."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Payment Method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <StyledButton fullWidth type="submit">
                  Add Transaction
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddTransaction;
