import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ElectricGuitars() {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory")
      .then((response) => {
        setGuitars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guitar inventory!", error);
      });
  }, []);

  // Function to handle single guitar purchase
  const purchaseGuitar = (guitarId) => {
    axios
      .post("http://localhost:5000/purchase", { guitarId })
      .then((response) => {
        alert("Purchase successful!");
        // Update stock locally after purchase
        setGuitars((prevGuitars) =>
          prevGuitars.map((guitar) =>
            guitar.id === guitarId
              ? { ...guitar, stock: guitar.stock - 1 }
              : guitar
          )
        );
      })
      .catch((error) => {
        console.error("Error during purchase:", error);
        alert("Purchase failed. Try again.");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Electric Guitars Inventory</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "18px",
            border: "2px solid black",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          ⬅ Back to Home
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {guitars.map((guitar) => (
          <div
            key={guitar.id}
            style={{
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={`http://localhost:5000${guitar.image}`}
              alt={guitar.name}
              style={{ width: "170px", height: "230px", objectFit: "contain" }}
            />
            <h2>{guitar.name}</h2>
            <p>Price: ${guitar.price}</p>
            <p>Stock: {guitar.stock}</p> {/* Show remaining stock */}
            <button
              onClick={() => purchaseGuitar(guitar.id)}
              disabled={guitar.stock === 0} // Disable button if out of stock
            >
              {guitar.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElectricGuitars;