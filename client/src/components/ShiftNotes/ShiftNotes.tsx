import { useState, ChangeEvent } from "react";
import styles from "./ShiftNotes.module.scss";
import axios from "axios";
import { useAuth } from "../../auth";

interface Payload {
  user_id?: number;
  notes?: string;
}

const ShiftNotes = () => {
  const [inputField, setInputField] = useState(false);
  const [payload, setPayload] = useState<Payload>();
  const [savedNotes, setSavedNotes] = useState([]);
  const { logout, user } = useAuth();

  const addInput = () => {
    setInputField(true);
  };

    

  const saveNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios.post("/api/shiftnotes", payload)
    axios.get("/api/shiftnotes/currentnotes").then((res) => {
      setSavedNotes(res.data);
    });
    // .then(event.target.reset());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setPayload({
      user_id: user?.id,
      notes: value,
    });
  };

  return (
    <section className={styles.shiftnotesContainer}>
      <div>
      <h1>Enter your shift notes</h1>
      <h3>logged in as {user?.email}</h3>
      </div>
      <button onClick={addInput}>+</button>
      {inputField && (
        <form onSubmit={saveNote}>
          <input type="text" name="notes" onChange={handleChange}></input>
          <button type="submit">Save</button>
          <button>Delete</button>
        </form>
      )}

      {savedNotes.length > 0 && savedNotes.map((note) => <p>{JSON.stringify(note)}</p>)}
      <br/>
      <button type="button" onClick={logout}>Logout</button>
    </section>
  );
}

export default ShiftNotes;
