import { prev } from "cheerio/lib/api/traversing";
import { type } from "os";
import { useState, ChangeEvent, useContext } from "react";
import styles from "./ShiftNotes.module.scss";
import axios from "axios";
import { UserContext } from "../../context";

interface Payload {
  user_id?: number;
  notes?: string;
}

function ShiftNotes() {
  const [inputField, setInputField] = useState(false);
  const [payload, setPayload] = useState<Payload>();
  const [savedNotes, setSavedNotes] = useState([]);

  const userContext = useContext(UserContext);

  const addInput = () => {
    setInputField(true);
  };

  const getNotes = () => {
    axios.get("/api/shiftnotes/saved").then((res) => {
      setSavedNotes(res.data);
    });
  };

  const saveNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios.post("/api/shiftnotes", payload)
    // .then(event.target.reset());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setPayload({
      user_id: userContext.user.id,
      notes: value,
    });
  };

  return (
    <section className={styles.shiftnotesContainer}>
      <div>
      <h1>Enter your shift notes</h1>
      <h3>logged in as {userContext.user.email}</h3>
      </div>
      <button onClick={addInput}>+</button>
      {inputField ? (
        <form onSubmit={saveNote}>
          <input type="text" name="notes" onChange={handleChange}></input>
          <button type="submit">Save</button>
          <button>Delete</button>
        </form>
      ) : (
        ""
      )}
      {savedNotes.length > 0 && savedNotes.map((note) => <p>{note}</p>)}
    </section>
  );
}

export default ShiftNotes;
