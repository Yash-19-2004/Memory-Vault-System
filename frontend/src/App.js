import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [memories, setMemories] = useState([]);

  async function fetchData() {
    const res = await axios.get("http://localhost:5000/memories");
    setMemories(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addMemory() {
    if (!title || !note) return;

    await axios.post("http://localhost:5000/memory", {
      title,
      note,
      tag
    });

    setTitle("");
    setNote("");
    setTag("");
    fetchData();
  }

  async function deleteMemory(id) {
    await axios.delete("http://localhost:5000/memory/" + id);
    fetchData();
  }

  return (
    <div className="app">

      <div className="header">
        Memory Vault System
      </div>

      <div className="heroBox">

        <h2>Welcome to Your Personal Life Vault</h2>

        <p>
          Store memories, ideas, travel experiences, achievements, and thoughts.
          Every moment matters — keep them safe forever.
        </p>

        <div className="statsRow">
          <div>Total Memories: {memories.length}</div>
          <div>Active Vault: Online</div>
          <div>Storage: Unlimited</div>
        </div>

      </div>

      <div className="inputBox">

        <input
          placeholder="Memory Title (e.g. First Job, Trip, Achievement)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Tag (life / travel / work / success)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <textarea
          placeholder="Write full memory description..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={addMemory}>
          Save Memory 
        </button>

      </div>

      {memories.length === 0 && (
        <div className="emptyState">

          <h2>Your Vault is Empty</h2>

          <p>
            Start adding memories like:
            First Job, College Day, Travel Experience, Success Moment...
          </p>

          <div className="suggestions">
            “My first internship experience”  
            “Trip to Goa 2024”  
            “Coding journey started”  
          </div>

        </div>
      )}

      <div className="grid">

        {memories.map(m => (
          <div className="card" key={m.id}>

            <div className="cardTop">
              <h3>{m.title}</h3>
              <span className="tag">{m.tag}</span>
            </div>

            <p className="note">{m.note}</p>

            <div className="cardBottom">
              <small>{m.date}</small>

              <button onClick={() => deleteMemory(m.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;

