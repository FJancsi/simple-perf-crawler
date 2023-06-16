import { parentPort, workerData } from 'node:worker_threads';
import { hrtime } from 'node:process';

const nanoToMilliSec = (nano) => Math.round(Number(nano) / 1e6);

async function runFetchWorker(url) {
  try {
    const start = hrtime.bigint();
    const response = await fetch(url);
    const end = hrtime.bigint();
    const messageObj = {
      URL: url,
      status: response.status,
      responseTime: nanoToMilliSec(end - start),
    };
    parentPort.postMessage(messageObj);
  } catch (error) {
    console.error(error);
    parentPort.postMessage({ error: error?.message ?? 'Error' });
    workerData.worker.terminate();
  }
}

parentPort.on('message', (url) => {
  runFetchWorker(url);
});
