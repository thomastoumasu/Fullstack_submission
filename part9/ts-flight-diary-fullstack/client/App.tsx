import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import Notification from "./components/Notification";
import NewEntryForm from "./components/NewEntryForm";
import type {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NotificationType,
  NewDiaryEntry,
} from "../shared/types";

const Entry = ({ entry }: { entry: DiaryEntry }) => (
  <div>
    <div>
      <strong>{entry.date}</strong>
    </div>
    <div>weather: {entry.weather}</div>
    <div>visibility: {entry.visibility}</div>
    <div>
      {entry.comment !== "" ? (
        <i>comment: {entry.comment}</i>
      ) : (
        <i>no comments</i>
      )}
    </div>
    <br></br>
  </div>
);

const SimpleEntry = ({ entry }: { entry: NonSensitiveDiaryEntry }) => (
  <div>
    <div>
      <strong>{entry.date}</strong>
    </div>
    <div>weather: {entry.weather}</div>
    <div>visibility: {entry.visibility}</div>
    <br></br>
  </div>
);

function App() {
  const [diaryEntries, setDiaryEntries] = useState<
    DiaryEntry[] | NonSensitiveDiaryEntry[]
  >([]);

  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => setShowComments(!showComments);

  const [notification, setNotification] = useState<NotificationType>({
    message: null,
    isAlert: false,
  });

  const notify = (message: string | null, isAlert: boolean) => {
    setNotification({ message, isAlert }); // this will trigger rendering of Notification()
    setTimeout(() => {
      setNotification({ message: null, isAlert: false });
    }, 5000);
  };

  const entryCreation = (entryToAdd: NewDiaryEntry) => {
    diaryService
      .create(entryToAdd)
      .then((addedEntry) => {
        setDiaryEntries(diaryEntries.concat(addedEntry));
        notify(`a new diary entry for ${addedEntry.date} was added`, false);
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data, true);
      });
  };

  useEffect(() => {
    diaryService
      .getAll(showComments)
      .then((entries) => setDiaryEntries(entries));
  }, [showComments]);

  return (
    <>
      <Notification notification={notification} />
      <h2>Add New Entry</h2>
      <NewEntryForm entryCreation={entryCreation} />
      <h2>Diary entries</h2>
      <button onClick={toggleComments}>
        {showComments ? "hide comments" : "show comments"}
      </button>
      <div>
        <br></br>
        {diaryEntries.map((entry) => {
          if (showComments) {
            return <Entry key={entry.id} entry={entry as DiaryEntry} />;
          } else {
            return <SimpleEntry key={entry.id} entry={entry} />;
          }
        })}
      </div>
    </>
  );
}

export default App;
