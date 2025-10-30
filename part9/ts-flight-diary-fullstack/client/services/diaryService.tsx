import axios from "axios";
import type {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
} from "../../shared/types";

// const baseUrl = "http://localhost:3000/api/diaries/";
const baseUrl = "/api/diaries/";

const getAll = async (showComments: boolean) => {
  const url = showComments ? baseUrl + "all" : baseUrl;
  const response = await axios.get<DiaryEntry[] | NonSensitiveDiaryEntry[]>(
    url,
  );
  console.log("diaryService - getAll retrieved this data: ", response.data);
  return response.data;
};

const create = async (entryToAdd: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, entryToAdd);
  console.log(
    `diaryService - create posted this: ${JSON.stringify(
      entryToAdd,
    )} and got this back from the server: ${JSON.stringify(response.data)}`,
  );
  return response.data;
};

export default { getAll, create };
