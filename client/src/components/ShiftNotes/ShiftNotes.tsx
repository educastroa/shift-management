import { useState, ChangeEvent, useEffect, FormEventHandler } from "react";
import styles from "./ShiftNotes.module.scss";
import axios from "axios";
import { useAuth } from "../../auth";
import type { ShiftNotes as ShiftNotesType } from "../../types";

const ShiftNotes = () => {
  const [inputField, setInputField] = useState(false);
  const [savedNotes, setSavedNotes] = useState<ShiftNotesType[]>([]);
  const { logout, user } = useAuth();

  const addInput = () => {
    setInputField(true);
  };

  const saveNote = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
   const res =  await axios.post("/api/shiftnotes", { 
      user_id: user?.id,
      notes: event.target.notes.value,
    });
    setSavedNotes([...savedNotes, res.data]);
    event.target.reset();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`api/shiftnotes/deletenote/${id}`);
    const currentNotes = [...savedNotes].filter((note) => note.id !== id);
    setSavedNotes(currentNotes);
  };

  useEffect(() => {
    axios.get("/api/shiftnotes/currentnotes").then((res) => {
      setSavedNotes(res.data);
    });
  }, []);

  return (
    <section className={styles.shiftnotesContainer}>
      <div>
        <h1>Enter your shift notes</h1>
        <h3>logged in as {user?.email}</h3>
      </div>
      <button onClick={addInput}>+</button>
      {inputField && (
        <form onSubmit={saveNote}>
          <input type="text" name="notes" required />
          <button type="submit">Save</button>
        </form>
      )}

      {savedNotes.length > 0 &&
        savedNotes.map((note) => (
          <div>
            <p>{JSON.stringify(note)}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      <br />
      <button type="button" onClick={logout}>
        Logout
      </button>
    </section>
  );
};

export default ShiftNotes;
