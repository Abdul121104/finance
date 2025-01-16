import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);


const Advise = () => {
  const [transactions, setTransactions] = useState([]);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch transactions from the backend
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

  // Generate financial advice
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

      // Create the prompt with transaction data
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

  return (
    <div>
      <h1>Financial Advisor</h1>
      <button onClick={generateAdvice} disabled={loading}>
        {loading ? "Generating Advice..." : "Get Advice"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {advice && (
        <div>
          <h2>Generated Advice:</h2>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default Advise;
