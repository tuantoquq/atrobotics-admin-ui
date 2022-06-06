import axios from "axios";

const instance = axios.create({
    baseURL:'https://atroboticsvn.com/api/v1'
});

export default instance;