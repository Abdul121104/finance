import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, Grid, Modal } from "@mui/material";
import axios from "axios";

const List = () => {
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/transactions"); // Adjust the API endpoint as needed
        setTransactions(response.data);
        setVisibleTransactions(response.data.slice(0, 5)); // Show only the last 5 transactions initially
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontSize: "2rem",
          fontWeight: 600,
          color: "#2c3e50",
          marginBottom: 4,
        }}
      >
        Transaction List
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: "900px", margin: "0 auto" }}>
        {visibleTransactions.map((transaction, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                cursor: "pointer",
                background: "linear-gradient(135deg, #ffffff, #e0f7fa)",
                borderRadius: "15px",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
              onClick={() => handleTransactionClick(transaction)}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
                  Transaction: {transaction.description || "No Description"}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                  Amount: ₹{transaction.amount}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                  Date: {new Date(transaction.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!showAll && transactions.length > 5 && (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#1b5e20" },
            }}
            onClick={() => {
              setVisibleTransactions(transactions); // Show all transactions
              setShowAll(true);
            }}
          >
            View More
          </Button>
        </Box>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            borderRadius: "15px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            p: 4,
          }}
        >
          {selectedTransaction ? (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: "1.8rem", fontWeight: 600, color: "#00796b" }}
              >
                Transaction Details
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: 1 }}>
                <strong>Description:</strong> {selectedTransaction.description || "No Description"}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: 1 }}>
                <strong>Amount:</strong> ₹{selectedTransaction.amount}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: 1 }}>
                <strong>Date:</strong>{" "}
                {new Date(selectedTransaction.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: 1 }}>
                <strong>Category:</strong> {selectedTransaction.category}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: 2 }}>
                <strong>Type:</strong> {selectedTransaction.type}
              </Typography>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#b71c1c" },
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default List;
