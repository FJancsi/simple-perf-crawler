import { Worker } from 'node:worker_threads';
import path from 'node:path';
import colors from 'colors';
import { getFile, calcAverage, calcSum } from './src/utils.mjs';

const { CYCLES, URL_PATH = './example/urls.json' } = process.env;

async function main(cycles, urlPath) {
    const urlsJSON = await getFile(urlPath);
    const { URLS } = JSON.parse(urlsJSON);

    const averageTotalResponseTime = [];

    for (let i = 0; i < cycles; i++) {
        const workerPromises = URLS.map((url) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(path.join(process.cwd(), './src/worker-fetch.mjs'));
                worker.on('message', (data) => {
                    resolve(data);
                    worker.terminate();
                });
                worker.on('error', (err) => {
                    reject(err);
                    worker.terminate();
                });
                worker.postMessage(url);
            });
        });

        const results = await Promise.all(workerPromises);
        console.log(`Results of cycle #${i + 1}`.blue);
        results.map((item) =>
            console.log(`Url: ${item.URL} - Status Code: ${item.status} - Response time: ${item.responseTime}(ms)`)
        );
        console.log(`Average response time: ${calcAverage(results, 'responseTime')}(ms)`.green);
        console.log(`Total response time: ${calcSum(results, 'responseTime')}(ms)`.underline.green);
        averageTotalResponseTime.push(calcSum(results, 'responseTime'));
    }
    console.log(`Average total response time for ${cycles} runs: ${calcAverage(averageTotalResponseTime)}(ms)`.red);

    process.exit();
}

main(CYCLES, URL_PATH);
