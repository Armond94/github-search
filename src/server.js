import express from 'express';
import prompt from 'prompt';

import { PER_PAGE, PORT, NAME, ENTER } from "./app/configs/constants";
import Utils from './app/helpers/utils';

const app = express();
prompt.start();

let page = 1;
let totalCount = 0;

(async () => {
    try {
        const { name } = await Utils.getInputValue(NAME);
        let res = await Utils.getRepos(name, page, PER_PAGE);

        if (!res || !res.data) {
            throw new Error('please write repository name!');
        }
        totalCount = res.data.total_count;
        console.log('response ', res.data.items);

        while (totalCount / PER_PAGE > page) {
            console.log('Press enter for next page.');

            let { enter } = await Utils.getInputValue(ENTER);
            page++;

            if (!enter) {
                let chunk = await Utils.getRepos(name, page, PER_PAGE);

                console.log('page ', page, ((chunk || {}).data || {}).items);
            }
        }
    } catch (err) {
        console.log(err.message);
    }
})();

app.listen(PORT, () => {
    console.log(`github app listening at http://localhost:${PORT}`);
});
