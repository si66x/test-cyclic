const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  console.log(req.body);
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const body = `<div><p>Phonebook has info for 2 people</p><br/>${date}
    </div>`;
  res.send(body);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((n) => n.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((n) => n.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      error: "content missing",
    });
  } else {
    const bodyObj = {
      name: body.name,
      number: body.number,
      id: Math.random() * 10,
    };
    persons = persons.concat(bodyObj);
    res.json(persons);
  }
});
const PORT = 3002;

app.listen(PORT);
