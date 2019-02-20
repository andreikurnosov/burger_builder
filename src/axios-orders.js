import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reacting-burgers.firebaseio.com/'
})

export default instance;
