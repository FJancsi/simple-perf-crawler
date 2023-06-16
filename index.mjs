import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { getFile, calcAverageResponseTime, calcSumResponseTime } from './src/utils.mjs';

const { CYCLES } = process.env;

async function main(cycles) {
  const urlsJSON = await getFile('./example/urls.json');
  const { URLS } = JSON.parse(urlsJSON);

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
    console.log(`Results of cycle #${i + 1}`);
    results.map((item) => console.log(`Url: ${item.URL} - Status Code: ${item.status} - Response time: ${item.responseTime}(ms)`));
    console.log(`Average response time: ${calcAverageResponseTime(results)}(ms)`);
    console.log(`Total response time: ${calcSumResponseTime(results)}(ms)`);
  }
  process.exit();
}

main(CYCLES);
