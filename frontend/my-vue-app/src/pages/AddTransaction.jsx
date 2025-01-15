import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post("http://localhost:5050/api/transactions", formData);
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
    <div style={styles.container}>
      <h2 style={styles.header}>Add Transaction</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Amount:</label>
          <input
            style={styles.input}
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Category:</label>
          <select
            style={styles.select}
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Groceries">Groceries</option>
            <option value="Party">Party</option>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
            <option value="Gaming">Gaming</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Type:</label>
          <select
            style={styles.select}
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Necessity Level:</label>
          <select
            style={styles.select}
            name="necessityLevel"
            value={formData.necessityLevel}
            onChange={handleChange}
          >
            <option value="Necessity">Necessity</option>
            <option value="Comfort">Comfort</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Description:</label>
          <textarea
            style={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="200"
            placeholder="Add any notes or details about the transaction..."
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Payment Method:</label>
          <select
            style={styles.select}
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AddTransaction;
