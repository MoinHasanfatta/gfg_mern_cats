import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/cat"; // Backend URL

function App() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all cats
  const fetchCats = async () => {
    const res = await axios.get(API_URL);
    setCats(res.data);
  };

  // Add or update cat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { name });
    } else {
      await axios.post(API_URL, { name });
    }
    setName("");
    setEditId(null);
    fetchCats();
  };

  // Delete cat
  const deleteCat = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCats();
  };

  // Set edit mode
  const editCat = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Cat CRUD App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter cat name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Cat</button>
      </form>

      <h2>List of Cats</h2>
      <ul>
        {cats.map((cat) => (
          <li key={cat._id}>
            {cat.name} 
            <button onClick={() => editCat(cat)}>Edit</button>
            <button onClick={() => deleteCat(cat._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
