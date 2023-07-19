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

const calcSum = (array, key = null) => array.map((item) => item[key] ?? item).reduce((prev, curr) => prev + curr, 0);

const calcAverage = (array, key = null) => Math.round(calcSum(array, key) / array.length);

export { getFile, calcAverage, calcSum };
