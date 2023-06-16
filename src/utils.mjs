import { readFile } from 'node:fs/promises';
import path from 'node:path';

const getFile = async (filePath) => {
  try {
    const file = await readFile(path.join(process.cwd(), filePath), 'utf-8');
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const calcSumResponseTime = (array) => array.map((item) => item.responseTime).reduce((prev, curr) => prev + curr, 0);

const calcAverageResponseTime = (array) => Math.round(calcSumResponseTime(array) / array.length);

export { getFile, calcAverageResponseTime, calcSumResponseTime };
