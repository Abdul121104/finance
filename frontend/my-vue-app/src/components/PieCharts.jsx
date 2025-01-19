import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch transactions from API
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/transactions");
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  }

  // Helper Functions for Chart Data
  const getCategoryDistribution = () => {
    const categories = ['Groceries', 'Party', 'Food', 'Clothing', 'Gaming', 'Others'];
    const categoryTotals = {};
  
    // Initialize all categories with 0
    categories.forEach((category) => {
      categoryTotals[category] = 0;
    });
  
    // Aggregate amounts for each category
    transactions.forEach((transaction) => {
      if (transaction.category in categoryTotals) {
        categoryTotals[transaction.category] += transaction.amount;
      }
    });
  
    return categoryTotals;
  };
  

  const getIncomeExpenseDistribution = () => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        income += transaction.amount;
      } else if (transaction.type === "Expense") {
        expense += transaction.amount;
      }
    });
    return { Income: income, Expense: expense };
  };

  const getNecessityComfortLuxuryDistribution = () => {
    const levels = { Necessity: 0, Comfort: 0, Luxury: 0 };
    transactions.forEach((transaction) => {
      if (transaction.necessityLevel in levels) {
        levels[transaction.necessityLevel] += transaction.amount;
      }
    });
    return levels;
  };

  // Generate Chart Data
  const categoryData = getCategoryDistribution();
  const incomeExpenseData = getIncomeExpenseDistribution();
  const necessityData = getNecessityComfortLuxuryDistribution();

  // Chart Configurations
  const createChartData = (labels, data) => ({
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"],
      },
    ],
  });

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      {/* Chart 1: Category-wise Cost Distribution */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Category-wise Cost Distribution
            </Typography>
            <Pie
              data={createChartData(
                Object.keys(categoryData),
                Object.values(categoryData)
              )}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Chart 2: Income vs Expense Distribution */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Income vs Expense
            </Typography>
            <Pie
              data={createChartData(
                Object.keys(incomeExpenseData),
                Object.values(incomeExpenseData)
              )}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Chart 3: Necessity vs Comfort vs Luxury */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Necessity vs Comfort vs Luxury
            </Typography>
            <Pie
              data={createChartData(
                Object.keys(necessityData),
                Object.values(necessityData)
              )}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PieCharts;
