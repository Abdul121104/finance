import React, { useState } from "react";
import { Box, Container, Grid, Card, CardContent, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "../components/Navbar";
import PieCharts from "../components/PieCharts";
import LineChart from "../components/LineChart";
import List from "../components/List";

const ViewTransaction = () => {
  const [fullscreenChart, setFullscreenChart] = useState(null);

  const handleOpenFullscreen = (chartType) => {
    setFullscreenChart(chartType);
  };

  const handleCloseFullscreen = () => {
    setFullscreenChart(null);
  };

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgb(255, 248, 248)),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23a5d6a7' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        minHeight: "100vh",
        paddingBottom: 4,
      }}
    >
      <Navbar />

      <Container 
        maxWidth="xl" 
        sx={{ 
          marginTop: 2,
          paddingTop: 1
        }}
      >
        <Grid container spacing={3}>
          {/* Top Row - Full Width PieCharts */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
                }
              }}
              onClick={() => handleOpenFullscreen('pie')}
            >
              <CardContent>
                <Typography 
                  variant="h5" 
                  align="center" 
                  sx={{
                    fontWeight: 600,
                    color: "#2E7D32",
                    marginBottom: 2,
                    marginTop: 1
                  }}
                >
                  Financial Distribution Analysis
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    gap: 2,
                    padding: { xs: 0.5, md: 3.5 }
                  }}
                >
                  <PieCharts />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Bottom Row - Full Width LineChart */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
                },
                height: "100%",
                minHeight: "400px",
                
              }}
              onClick={() => handleOpenFullscreen('line')}
            >
              <CardContent>
                <Typography 
                  variant="h5" 
                  align="center" 
                  sx={{
                    fontWeight: 600,
                    color: "#2E7D32",
                    marginBottom: 2,
                    marginTop: 1
                  }}
                >
                  Expense Trends Over Time
                </Typography>
                <Box
                  sx={{
                    height: "calc(100% - 50px)",
                    minHeight: "300px",
                    padding: { xs: 1, md: 2 }
                  }}
                >
                  <LineChart />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={!!fullscreenChart}
        onClose={handleCloseFullscreen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            height: '90%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
            borderRadius: 4,
            transition: "all 0.3s ease-in-out",
            transform: fullscreenChart ? "translateY(0)" : "translateY(-100vh)",
          }}
        >
          <IconButton
            onClick={handleCloseFullscreen}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <CloseIcon />
          </IconButton>
          {fullscreenChart === 'pie' && <PieCharts />}
          {fullscreenChart === 'line' && <LineChart />}
        </Box>
      </Modal>
      
      <List/>
    </Box>
  );
};

export default ViewTransaction;