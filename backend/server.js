const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let memories = [];

app.post("/memory", (req, res) => {

  const newMemory = {
    id: Date.now(),
    title: req.body.title,
    note: req.body.note,
    tag: req.body.tag,
    date: new Date().toLocaleDateString()
  };

  memories.push(newMemory);

  res.json(newMemory);
});


app.get("/memories", (req, res) => {
  res.json(memories);
});


app.delete("/memory/:id", (req, res) => {

  const id = req.params.id;

  memories = memories.filter((m) => m.id != id);

  res.json({ message: "Memory deleted" });

});


app.put("/memory/:id", (req, res) => {

  const id = req.params.id;

  memories = memories.map((m) => {

    if (m.id == id) {
      return {
        ...m,
        note: req.body.note
      };
    }

    return m;

  });

  res.json({ message: "Memory updated" });

});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
