import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

console.readline = async (question) => {
    const answer = await rl.question(question);
    rl.close();
    return answer;
};
