import axios from 'axios';

const instance = axios.create({
  baseURL: "https://blog-believemy-2936c-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;