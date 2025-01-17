import React, { useEffect, useState } from "react";  
import axios from "axios";  

const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([]);  

  useEffect(() => {  
    axios  
      .get("http://localhost:5050/api/transactions")  
      .then((response) => {  
        setTransactions(response.data);  
      })  
      .catch((error) => {  
        console.error("Error fetching transactions:", error);  
      });  
  }, []);  

  return (  
    <div>  
      <h1>Transaction History</h1>  
      <ul>  
        {transactions.map((transaction) => (  
          <li key={transaction._id}>  
            <h4 >Transaction Details:</h4>
            <ul>  
              {Object.entries(transaction).map(([key, value]) => ( 
                <li key={key}>  
                  {key}: {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}  
                </li>  
              ))}  
            </ul>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  
export default ViewTransaction