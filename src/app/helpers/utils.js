import axios from "axios";
import prompt from "prompt";
import { GITHUB_URL } from "../configs/constants";

export default class Utils {
    static async getRepos (name, page, per_page) {
        let URL = `${GITHUB_URL}?q=${name}&page=${page}&per_page=${per_page}`;
        return axios.get(URL);
    }

    static async getInputValue (name) {
        return prompt.get([name]);
    }
}
