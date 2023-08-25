import axios from "axios";

const fetchData = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/alldata`);
  return response.data;
};

export default fetchData;
