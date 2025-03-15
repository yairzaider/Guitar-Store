import { Link } from "react-router-dom";

function Home() 
{
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Zaider's Guitar Store</h1>
      <p>Welcome to the best guitar store! Choose a category:</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/electric-guitars" style={{ padding: "10px 20px", border: "2px solid black", borderRadius: "8px", textDecoration: "none", fontSize: "18px" }}>
          Electric Guitars
        </Link>

        <Link to="/acoustic-guitars" style={{ padding: "10px 20px", border: "2px solid black", borderRadius: "8px", textDecoration: "none", fontSize: "18px" }}>
          Acoustic Guitars
        </Link>
      </div>
    </div>
  );
}

export default Home;
