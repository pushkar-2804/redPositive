import axios from "axios";

const fetchData = async () => {
  const response = await axios.get("http://localhost:5000/alldata");
  return response.data;
};

export default fetchData;
