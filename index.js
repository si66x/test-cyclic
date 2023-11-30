const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(notes);
});

app.get("/", (requst, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  const note = notes.find((note) => note.id === Number(id));
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/notes", (request, response) => {
  const note = request.body;
  console.log(request.headers);
  response.json(note);
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// app.put("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.map((note) => note.id === id);
//   response.json(note);
// });

// const HOST = process.env.HOST;
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
