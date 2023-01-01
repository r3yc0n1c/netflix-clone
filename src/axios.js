import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_MOVIEDB_API
});

export default instance;