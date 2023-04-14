import axios from "axios";

const BASE_URL = "http://localhost:3101/api/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTI2ODg0NzNhNThhNDY0NjhlZDVkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDI4ODg2MCwiZXhwIjoxNjYwODkzNjYwfQ.7WWGVehusHNT4U56E_uutWjXmlY9DLVUWMUVTBRQr-M";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
