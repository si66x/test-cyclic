import { useEffect, useState } from "react";
import Note from "./components/Note";

import service from "./services/service";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    service.getAll().then((response) => {
      setNotes(response.data);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    service.update(id, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id != id ? response.data : n)));
    });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNotes,
      id: newNotes.length,
      important: Math.random() < 0.5,
    };

    service.update(noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNotes("");
    });
  };

  const handeNoteChange = (event) => {
    setNewNotes(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNotes} onChange={handeNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
