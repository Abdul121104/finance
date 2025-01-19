import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography, Box } from "@mui/material";

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/transactions");
      const transactions = response.data;

      // Filter only expenses and group them by date
      const groupedExpenses = transactions.reduce((acc, transaction) => {
        if (transaction.type === "Expense") {
          const date = new Date(transaction.date).toISOString().split("T")[0]; // Format: YYYY-MM-DD
          acc[date] = (acc[date] || 0) + transaction.amount;
        }
        return acc;
      }, {});

      // Sort dates and prepare data for the chart
      const sortedDates = Object.keys(groupedExpenses).sort((a, b) => new Date(a) - new Date(b));
      const dataPoints = sortedDates.map((date) => groupedExpenses[date]);

      // Update chart data
      setChartData({
        labels: sortedDates,
        datasets: [
          {
            label: "Daily Expenses",
            data: dataPoints,
            borderColor: "#3f51b5",
            backgroundColor: "rgba(63, 81, 181, 0.1)",
            fill: true,
            tension: 0.4, // Adds smooth curves
            pointRadius: 3,
            pointBackgroundColor: "#3f51b5",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Day-Wise Expenses
        </Typography>
        <Box sx={{ height: 400, position: "relative" }}>
          {chartData ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false, // Prevents aspect ratio enforcement
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Expense Amount (₹)",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          ) : (
            <Typography>Loading chart data...</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;
