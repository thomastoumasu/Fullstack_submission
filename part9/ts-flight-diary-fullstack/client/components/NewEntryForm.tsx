import { useState } from "react";
import { Weather, Visibility, type NewDiaryEntry } from "../../shared/types";

interface NewEntryFormProps {
  entryCreation: (entryToAdd: NewDiaryEntry) => void;
}

const NewEntryForm = (props: NewEntryFormProps) => {
  const defaultWeather = Weather.Sunny;
  const defaultVisibility = Visibility.Good;

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(defaultWeather);
  const [visibility, setVisibility] = useState(defaultVisibility);
  const [comment, setComment] = useState("");

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = { date, weather, visibility, comment };
    props.entryCreation(entryToAdd);
    setDate("");
    setWeather(defaultWeather);
    setVisibility(defaultVisibility);
    setComment("");
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        date
        <input
          type="date"
          name="date"
          min="1900-01-01"
          max="2100-01-01"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        weather:
        {Object.values(Weather).map((w) => (
          <>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(w)}
              checked={w === weather}
            />
            {w}
          </>
        ))}
      </div>
      <div>
        visibility:
        {Object.values(Visibility).map((v) => (
          <>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(v)}
              checked={v === visibility}
            />
            {v}
          </>
        ))}
      </div>
      <div>
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default NewEntryForm;
